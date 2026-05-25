# 2026-05-25: Service Card Click Navigation

## Status
Resolved.

## Impact
The Services page cards looked clickable but users could only reliably open a service from the detail panel button below the grid.

## Evidence
Service cards are rendered as anchors with `href`, but moving the pointer over a card called `setSelected()`. That function re-rendered the entire service grid before the click completed.

## Root Cause
`setSelected()` called `renderServices()`, which replaced the hovered anchor node during pointerover/focus selection. The replacement made the card click unreliable even though the detail panel Open action still worked.

## Changes Made

- Added `syncSelectedServiceCards()` to update `.selected` classes in place.
- Changed `setSelected()` so hover/focus selection updates only selection state, card classes, detail panel, and launcher preview.
- Kept local-only service cards protected by the existing `.local-disabled` click guard.
- Bumped the JS asset query to `20260525-1055` so browsers load the fixed interaction code.

## Verification

- `site/app.js` and `server.mjs` syntax checks passed through Bun transpilation.
- Source check confirmed `setSelected()` no longer calls `renderServices()` and does call `syncSelectedServiceCards()`.
- Root HTML and served route checks confirmed `app.js?v=20260525-1055` loads for `/`, `/services`, `/services?module=agents`, `/monitor`, `/ports`, and `/ops`.
- Served JS check confirmed the deployed asset contains the no-grid-rerender `setSelected()` path.
- `GET /api/config` returned 6 modules and 6 services.
- Open Graph metadata contract remains present in `site/index.html`.
- Sensitive-value scan passed for the changed files.

## Notes
Real browser DevTools verification was not available in this session; verification is limited to source, served asset, and route checks.
