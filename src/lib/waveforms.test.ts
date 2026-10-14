import assert from "node:assert/strict";
import test from "node:test";
import { controlledWaveform, eventWaveform } from "./waveforms.ts";

test("controlled waveform is deterministic, finite and fixed length", () => {
  const a = controlledWaveform(80, 0.8);
  const b = controlledWaveform(80, 0.8);
  assert.equal(a.length, 240);
  assert.deepEqual(a, b);
  assert.ok(a.every((p) => Number.isFinite(p.h)));
});

test("catalog-style synthetic events stay finite", () => {
  for (const id of ["gw150914", "gw170817", "gw190521"] as const) {
    const rows = eventWaveform(id);
    assert.equal(rows.length, 240);
    assert.ok(rows.every((p) => Number.isFinite(p.h)));
  }
});

test("none event is an all-zero synthetic overlay", () => {
  assert.ok(eventWaveform("none").every((p) => p.h === 0));
});
