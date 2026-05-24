# Start Script Health Check Noise

## Status

Resolved.

## Date

2026-05-24

## Symptom

During `./start.sh restart`, Docker recreated the container successfully, but the health-check retry loop printed a transient `curl: (7) Failed to connect` line while the server was still starting.

## Root Cause

The retry loop intentionally tolerates failed attempts, but curl stderr was not suppressed.

## Fix

Redirected curl stderr to `/dev/null` inside the retry loop so only the final Hiraeth status messages are shown.

## Verification

- `bash -n start.sh`
- `./start.sh restart` via Bun-spawned shell
- `GET /api/config` returned 200 after restart
