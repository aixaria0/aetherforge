import assert from "node:assert/strict";
import test from "node:test";
import { GAMMA_MEISSNER, actionAt, faceArea, hessianEigenvalues, lqcBounce, rhoCOverPlanck } from "./physics.ts";

const near = (a: number, b: number, eps = 1e-9) => Math.abs(a - b) <= eps;

test("critical density is about 0.41 at the Meissner gamma", () => {
  assert.ok(Math.abs(rhoCOverPlanck(GAMMA_MEISSNER) - 0.409) < 0.01);
});

test("face area is positive and monotone in spin and gamma", () => {
  assert.ok(faceArea(0.24, 2) > 0);
  assert.ok(faceArea(0.24, 3) > faceArea(0.24, 2));
  assert.ok(faceArea(0.30, 2) > faceArea(0.24, 2));
});

test("action surrogate has a zero saddle and x/y symmetry", () => {
  assert.equal(actionAt(0, 0, 0.24, 50), 0);
  assert.ok(near(actionAt(0.17, -0.11, 0.24, 50), actionAt(-0.11, 0.17, 0.24, 50)));
});

test("synthetic Hessian spectrum scales linearly with gamma*j", () => {
  const a = hessianEigenvalues(GAMMA_MEISSNER, 50);
  const b = hessianEigenvalues(GAMMA_MEISSNER * 2, 50);
  assert.equal(a.length, 12);
  a.forEach((v, i) => assert.ok(near((b[i] ?? 0) / v, 2, 1e-10)));
});

test("bounce profile is symmetric and peaks density at the center", () => {
  const points = lqcBounce(0.41, 97);
  const mid = points[48]!;
  assert.ok(near(mid.t, 0));
  assert.ok(near(mid.rho, 0.41));
  assert.ok(near(points[0]!.rho, points.at(-1)!.rho));
  assert.ok(near(points[0]!.a, points.at(-1)!.a));
});
