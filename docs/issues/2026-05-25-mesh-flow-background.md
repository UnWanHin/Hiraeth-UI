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
- Initial implementation randomized accent-cell placement; the follow-up replaced fixed accents with a time-based `dynamicAccent()` color field.
- Bumped static asset query versions to force the updated canvas code to load.

## Verification
Completed on 2026-05-25 from the origin host:

- `node --check site/app.js` passed.
- `node --check server.mjs` passed.
- `git diff --check` passed through Bun `spawnSync`.
- Route checks returned HTTP 200 for `/`, `/services`, `/services?module=agents`, `/monitor`, `/ports`, and `/ops`.
- Initial root HTML referenced cache-busted mesh assets; the follow-up now verifies `app.js?v=20260525-1025` and `styles.css?v=20260525-1025`.
- Initial served JS contained `hiraeth.mesh.seed.v3`, `resolveFlowEpoch`, and `startMesh`; the follow-up now verifies `hiraeth.mesh.seed.v5` and `dynamicAccent()`.
- `GET /api/config` returned 6 modules and 6 services.
- `GET /api/status` returned 6 service records. The online count is environment-dependent; a later check returned `0/6` while the monitored local services were not reachable.
- Sensitive-value scan passed for the changed files.

Real browser DevTools verification was not available in this session, so visual verification is limited to origin HTTP/static checks and source review.

## Next Actions

If the flow still feels too subtle or too busy in the browser, tune `unit`, `travelX` / `travelY`, the `streamA` / `streamB` / `eddy` weights, and the `dynamicAccent()` lift threshold in `startMesh()`.

## Follow-up: Visible Flow Regression

### Evidence
After the first fix, the user reported that the background still did not visibly flow and that colored cells did not move between squares. Specifically, a green square should be able to fade back to gray while another gray square becomes green.

### Root Cause
The previous implementation still assigned each cell a generated `tone`, so accent colors were effectively fixed to individual cells. The position drift was also subtle enough that the background could appear static, especially under the layered CSS background and cache behavior.

### Changes Made

- Replaced fixed per-cell accent tones with `dynamicAccent()`, a time-based color field that can light any cell and then let it fade back to gray.
- Increased visible mesh motion by enlarging the cell unit, travel range, and flow speed while keeping each cell constrained to its occupied slot.
- Reduced the static ghost layer so the live canvas motion is not visually buried.
- Bumped mesh `sessionStorage` keys to v5 and asset query versions to `20260525-1025` so browsers load the new animation path.
- Confirmed the final CSS cascade leaves `#mesh` above the static background and below the portal content.

### Verification

- Synthetic color-flow check over 4,320 cells passed: each 1.5 second interval changed roughly 650-713 cells, including both gray-to-color and color-to-gray transitions, while keeping accent cells sparse.
- `site/app.js` and `server.mjs` syntax checks passed through Bun transpilation.
- Final CSS cascade check confirmed the last `#mesh` block uses `z-index: 2` and `opacity: 1`.
- Route checks returned HTTP 200 with the updated cache-busted assets for `/`, `/services`, `/services?module=agents`, `/monitor`, `/ports`, and `/ops`.
- `GET /api/config` returned 6 modules and 6 services; `GET /api/status` returned 6 service records and `6/6` online at verification time.
- Sensitive-value scan passed for the changed files.
