# 2026-05-24: Portal Rendering Regression After I18n Changes

## Status

Open. Several root causes have been identified and patched, but a real browser verification pass is still required.

## Impact

The portal became partially or fully empty after the language-switching/i18n changes.

Observed user-facing symptoms:

- The main page appeared blank at least once.
- Path routes such as `/services`, `/monitor`, `/ports`, and `/ops` appeared to lose content or fall back incorrectly.
- `/services` showed only the page header: `launch matrix`, `Services`, the lead text, and `sync pending`; service cards were missing.

Affected surface:

- Frontend route rendering in `site/app.js`.
- Static route fallback behavior in `site/styles.css` and `server.mjs`.
- Cache busting for `/app.js` and `/styles.css` references in `site/index.html`.

## Context

A request changed the portal title from a previous longer product name to `Hiraeth`, changed time display to UTC+8, and added Traditional Chinese, Simplified Chinese, and English switching in the top-right corner.

The i18n change touched many runtime-rendered strings and initialization code in one pass. The build step passed, but build success did not catch DOM/runtime errors.

## Evidence Collected

Origin-side checks showed the backend data was still present:

- `GET /api/config` returned brand `Hiraeth`.
- `GET /api/config` returned 6 services: portal, monitor, hermes, litellm, cloudflared, homepage.
- `GET /services` returned HTML containing `id="service-grid"`.
- `GET /services` returned `<body data-route="services">` after the server-side route injection fix.

This means the service data was not deleted. The regression is in frontend initialization/rendering and route fallback, not in the config data.

## Confirmed Root Causes

### 1. Invalid i18n selectors stopped initialization

The first i18n implementation accidentally produced selectors like:

`$([data-i18n])`

This is invalid JavaScript for the intended selector call and can throw before the shell renders. It was corrected to:

`$$([data-i18n])`

or equivalent double-dollar query calls.

### 2. Static body route was hard-coded to home

A no-JS fallback was added as:

`<body data-route="home">`

This was too broad. The portal CSS uses `body[data-route]` to decide which page is visible. Hard-coding `home` meant other paths could appear empty or show the wrong page if JS did not finish loading.

The fix was to move route selection into `server.mjs`, so the server injects the correct route based on request path:

- `/` -> `home`
- `/services` -> `services`
- `/monitor` -> `monitor`
- `/ports` -> `ports`
- `/ops` -> `ops`

### 3. languageButtons was a single element but used as an array

`elements.languageButtons` was accidentally set with single-element selector logic:

`languageButtons: $("[data-lang-option]")`

Later initialization called:

`elements.languageButtons.forEach(...)`

That throws `forEach is not a function`, stopping initialization before `renderServices()` can populate the service cards.

The intended value is:

`languageButtons: $$("[data-lang-option]")`

### 4. String replacement with $$ collapsed unexpectedly

While patching with JavaScript `String.replace(search, replacement)`, a replacement string containing `$$` was interpreted by JavaScript replacement rules as a single literal `$`.

Use a replacer function when writing text that contains `$$`:

`text.replace(search, () => replacement)`

## Changes Made So Far

Files touched during the regression/fix cycle:

- `site/app.js`
  - Added i18n dictionary and language switching.
  - Changed time formatting to UTC+8.
  - Fixed invalid i18n selectors.
  - Fixed `languageButtons` to use all matching language buttons.
- `site/index.html`
  - Added language switcher controls.
  - Updated asset query versions to break stale browser/CDN cache.
  - Removed static hard-coded `body data-route="home"` after server-side route injection was added.
- `site/styles.css`
  - Added language switcher styling.
  - Added page fallback rules.
- `server.mjs`
  - Added route detection for HTML fallback responses.
  - Injects `body data-route="..."` based on request path.
- `config/portal.local.json`
  - Local brand changed to `Hiraeth`.

## Verification Completed

Commands that passed at origin:

- `bun build site/app.js --target=browser`
- `bun build server.mjs --target=node`
- `GET /api/config` returns 6 services.
- `GET /services` returns `<body data-route="services">`.
- `GET /monitor` returns monitor HTML and current JS/CSS asset versions.

## Still Unverified

A real browser runtime check is still required. The environment did not have Chromium available when this issue was written, so curl/build checks could not prove that:

- The browser console is error-free.
- `renderServices()` actually populates the service cards in the DOM.
- The language switcher does not break route rendering.
- Cloudflare Access/browser cache is not serving stale assets.

## Recommended Next Actions

1. Run a browser verification pass as soon as browser tooling is available.
2. If services are still empty, temporarily remove the language switcher/i18n layer and keep only:
   - `Hiraeth` brand name.
   - UTC+8 clock/time formatting.
   - Existing pre-i18n service rendering logic.
3. Add a small smoke test that loads each route and asserts these elements are populated:
   - `/services`: `#service-grid .service-card` count > 0.
   - `/monitor`: monitor cards exist and `#monitor-updated` changes after API load.
   - `/ports`: `#port-list` exists.
   - `/ops`: `.ops-grid a` count > 0.
4. Avoid large frontend-wide i18n rewrites without a browser smoke test.

## Rollback Plan

If the portal remains broken, rollback the i18n feature only. Keep the smaller accepted changes:

- Brand name: `Hiraeth`.
- UTC+8 time display.
- Server route injection by path.

Remove or disable:

- Language switcher markup in `site/index.html`.
- i18n dictionary and dynamic translation layer in `site/app.js`.
- Language switcher CSS in `site/styles.css`.

After rollback, verify all paths again and update this issue with final status.
