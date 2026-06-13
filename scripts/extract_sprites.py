#!/usr/bin/env python3
"""
extract_sprites.py — Extractor automático de sprites desde un sprite sheet.

Detecta cada pose de la mascota sobre fondo negro, la recorta con margen,
convierte el fondo a transparencia y exporta PNGs individuales.

Requisitos:
    Python 3.12+
    pip install opencv-python numpy

Uso:
    python extract_sprites.py <imagen.png>
    python extract_sprites.py              # usa "spritesheet.png" por defecto

Salida:
    sprites/sprite_01.png ... sprite_NN.png   — PNGs con canal alpha
    debug.png                                  — imagen de depuración con rectángulos
    metadata.json                              — coordenadas de cada sprite
"""

import json
import os
import sys

import cv2
import numpy as np

# ──────────────────────────────────────────────
# Constantes configurables
# ──────────────────────────────────────────────

# Umbral de luminancia para considerar un píxel como "no-fondo".
# El fondo negro puede no ser 0 puro; tolerar hasta 20 de ruido.
BLACK_THRESHOLD: int = 20

# Umbral de opacidad (canal alpha) para considerar un píxel como primer plano.
# Se usa cuando la imagen ya trae transparencia.
ALPHA_THRESHOLD: int = 20

# Área mínima (px²) de un contorno para ser considerado un sprite.
# Filtra ruido / artefactos pequeños.
MIN_AREA: int = 1_000

# Margen en píxeles que se agrega alrededor de cada bounding box.
MARGIN: int = 10

# Carpeta de salida donde se guardan los sprites.
OUTPUT_DIR: str = "sprites"

# Tamaño del kernel morfológico (cierra huecos internos de la máscara).
MORPH_KERNEL_SIZE: int = 7

# Compresión PNG: 0 = sin compresión (máxima calidad / archivos más grandes).
PNG_COMPRESSION: int = 0


# ──────────────────────────────────────────────
# Funciones
# ──────────────────────────────────────────────

def _close(mask: np.ndarray) -> np.ndarray:
    """Cierre morfológico: rellena agujeros internos de cada figura."""
    kernel = cv2.getStructuringElement(
        cv2.MORPH_ELLIPSE, (MORPH_KERNEL_SIZE, MORPH_KERNEL_SIZE)
    )
    return cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)


def build_mask(bgr: np.ndarray) -> np.ndarray:
    """
    Máscara binaria a partir de luminancia, asumiendo **fondo negro**:
    todo píxel más claro que BLACK_THRESHOLD es primer plano (255).

    Se usa cuando la imagen NO trae canal alpha aprovechable.
    """
    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
    _, mask = cv2.threshold(gray, BLACK_THRESHOLD, 255, cv2.THRESH_BINARY)
    return _close(mask)


def build_mask_from_alpha(alpha: np.ndarray) -> np.ndarray:
    """
    Máscara binaria a partir del **canal alpha** existente: cualquier píxel
    con opacidad mayor que ALPHA_THRESHOLD es primer plano (255).

    Preferible cuando el PNG ya tiene transparencia: es más limpio que
    reconstruir la máscara desde el color del fondo.
    """
    _, mask = cv2.threshold(alpha, ALPHA_THRESHOLD, 255, cv2.THRESH_BINARY)
    return _close(mask)


def find_sprite_boxes(
    mask: np.ndarray,
) -> list[tuple[tuple[int, int, int, int], np.ndarray]]:
    """
    Encuentra cada sprite en la máscara binaria.

    Retorna una lista de pares ((x, y, w, h), contorno) para los contornos
    externos que superan MIN_AREA, sin ordenar aún. El contorno se conserva
    para poder aislar cada pieza de sus vecinas al recortar.
    """
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    items: list[tuple[tuple[int, int, int, int], np.ndarray]] = []
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if area < MIN_AREA:
            continue  # ignorar ruido pequeño
        items.append((cv2.boundingRect(cnt), cnt))

    return items


