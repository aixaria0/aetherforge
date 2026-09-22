/**
 * Loop quantum gravity quantities used by AETHER FORGE.
 * Formulas follow the EPRL / LQC literature summarized in this lab.
 */

/** Meissner / Domagala–Lewandowski isolated-horizon value. */
export const GAMMA_MEISSNER = 0.237532957976268;

/** Working Holst / EPRL value used in many numerical spin-foam papers. */
export const GAMMA_EPRL = 0.273904071092196;

/** Combinatorial factor from the 2√3 degeneracy counting. */
export const TWO_SQRT_3 = 2 * Math.sqrt(3);

/**
 * γ from the leading 2√3 counting:
 * S = (A / 4ℓ_P²) × (ln(2√3) / (πγ))  — set equal to A/4ℓ_P²
 * gives γ = ln(2√3) / π ≈ 0.395. Different state-counting schemes
 * produce 0.2375 or 0.274. The lab defaults to Meissner.
 */
export const GAMMA_FROM_TWO_SQRT_3 = Math.log(TWO_SQRT_3) / Math.PI;

export const J_MEAN_DEFAULT = 50;

/** Face area in Planck units: A = 8πγ √(j(j+1)) ℓ_P² */
export function faceArea(gamma: number, j: number): number {
  return 8 * Math.PI * gamma * Math.sqrt(j * (j + 1));
}

/**
 * LQC critical density in Planck units (APS bounce):
 * ρ_c / ρ_Pl = √3 / (32 π² γ³)
 * ≈ 0.41 at γ ≈ 0.2375
 */
export function rhoCOverPlanck(gamma: number): number {
  const g = Math.max(gamma, 0.05);
  return Math.sqrt(3) / (32 * Math.PI ** 2 * g ** 3);
}

/** Hessian matrix elements scale as γ j. */
export function hessianElementScale(gamma: number, jMean = J_MEAN_DEFAULT): number {
  return gamma * jMean;
}

/**
 * Gauge-fixed 4-simplex: 12 boost parameters, det(H) ∝ γ^{15} j^{15}
 * (12 from naive λ^{12} plus +3 from closure / volume measure).
 */
export function hessianDet(gamma: number, jMean = J_MEAN_DEFAULT): number {
  const C = 2.4e-8;
  return C * gamma ** 15 * jMean ** 15;
}

export function hessianPrefactor(gamma: number, jMean = J_MEAN_DEFAULT): number {
  const det = Math.abs(hessianDet(gamma, jMean));
  return (2 * Math.PI) ** 6 / Math.sqrt(det);
}

/** Sorted toy spectrum for a 12×12 Hessian (3 near-zero gauge modes). */
export function hessianEigenvalues(gamma: number, jMean = J_MEAN_DEFAULT): number[] {
  const scale = hessianElementScale(gamma, jMean) / hessianElementScale(GAMMA_MEISSNER, J_MEAN_DEFAULT);
  const shape = [
    1.2e-9, 3.4e-9, 8.1e-9, 0.12, 0.31, 0.78, 1.55, 2.9, 4.7, 7.2, 11.4, 16.8,
  ];
  return shape.map((v) => v * scale);
}

export type BounceSample = { t: number; a: number; rho: number };

/**
 * Dust LQC bounce: a(t) = a_min cosh^{1/3}(λ t), ρ = ρ_c sech²(λ t)
 * Time is dimensionless.
 */
export function lqcBounce(rhoC: number, n = 96): BounceSample[] {
  const out: BounceSample[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * 6 - 3;
    const sech = 1 / Math.cosh(t);
    const rho = rhoC * sech * sech;
    const a = Math.cbrt(Math.cosh(t));
    out.push({ t, a, rho });
  }
  return out;
}

/** 2D EPRL effective action slice S(βx, βy) ~ γ × quadratic + quartic anharmonic. */
export function actionAt(bx: number, by: number, gamma: number, jMean = J_MEAN_DEFAULT): number {
  const r2 = bx * bx + by * by;
  const quartic = 0.18 * (bx ** 4 + by ** 4) - 0.07 * bx * bx * by * by;
  return gamma * jMean * (r2 + quartic);
}
