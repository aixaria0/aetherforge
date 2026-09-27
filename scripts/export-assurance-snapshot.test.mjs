import assert from "node:assert/strict";
import test from "node:test";
import { buildAssuranceSnapshot } from "./export-assurance-snapshot.mjs";

function close(left, right, tolerance = 1e-12) {
  return Math.abs(left - right) <= tolerance * Math.max(1, Math.abs(left), Math.abs(right));
}

test("assurance snapshot is deterministic and symmetric", () => {
  const first = buildAssuranceSnapshot();
  const second = buildAssuranceSnapshot();

  assert.deepEqual(first, second);
  assert.equal(first.schema, "aetherforge-snapshot/v1");
  assert.equal(first.gamma, 0.237532957976268);
  assert.equal(first.faceAreas.length, 5);
  assert.equal(first.bounce.length, 7);
  assert.ok(first.rhoC > 0);

  for (let index = 1; index < first.faceAreas.length; index += 1) {
    assert.ok(first.faceAreas[index].j > first.faceAreas[index - 1].j);
    assert.ok(first.faceAreas[index].value > first.faceAreas[index - 1].value);
  }

  const center = first.bounce[3];
  assert.ok(close(center.t, 0));
  assert.ok(close(center.a, 1));
  assert.ok(close(center.rho, first.rhoC));

  for (let left = 0; left < 3; left += 1) {
    const right = first.bounce.length - 1 - left;
    assert.ok(close(first.bounce[left].t, -first.bounce[right].t));
    assert.ok(close(first.bounce[left].a, first.bounce[right].a));
    assert.ok(close(first.bounce[left].rho, first.bounce[right].rho));
  }
});
