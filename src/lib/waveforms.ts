export type GwEventId = "none" | "gw150914" | "gw170817" | "gw190521";

export const GW_EVENTS: { id: GwEventId; label: string; note: string }[] = [
  { id: "none", label: "None", note: "Controlled waveform only" },
  { id: "gw150914", label: "GW150914", note: "First BBH detection (approx. chirp)" },
  { id: "gw170817", label: "GW170817", note: "BNS, longer inspiral (approx.)" },
  { id: "gw190521", label: "GW190521", note: "Heavy BBH, lower frequency (approx.)" },
];

export type StrainPoint = { i: number; t: number; h: number };

const N = 240;

function imr(t: number, tMerge: number, f0: number, amp: number, ringDecay: number, ringMul: number): number {
  if (t < tMerge) {
    const tau = Math.max(tMerge - t, 0.012);
    const f = f0 / tau ** 0.375;
    const a = amp * tau ** -0.25;
    const phase = 2 * Math.PI * f * t;
    return a * Math.sin(phase);
  }
  const dt = t - tMerge;
  return amp * ringMul * Math.exp(-dt * ringDecay) * Math.sin(2 * Math.PI * f0 * ringMul * t);
}

/** User-controlled quasi-monochromatic burst. */
export function controlledWaveform(freqHz: number, amp: number): StrainPoint[] {
  const out: StrainPoint[] = [];
  for (let i = 0; i < N; i++) {
    const u = i / (N - 1);
    const t = u * 2 - 1;
    const envelope = Math.exp(-Math.abs(t) * 1.15);
    const h = amp * envelope * Math.sin(2 * Math.PI * (freqHz / 90) * t * 6);
    out.push({ i, t, h });
  }
  return out;
}

/** Synthetic LIGO-like strain (not observatory strain files). */
export function eventWaveform(id: GwEventId): StrainPoint[] {
  const out: StrainPoint[] = [];
  for (let i = 0; i < N; i++) {
    const u = i / (N - 1);
    let h = 0;
    if (id === "gw150914") {
      h = imr(u, 0.72, 28, 0.72, 16, 2.1);
    } else if (id === "gw170817") {
      const tau = Math.max(0.92 - u, 0.02);
      const f = 18 / tau ** 0.32;
      h = 0.38 * tau ** -0.18 * Math.sin(2 * Math.PI * f * u * 4);
    } else if (id === "gw190521") {
      h = imr(u, 0.68, 14, 0.9, 11, 1.6);
    }
    out.push({ i, t: u * 2 - 1, h });
  }
  return out;
}
