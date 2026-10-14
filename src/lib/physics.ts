/**
 * Small deterministic models used by AetherForge.
 *
 * The functions are intentionally bounded: some directly evaluate stated
 * formulas, while others are explicit visualization surrogates. See the UI
 * model contract and README before interpreting their outputs.
 */

/** Meissner / Domagala–Lewandowski isolated-horizon counting value. */
export const GAMMA_MEISSNER = 0.237532957976268;

/** A commonly used EPRL-oriented reference value. */
export const GAMMA_EPRL = 0.273904071092196;

export const TWO_SQRT_3 = 2 * Math.sqrt(3);
export const GAMMA_FROM_TWO_SQRT_3 = Math.log(TWO_SQRT_3) / Math.PI;
export const J_MEAN_DEFAULT = 50;

/** Direct evaluation of A = 8πγ √(j(j+1)) in Planck-area units. */
export function faceArea(gamma: number, j: number): number {
  return 8 * Math.PI * gamma * Math.sqrt(j * (j + 1));
}

/** Direct evaluation of the displayed effective-LQC critical-density expression. */
export function rhoCOverPlanck(gamma: number): number {
  const g = Math.max(gamma, 0.05);
  return Math.sqrt(3) / (32 * Math.PI ** 2 * g ** 3);
}

/** Scaling control used by the synthetic Hessian visualization. */
export function hessianElementScale(gamma: number, jMean = J_MEAN_DEFAULT): number {
  return gamma * jMean;
}

/**
 * Illustrative determinant proxy with γ^15 j^15 scaling.
 * This is NOT the determinant of a Hessian numerically computed from EPRL
 * boundary data.
 */
export function hessianDet(gamma: number, jMean = J_MEAN_DEFAULT): number {
  const C = 2.4e-8;
  return C * gamma ** 15 * jMean ** 15;
}

/** Prefactor proxy derived from the illustrative determinant above. */
export function hessianPrefactor(gamma: number, jMean = J_MEAN_DEFAULT): number {
  const det = Math.abs(hessianDet(gamma, jMean));
  return (2 * Math.PI) ** 6 / Math.sqrt(det);
}

/** Fixed synthetic 12-mode spectrum scaled by γj; three modes are near zero. */
export function hessianEigenvalues(gamma: number, jMean = J_MEAN_DEFAULT): number[] {
  const scale = hessianElementScale(gamma, jMean) / hessianElementScale(GAMMA_MEISSNER, J_MEAN_DEFAULT);
  const shape = [1.2e-9, 3.4e-9, 8.1e-9, 0.12, 0.31, 0.78, 1.55, 2.9, 4.7, 7.2, 11.4, 16.8];
  return shape.map((v) => v * scale);
}

export type BounceSample = { t: number; a: number; rho: number };

/**
 * Analytic effective bounce profile: a(t)=cosh(t)^(1/3), ρ=ρc sech²(t).
 * This is an explanatory ansatz, not a numerical APS evolution.
 */
export function lqcBounce(rhoC: number, n = 96): BounceSample[] {
  const out: BounceSample[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * 6 - 3;
    const sech = 1 / Math.cosh(t);
    out.push({ t, rho: rhoC * sech * sech, a: Math.cbrt(Math.cosh(t)) });
  }
  return out;
}

/**
 * Phenomenological 2D saddle surrogate used only for visualization.
 * It is not an evaluation of the EPRL action integral.
 */
export function actionAt(bx: number, by: number, gamma: number, jMean = J_MEAN_DEFAULT): number {
  const r2 = bx * bx + by * by;
  const quartic = 0.18 * (bx ** 4 + by ** 4) - 0.07 * bx * bx * by * by;
  return gamma * jMean * (r2 + quartic);
}