def sort_boxes(
    items: list[tuple[tuple[int, int, int, int], np.ndarray]],
) -> list[tuple[tuple[int, int, int, int], np.ndarray]]:
    """
    Ordena los sprites en orden de lectura natural: de arriba hacia abajo,
    y dentro de cada fila de izquierda a derecha. Cada elemento es un par
    ((x, y, w, h), contorno).

    El agrupamiento por filas usa como umbral la mitad de la altura
    mediana de los boxes (tolerante a diferencias de tamaño entre filas).
    """
    if not items:
        return items

    # Altura mediana para calcular tolerancia de fila
    heights = [box[3] for box, _ in items]
    row_tolerance = int(np.median(heights) * 0.5)

    # Ordenar preliminarmente por coordenada Y del tope
    sorted_by_y = sorted(items, key=lambda it: it[0][1])

    rows: list[list[tuple[tuple[int, int, int, int], np.ndarray]]] = []
    current_row = [sorted_by_y[0]]

    for item in sorted_by_y[1:]:
        # Centro Y del box actual vs. centro Y del primer elemento de la fila
        cy_current = item[0][1] + item[0][3] // 2
        cy_row_start = current_row[0][0][1] + current_row[0][0][3] // 2

        if abs(cy_current - cy_row_start) <= row_tolerance:
            current_row.append(item)
        else:
            rows.append(current_row)
            current_row = [item]
    rows.append(current_row)

    # Dentro de cada fila, ordenar por X (izquierda → derecha)
    ordered: list[tuple[tuple[int, int, int, int], np.ndarray]] = []
    for row in rows:
        ordered.extend(sorted(row, key=lambda it: it[0][0]))

    return ordered


def crop_with_alpha(
    bgr: np.ndarray,
    box: tuple[int, int, int, int],
    contour: np.ndarray,
    alpha_src: np.ndarray | None = None,
) -> np.ndarray:
    """
    Recorta un sprite de la imagen BGR añadiendo un canal alpha.

    El alpha se restringe al `contour` de esta pieza (relleno y dilatado un
    par de píxeles) para que ningún vecino se cuele por el margen del recorte.
    Si se pasa `alpha_src` (el canal alpha original del PNG), se usa dentro de
    esa silueta para preservar los bordes anti-aliased; si no, el alpha se
    deriva del relleno binario con un leve suavizado gaussiano.

    El recorte incluye MARGIN píxeles adicionales en cada lado.
    Retorna una imagen BGRA.
    """
    img_h, img_w = bgr.shape[:2]
    x, y, w, h = box

    # Expandir con margen, sin salir de los bordes de la imagen
    x1 = max(0, x - MARGIN)
    y1 = max(0, y - MARGIN)
    x2 = min(img_w, x + w + MARGIN)
    y2 = min(img_h, y + h + MARGIN)

    crop_bgr = bgr[y1:y2, x1:x2]

    # Máscara aislada SOLO de esta pieza (su contorno relleno), trasladada
    # al sistema de coordenadas del recorte.
    piece = np.zeros((img_h, img_w), dtype=np.uint8)
    cv2.drawContours(piece, [contour], -1, color=255, thickness=cv2.FILLED)
    crop_piece = piece[y1:y2, x1:x2]

    if alpha_src is not None:
        # Alpha original recortado a la silueta de la pieza
        alpha = cv2.bitwise_and(alpha_src[y1:y2, x1:x2], crop_piece)
    else:
        # Sin alpha previo: derivar del relleno con bordes suavizados
        alpha = cv2.GaussianBlur(crop_piece, (3, 3), sigmaX=0.8)

    b, g, r = cv2.split(crop_bgr)
    bgra = cv2.merge([b, g, r, alpha])

    return bgra


# ──────────────────────────────────────────────
# Main
# ──────────────────────────────────────────────

