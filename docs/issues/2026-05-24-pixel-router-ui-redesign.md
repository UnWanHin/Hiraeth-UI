# Pixel Router UI Redesign Verification

## Status

Resolved for static, route, API, and local runtime checks after switching the background to a dynamic full-matrix square-cell pixel field. Browser screenshot verification remains unavailable in this environment.

## Date

2026-05-24

## Impact

The portal visual layer is being redesigned toward a denser pixel-router console style: black canvas, dynamic full-matrix square-cell pixel background, pixel typography, stronger route cards, and visible pointer trail effects.

## Evidence

The previous CSS had several accumulated pixel styling passes. The redesign consolidates the final visual language in one override layer while preserving existing HTML structure and routes.

## Root Cause

This is planned visual work, not a production incident. After first deployment, the prior background still did not match the reference because the reference uses mostly dark gray square pixel blocks, not a green dot matrix. Local reference image analysis showed dominant gray buckets such as 32/32/32 and 48/48/48, with greenish pixels only around 1.5% of the sampled image. The primary risk is UI regression: blank route pages, cached old assets, overflowing text, or background effects covering controls.

## Changes Made

- Added a final `hiraeth pixel-router redesign` CSS layer with a dense dot-field background, stronger pixel-card chrome, squared borders, brighter terminal accents, and improved mobile fallbacks.
- Increased canvas mesh density while keeping animation bounded.
- Updated CSS/JS cache-busting query strings.
- Updated the public README feature summary to describe the pixel-router visual direction.
- Replaced the green dot-matrix layer with a reference-derived dark gray pixel block field, with sparse green/blue accents and a denser canvas block renderer.

## Verification

- `node --check site/app.js` passed.
- `node --check server.mjs` passed.
- `git diff --check` passed.
- CSS brace/comment balance check passed.
- `start.sh restart` recreated the local portal container and passed `/api/config` health check.
- `/`, `/services`, `/monitor`, `/ports`, and `/ops` each returned HTTP 200 and the expected `body data-route` value.
- Served HTML includes the new `styles.css?v=20260525-0612` and `app.js?v=20260525-0612` assets.
- Served CSS includes the redesign marker, dynamic square-cell matrix layer, and pixel-font smoothing rules.
- Served CSS includes the dynamic square-cell matrix marker and the stronger `#mesh` opacity.
- Served JS includes the irregular square-cell field, pointer-proximity brightening, varied cell sizing, random clusters, and a less grid-locked cursor trail.
- Served JS includes the mesh and pointer trail code.
- `GET /api/status` returned 6/6 online services.
- Open Graph metadata still includes title, description, image, URL, type, site name, image dimensions, and image alt text.
- CSS contains no `clamp()` viewport font scaling and no negative `letter-spacing`.

Chrome/Chromium and Playwright were not available, so screenshot and console verification could not be run here.

## Next Actions

- In a browser-capable environment, capture desktop and mobile screenshots of `/`, `/services`, `/monitor`, `/ports`, and `/ops`.
- Inspect browser console for frontend errors after route navigation and launcher open/close.
- If visual overflow is observed, adjust only the final redesign layer instead of editing older historical CSS passes.

## 2026-05-25 square-cell correction

User feedback: the previous reference-derived layer still read as lines rather than small square cells. The CSS line-gradient texture and canvas data lanes were replaced with a square-cell SVG texture plus canvas-rendered cell clusters. Verified with static checks, served asset checks, route checks for `/`, `/services`, `/monitor`, `/ports`, and `/ops`, and `/api/status` returning 6/6 online services.

## 2026-05-25 dynamic full-matrix correction

User feedback: the square-cell direction is correct, but the field needs to be fully packed and more dynamic. The mesh was changed from sparse cells to a full viewport cell matrix with subtle per-cell float, pointer-proximity brightening, and a grid-snapped square-cell cursor trail. Verified with syntax checks, CSS structure checks, served asset checks, route checks for `/`, `/services`, `/monitor`, `/ports`, and `/ops`, and `/api/status` returning 6/6 online services.

## 2026-05-25 irregular cell distribution

User feedback: the square-cell direction is right, but the cells should not be regularly aligned. The matrix was changed to a jittered irregular field with varied 3-8px cells, sparse dropouts, small random clusters, larger float amplitude, and a less grid-locked cursor trail. Verified with syntax checks, CSS structure checks, served asset checks, route checks for `/`, `/services`, `/monitor`, `/ports`, and `/ops`, and `/api/status` returning 6/6 online services.
