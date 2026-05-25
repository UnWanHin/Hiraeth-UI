# 2026-05-25: Extensible Portal Module Surface

## Status
Resolved.

## Impact
The portal needed a clearer expansion model for future private services and ports. Without a module surface, every new service would either crowd one flat page or require custom frontend changes.

Affected surface:

- Home-page module cards.
- `/services` search and filters.
- `GET /api/config` public config contract.
- Public example config and private local config shape.

## Evidence
The user plans to add more service panels over time and wants Hiraeth to remain a private admin backend rather than a public registration product. The existing page already had multiple services and monitoring sections, so future growth needed a stable taxonomy.

## Root Cause
This is not a regression. It is an extensibility gap: services previously had launch/status data but no first-class module grouping, category filters, or tag search contract.

## Changes Made

- Added `modules[]` to sanitized backend config.
- Added service `category`, `module`, and `tags` metadata.
- Added home-page module cards.
- Added `/services` search, module chips, category chips, and filtered query URLs.
- Added neutral backend fallbacks so missing metadata does not inherit the first default service.
- Updated public example config without private hostnames.
- Updated ignored local config with private deployment categories.
- Documented the decision in ADR-002.
- Bumped static asset query versions so browsers fetch the new JS/CSS.

## Verification
Completed on 2026-05-25 from the origin host:

- `node --check site/app.js` passed.
- `node --check server.mjs` passed.
- `git diff --check` passed through Bun `spawnSync` after direct shell attempts intermittently hit the local `bwrap` sandbox issue.
- Sensitive-value scan passed for tracked files: no private hostnames, tunnel targets, encoded tunnel tokens, API keys, passwords, or secrets were found.
- `./start.sh restart` completed and the container health check passed at `http://127.0.0.1:8790/api/config`.
- Route checks returned HTTP 200 and correct `body[data-route]` for `/`, `/services`, `/services?module=control`, `/services?module=agents`, `/monitor`, `/ports`, and `/ops`.
- `GET /api/config` returned 6 modules and 6 services; all services had `category`, `module`, and `tags` metadata.
- `GET /api/status` returned `6/6` online at verification time.
- Root HTML contained the expected module/search surfaces and Open Graph tags.
- Served JS contained `renderModules` and `renderServiceFilters`.

Real browser DevTools verification was not available in this session, so verification used the strongest available origin HTTP, static asset, syntax, and API checks.

## Next Actions

For future services, add a service entry and, if needed, a module entry in ignored local config. Keep private hostnames and personal assets out of tracked files.