def main() -> None:
    # ── 1. Leer argumento de entrada ──────────────────────────────────────
    input_path = sys.argv[1] if len(sys.argv) > 1 else "spritesheet.png"

    if not os.path.isfile(input_path):
        print(f"[ERROR] No se encontró el archivo: {input_path}")
        sys.exit(1)

    print(f"[INFO] Procesando: {input_path}")

    # ── 2. Cargar imagen ──────────────────────────────────────────────────
    raw = cv2.imread(input_path, cv2.IMREAD_UNCHANGED)
    if raw is None:
        print(f"[ERROR] OpenCV no pudo leer la imagen: {input_path}")
        sys.exit(1)

    # Normalizar a BGR + detectar canal alpha aprovechable.
    # Si el PNG ya trae transparencia real (alpha no totalmente opaco),
    # la usamos para segmentar; si no, caemos al método de fondo negro.
    alpha_src: np.ndarray | None = None
    if raw.ndim == 2:
        bgr = cv2.cvtColor(raw, cv2.COLOR_GRAY2BGR)
    elif raw.shape[2] == 4:
        bgr = cv2.cvtColor(raw, cv2.COLOR_BGRA2BGR)
        candidate_alpha = raw[:, :, 3]
        if candidate_alpha.min() < 255:  # hay píxeles transparentes
            alpha_src = candidate_alpha
    else:
        bgr = raw.copy()

    img_h, img_w = bgr.shape[:2]
    print(f"[INFO] Dimensiones de la imagen: {img_w} × {img_h} px")

    # ── 3. Máscara de primer plano ────────────────────────────────────────
    if alpha_src is not None:
        print("[INFO] Canal alpha detectado → segmentando por transparencia")
        mask = build_mask_from_alpha(alpha_src)
    else:
        print("[INFO] Sin alpha → segmentando por fondo negro (luminancia)")
        mask = build_mask(bgr)

    # ── 4. Detección y filtrado de contornos ──────────────────────────────
    raw_items = find_sprite_boxes(mask)
    print(f"[INFO] Contornos detectados antes de ordenar: {len(raw_items)}")

    # ── 5. Ordenado en lectura natural ────────────────────────────────────
    items = sort_boxes(raw_items)

    print(f"\n✅  Sprites encontrados: {len(items)}\n")
    for idx, ((x, y, w, h), _) in enumerate(items, start=1):
        print(f"  sprite_{idx:02d}  →  x={x}, y={y}, w={w}, h={h}")
    print()

    # ── 6. Crear carpeta de salida ────────────────────────────────────────
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # ── 7. Recortar y exportar sprites ────────────────────────────────────
    metadata: dict[str, dict[str, int]] = {}

    for idx, (box, contour) in enumerate(items, start=1):
        x, y, w, h = box
        sprite_name = f"sprite_{idx:02d}"
        output_path = os.path.join(OUTPUT_DIR, f"{sprite_name}.png")

        bgra = crop_with_alpha(bgr, box, contour, alpha_src)

        # PNG sin compresión = máxima calidad
        cv2.imwrite(output_path, bgra, [cv2.IMWRITE_PNG_COMPRESSION, PNG_COMPRESSION])
        print(f"  [GUARDADO] {output_path}")

        # Coordenadas originales (sin margen) para el metadata
        metadata[sprite_name] = {"x": x, "y": y, "width": w, "height": h}

    # ── 8. Imagen de depuración ───────────────────────────────────────────
    debug_img = bgr.copy()

    for idx, ((x, y, w, h), _) in enumerate(items, start=1):
        # Rectángulo verde brillante
        cv2.rectangle(debug_img, (x, y), (x + w, y + h), color=(0, 230, 0), thickness=2)
        # Etiqueta con número de sprite
        label = f"{idx:02d}"
        cv2.putText(
            debug_img,
            label,
            org=(x + 4, y + 22),
            fontFace=cv2.FONT_HERSHEY_SIMPLEX,
            fontScale=0.7,
            color=(0, 230, 0),
            thickness=2,
            lineType=cv2.LINE_AA,
        )

    cv2.imwrite("debug.png", debug_img)
    print("\n  [GUARDADO] debug.png")

    # ── 9. metadata.json ──────────────────────────────────────────────────
    with open("metadata.json", "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)
    print("  [GUARDADO] metadata.json")

    print(f"\n✅  Listo. {len(items)} sprites exportados en '{OUTPUT_DIR}/'.\n")


if __name__ == "__main__":
    main()
