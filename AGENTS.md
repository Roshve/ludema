<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:ai-harness -->

## Harness de validación (loop generar → validar → corregir)

### Después de generar o editar **contenido** (`src/content/`)

```bash
pnpm validate:content
```

Salida: lista de issues por ID de ejercicio/lección/sección, con `[error]` o `[warn]`. Código de salida 1 si hay errores. Itera hasta que el comando termina con código 0.

Detecta tres capas:

- **Estructura (zod):** campos requeridos, tipos, `correctIndex` en rango, arrays no vacíos, `accent` válido.
- **Unicidad de IDs:** colisiones que el compilador no ve (el `Map` de `index.ts` sobreescribe en silencio).
- **Semántica con motor (proposicional):** fórmulas que no parsean, `counterexample` de argumento válido, pasos de `simplify-steps` no equivalentes, `build-expression.answer` fuera del `bank`. (Este motor valida la materia de **Lógica**; otras materias usarán su propio módulo de validación en `src/lib/`.)

> Ejercicios de cuantificadores (∀/∃), notación de conjuntos o constantes V/F no son validados por el motor (fuera de dominio). El validador los detecta y omite silenciosamente esos campos.

Convención de IDs (se reporta como `warn`, no rompe el loop):
`u2` → `u2-c` → `u2-c-l3` → `u2-c-l3-e2` (o `-c1` para concepts).

> **Antes de escribir contenido nuevo**, leé [`src/content/AUTHORING.md`](src/content/AUTHORING.md):
> schema de los 9 tipos con snippets válidos y las restricciones que el validador exige.
> Generar con esa guía a la vista reduce las iteraciones validar→corregir.

### Después de cambiar un **prompt de generación o modelo**

```bash
pnpm eval:content --unit u2 --out run-a.txt   # baseline antes del cambio
# (regenerar u2 con el nuevo prompt/modelo)
pnpm eval:content --unit u2 --out run-b.txt
diff run-a.txt run-b.txt                        # qué casos pasaron de PASS → FAIL
```

Mide **calidad pedagógica** (no correctitud — eso ya lo hace `validate:content`):
explanation presente y sustantiva, distractores en `build-expression`, variedad de `correctIndex`, etc.
Sin args evalúa el golden congelado (`src/content/eval/golden.ts`) como calibración.

### Después de tocar **código** (componentes, motor, stores, routing)

```bash
pnpm check
```

Equivale a `pnpm lint && pnpm test && pnpm build`. `pnpm test` incluye el validador de contenido.

### Leer los issues

```
u2-c-l1-e3
  ✗ [error] formula no parseable: Carácter inesperado "∧" en la fórmula: p ∧ ∧ q
  ▲ [warn]  Convención de ID: ejercicio "u2-c-l1-e3" debería empezar con "u2-c-l1"
```

El `path` es el ID del nodo afectado; ir directo a ese ejercicio en `src/content/unit*.ts`.

<!-- END:ai-harness -->
