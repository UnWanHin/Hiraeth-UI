# Watchdog Restart Controls

## Status

Resolved after local static and runtime API verification.

## Date

2026-05-24

## Impact

The portal previously displayed TCP health state but had no manual way to re-check services and no controlled restart path for watched ports. Operators had to leave the portal and restart containers manually.

## Evidence

- Existing status data comes from `GET /api/status` and `GET /api/monitor` TCP probes.
- The frontend refreshed status on a timer but did not expose a manual health probe button.
- Restart actions need elevated Docker access, so arbitrary commands or client-supplied container names are not acceptable.

## Root Cause

This was a missing operations feature, not a rendering regression. Health checks were read-only and did not include a restart contract.

## Changes Made

- Added `POST /api/restart` for configured health check IDs only.
- Added optional per-health-check Docker restart metadata.
- Added optional watchdog timing config and cooldown state.
- Added manual Check buttons on Monitor and Ports.
- Added restart controls to Monitor service health rows.
- Added an opt-in Docker Compose override for mounting `/var/run/docker.sock`.

## Verification

- `bash -n start.sh` passed.
- `node --check server.mjs` passed.
- `node --check site/app.js` passed.
- `git diff --check` passed.
- `docker compose -f docker-compose.yml -f docker-compose.watchdog.yml config --quiet` passed.
- `start.sh restart` recreated the local portal container with the watchdog override enabled.
- Docker inspect confirmed `/var/run/docker.sock` is mounted only through the override.
- `GET /api/status` returned 6/6 online and restart metadata for configured Docker services.
- `POST /api/restart` rejected a non-configured host process with `409 RESTART_NOT_CONFIGURED`.
- `POST /api/restart` rejected an unknown ID with `404 RESTART_TARGET_NOT_FOUND`.
- `POST /api/restart` successfully restarted a configured Docker service and reported `Manual restart sent`.
- `/`, `/services`, `/monitor`, `/ports`, and `/ops` returned the correct `body data-route` markers.
- Served `/app.js` contains the restart button and manual health refresh handlers.

Browser screenshot/console verification was not available in this environment because Chrome/Chromium and Playwright are not installed.

## Next Actions

- In a browser-capable environment, verify the Monitor row layout visually and check the console for frontend errors.
- Add a separate safe restart backend before making host processes restartable.
