# 2026-05-25: Flowing Pixel Mesh Background

## Status
Resolved.

## Impact
The user wanted the accepted packed pixel background to feel more dynamic, with water-like flow, randomized cell ordering on browser refresh, stable appearance during path navigation, and fewer non-gray accent cells.

## Evidence
The previous mesh used a fixed seed, so the packed-cell order was identical after every reload. Motion used independent bounce waves per cell, which preserved non-overlap but felt more mechanical than fluid.

## Root Cause
The mesh generator used a hard-coded seed and per-cell triangular bounce motion. It did not distinguish full page refresh from same-tab path navigation.

## Changes Made

- Reworked `startMesh()` to persist a session mesh seed and flow epoch in `sessionStorage`.
- Full browser refresh rerolls the seed; same-tab path navigation reuses the seed and flow epoch for continuity.
- Replaced triangular bounce with a smooth multi-wave flow field constrained to each occupied slot, so cells drift without overlapping.
- Randomized accent-cell placement with capped green, blue, and amber budgets.
- Bumped static asset query versions to force the updated canvas code to load.

## Verification
Completed on 2026-05-25 from the origin host:

- `node --check site/app.js` passed.
- `node --check server.mjs` passed.
- `git diff --check` passed through Bun `spawnSync`.
- Route checks returned HTTP 200 for `/`, `/services`, `/services?module=agents`, `/monitor`, `/ports`, and `/ops`.
- Root HTML references `app.js?v=20260525-0935` and `styles.css?v=20260525-0935`.
- Served JS contains `hiraeth.mesh.seed.v3`, `resolveFlowEpoch`, `colorBudget`, and `startMesh`.
- `GET /api/config` returned 6 modules and 6 services.
- `GET /api/status` returned 6 service records. The online count is environment-dependent; a later check returned `0/6` while the monitored local services were not reachable.
- Sensitive-value scan passed for the changed files.

Real browser DevTools verification was not available in this session, so visual verification is limited to origin HTTP/static checks and source review.

## Next Actions

If the flow still feels too subtle or too busy in the browser, tune `unit`, `colorBudget`, and the `streamA/streamB/eddy` weights in `startMesh()`.
