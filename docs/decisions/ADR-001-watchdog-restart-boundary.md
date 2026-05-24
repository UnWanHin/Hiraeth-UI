# ADR-001: Use Opt-In Docker Watchdog Restart Boundary

## Status

Accepted

## Date

2026-05-24

## Context

Hiraeth needs to show service health and optionally recover configured local services when a watched port goes offline. Restarting services from a web portal is security-sensitive because access to the Docker socket can control the host Docker daemon.

Requirements:

- Manual service restart from the portal UI.
- Optional automatic watchdog restart after repeated failed TCP probes.
- No arbitrary shell execution from HTTP input.
- No deployment-specific container names in tracked source.
- Open-source defaults must be safe for other deployers.

## Decision

Use an opt-in Docker restart boundary:

- Docker socket mounting is disabled by default.
- `docker-compose.watchdog.yml` mounts `/var/run/docker.sock` only when enabled locally.
- `POST /api/restart` accepts only configured health check IDs.
- Restart actions are validated from config and currently support only `type: "docker"` with a safe container name pattern.
- Watchdog restarts require both global `watchdog.enabled` and per-service `restart.watchdog`.

## Alternatives Considered

### Arbitrary restart command per service

- Pros: Flexible for host processes, systemd units, scripts, and containers.
- Cons: High command-injection and secret leakage risk; hard to make safe for open-source defaults.
- Rejected because it exposes too much host control through config and HTTP-triggered behavior.

### Docker restart through CLI commands

- Pros: Simple implementation.
- Cons: Requires Docker CLI inside the portal image and still needs shell/process execution.
- Rejected in favor of Docker Engine API over the mounted socket.

### Read-only health checks only

- Pros: Safest default.
- Cons: Does not satisfy operational recovery needs.
- Rejected because the feature is useful when kept opt-in and allowlisted.

## Consequences

- Deployers who want auto-restart must knowingly enable the watchdog override.
- Host processes such as Python apps are monitored but not restartable until a separate safe backend, such as a systemd allowlist, is designed.
- Public repository examples stay safe because restart and watchdog are disabled by default.
