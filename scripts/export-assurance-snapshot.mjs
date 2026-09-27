import {
  GAMMA_MEISSNER,
  faceArea,
  lqcBounce,
  rhoCOverPlanck,
} from "../src/lib/physics.ts";

export function buildAssuranceSnapshot() {
  const gamma = GAMMA_MEISSNER;
  const rhoC = rhoCOverPlanck(gamma);
  const js = [0.5, 1, 2, 10, 50];

  return {
    schema: "aetherforge-snapshot/v1",
    gamma,
    faceAreas: js.map((j) => ({ j, value: faceArea(gamma, j) })),
    rhoC,
    bounce: lqcBounce(rhoC, 7),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.stdout.write(`${JSON.stringify(buildAssuranceSnapshot(), null, 2)}\n`);
}
