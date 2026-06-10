// Celebración al completar una lección. Import dinámico para no cargar
// canvas-confetti hasta el momento de usarlo; no-op con reduced motion.
export async function fireConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const confetti = (await import("canvas-confetti")).default;
  const opts = {
    spread: 70,
    startVelocity: 45,
    ticks: 180,
    zIndex: 50,
    // Paleta de marca: azul/violeta/cian.
    colors: ["#2563EB", "#7C3AED", "#06B6D4", "#60A5FA", "#A78BFA"],
  };
  confetti({ ...opts, particleCount: 80, origin: { x: 0.1, y: 0.7 }, angle: 60 });
  confetti({ ...opts, particleCount: 80, origin: { x: 0.9, y: 0.7 }, angle: 120 });
  setTimeout(() => {
    confetti({ ...opts, particleCount: 50, origin: { x: 0.5, y: 0.6 }, angle: 90 });
  }, 250);
}
