// Soniditos sintetizados con Web Audio: cero assets, compatible con el
// export estático. Cada sfx* se llama desde un handler de click, así que
// crear/reanudar el AudioContext aquí cumple la política de autoplay.

// Misma clave que lee ThemeMenu/useSoundEnabled.
const STORAGE_KEY = "ludema-sound";

let ctx: AudioContext | null = null;

function soundEnabled(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

// Una nota con ataque corto y caída exponencial. `glideTo` desliza el tono
// durante la nota (para el buzz de error).
function note(
  ac: AudioContext,
  freq: number,
  startAt: number,
  duration: number,
  type: OscillatorType = "sine",
  peakGain = 0.12,
  glideTo?: number,
) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  const t0 = ac.currentTime + startAt;

  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (glideTo !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + duration);
  }

  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(peakGain, t0 + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  osc.connect(gain).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

function play(fn: (ac: AudioContext) => void) {
  if (!soundEnabled()) return;
  const ac = getContext();
  if (!ac) return;
  try {
    fn(ac);
  } catch {
    // Sin audio no se rompe nada: lo demás sigue funcionando.
  }
}

/** Ding alegre al acertar: dos notas ascendentes rápidas. */
export function sfxCorrect() {
  play((ac) => {
    note(ac, 660, 0, 0.12, "sine", 0.14);
    note(ac, 880, 0.09, 0.22, "sine", 0.14);
  });
}

/** Buzz grave descendente al fallar (y perder un corazón). */
export function sfxWrong() {
  play((ac) => {
    note(ac, 200, 0, 0.3, "sawtooth", 0.08, 150);
    note(ac, 100, 0, 0.3, "sawtooth", 0.06, 75);
  });
}

/** Fanfarria al completar la lección: arpegio C5–E5–G5–C6. */
export function sfxComplete() {
  play((ac) => {
    const arpeggio = [523.25, 659.25, 783.99, 1046.5];
    arpeggio.forEach((freq, i) => {
      note(ac, freq, i * 0.12, 0.3, "triangle", 0.12);
    });
    // La última nota se sostiene un poco más, con una octava de refuerzo.
    note(ac, 1046.5, 3 * 0.12, 0.6, "triangle", 0.1);
    note(ac, 523.25, 3 * 0.12, 0.6, "triangle", 0.06);
  });
}

/** Notas descendentes "tristes" al quedarse sin corazones. */
export function sfxFail() {
  play((ac) => {
    note(ac, 392, 0, 0.22, "triangle", 0.1);
    note(ac, 330, 0.18, 0.22, "triangle", 0.1);
    note(ac, 262, 0.36, 0.4, "triangle", 0.1);
  });
}

/** Tick sutil para clicks de UI y selección de opciones. */
export function sfxClick() {
  play((ac) => {
    note(ac, 600, 0, 0.04, "sine", 0.05);
  });
}
