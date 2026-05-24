# Pixel Router UI Redesign Verification

## Status

Resolved for static, route, API, and local runtime checks after fixing the visible pixel-field stacking. Browser screenshot verification remains unavailable in this environment.

## Date

2026-05-24

## Impact

The portal visual layer is being redesigned toward a denser pixel-router console style: black canvas, dot-field background, pixel typography, stronger route cards, and visible pointer trail effects.

## Evidence

The previous CSS had several accumulated pixel styling passes. The redesign consolidates the final visual language in one override layer while preserving existing HTML structure and routes.

## Root Cause

This is planned visual work, not a production incident. After first deployment, the dot-field still did not read clearly because the background layer used negative stacking, which can sit behind the body/html background. The primary risk is UI regression: blank route pages, cached old assets, overflowing text, or background effects covering controls.

## Changes Made

- Added a final `hiraeth pixel-router redesign` CSS layer with a dense dot-field background, stronger pixel-card chrome, squared borders, brighter terminal accents, and improved mobile fallbacks.
- Increased canvas mesh density while keeping animation bounded.
- Updated CSS/JS cache-busting query strings.
- Updated the public README feature summary to describe the pixel-router visual direction.
- Added a visible 4router-style pixel-field fix that moves the dot background to a non-negative fixed layer and raises content layers above it.

## Verification

- `node --check site/app.js` passed.
- `node --check server.mjs` passed.
- `git diff --check` passed.
- CSS brace/comment balance check passed.
- `start.sh restart` recreated the local portal container and passed `/api/config` health check.
- `/`, `/services`, `/monitor`, `/ports`, and `/ops` each returned HTTP 200 and the expected `body data-route` value.
- Served HTML includes the new `styles.css?v=20260524-1815` and `app.js?v=20260524-1815` assets.
- Served CSS includes the redesign marker, dot-field background rules, and pixel-font smoothing rules.
- Served CSS includes the visible pixel-field fix, brighter green dot rule, and non-negative background stacking.
- Served JS includes the mesh and pointer trail code.
- `GET /api/status` returned 6/6 online services.
- Open Graph metadata still includes title, description, image, URL, type, site name, image dimensions, and image alt text.
- CSS contains no `clamp()` viewport font scaling and no negative `letter-spacing`.

Chrome/Chromium and Playwright were not available, so screenshot and console verification could not be run here.

## Next Actions

- In a browser-capable environment, capture desktop and mobile screenshots of `/`, `/services`, `/monitor`, `/ports`, and `/ops`.
- Inspect browser console for frontend errors after route navigation and launcher open/close.
- If visual overflow is observed, adjust only the final redesign layer instead of editing older historical CSS passes.
