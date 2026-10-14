# AetherForge contributor contract

AetherForge is an interactive physics research model, not a production numerical LQG solver.

## Rules

- Preserve the model taxonomy: `DERIVED`, `APPROXIMATION`, `SYNTHETIC`, `REFERENCE`, `INTERACTIVE`.
- Never promote a visualization, surrogate, generated waveform, or proxy into an empirical or formal claim.
- Keep the application static/local-first unless a concrete feature requires otherwise.
- Do not add authentication, database, server, analytics, or remote inference dependencies without an explicit product requirement.
- Every mathematical behavior change needs a deterministic test where feasible.
- `npm run check` must pass before merge.
- Keep mobile/tablet interaction first-class and honor reduced-motion preferences.
