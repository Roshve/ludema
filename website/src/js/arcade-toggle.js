/**
 * Ludema Docs — Arcade Theme Toggle
 *
 * Docusaurus client module: este archivo se ejecuta en el cliente.
 * Crea un botón flotante (🕹️) que alterna la clase `.theme-arcade`
 * en <html> y persiste la preferencia en localStorage.
 *
 * El script pre-paint en docusaurus.config.ts restaura la clase
 * antes del primer render para evitar el flash de tema incorrecto.
 */

const STORAGE_KEY = "ludema-docs-arcade";
const BTN_ID = "ludema-arcade-btn";
const CLASS = "theme-arcade";

function isArcadeActive() {
  return document.documentElement.classList.contains(CLASS);
}

function updateButton(btn) {
  const active = isArcadeActive();
  btn.setAttribute("aria-pressed", String(active));
  btn.title = active ? "Desactivar modo arcade" : "Activar modo arcade 🕹️";
  btn.innerHTML = active
    ? '<span aria-hidden="true">🕹️</span><br>ARCADE<br>ON'
    : '<span aria-hidden="true">🕹️</span><br>ARCADE';
}

function swapLogo(active) {
  const logoImg = document.querySelector(".navbar__logo img");
  if (!logoImg) return;
  if (active) {
    logoImg.dataset.originalSrc = logoImg.src;
    // Reemplazar con logo arcade si existe
    const arcadeSrc = logoImg.src.replace(
      /ludema-(negro|blanco)\.svg/,
      "ludema-arcade.svg"
    );
    if (arcadeSrc !== logoImg.src) logoImg.src = arcadeSrc;
  } else if (logoImg.dataset.originalSrc) {
    logoImg.src = logoImg.dataset.originalSrc;
    delete logoImg.dataset.originalSrc;
  }
}

function initArcadeButton() {
  if (document.getElementById(BTN_ID)) return;

  const btn = document.createElement("button");
  btn.id = BTN_ID;
  btn.type = "button";
  updateButton(btn);

  btn.addEventListener("click", () => {
    const next = !isArcadeActive();
    document.documentElement.classList.toggle(CLASS, next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch (_) {}
    updateButton(btn);
    swapLogo(next);
  });

  document.body.appendChild(btn);

  // Sincronizar logo si el arcade ya estaba activo al cargar
  if (isArcadeActive()) swapLogo(true);
}

// Se llama después de cada navegación en Docusaurus (incluyendo la inicial)
export function onRouteDidUpdate() {
  initArcadeButton();
}
