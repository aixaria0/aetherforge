# AetherForge

AetherForge is an interactive, evidence-bounded loop quantum gravity laboratory.

The project deliberately separates **implemented formulas**, **visual approximations**, **synthetic data**, and **reference equations**. A visually convincing surface is not promoted into a numerical LQG result.

## Interactive surfaces

- Immirzi parameter and mean-spin controls
- EPRL-inspired 2D action surrogate
- synthetic 12-mode Hessian spectrum under explicit scaling
- analytic effective LQC bounce profile
- isolated-horizon counting sensitivity
- draggable 4-valent spin-network diagram
- generated gravitational-wave bursts and catalog-style synthetic overlays
- KaTeX theory/reference panels

## Model contract

| Class | Meaning |
| --- | --- |
| `DERIVED` | Direct numerical evaluation of the formula stated in the interface/code. |
| `APPROXIMATION` | Reduced surrogate or analytic ansatz; not a full numerical LQG solver. |
| `SYNTHETIC` | Generated illustrative data; not experimental/observatory data. |
| `REFERENCE` | Literature equation/context shown without an independent verification claim. |
| `INTERACTIVE` | User-manipulated diagram or state used for exploration. |

### Not claimed

AetherForge does **not** claim to perform a full EPRL vertex integral, derive a gauge-fixed Hessian from boundary data, solve APS dynamics numerically, load detector-calibrated GW strain, prove LQG statements formally, or empirically validate quantum-gravity predictions.

## Run

```bash
npm ci
npm run check
npm run dev
```

## Architecture

The application is intentionally static and local-first. There is no authentication layer, database, server runtime, or hidden remote inference dependency. The production build is a static Vite artifact in `dist/`.

## Verification

`npm run check` gates:

1. TypeScript typechecking
2. deterministic physics/waveform unit tests
3. ESLint
4. production static build

The tests protect implemented invariants; they do not turn the visualization models into validated physical theories.
