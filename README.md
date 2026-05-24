# Hiraeth UI

A lightweight, self-hosted Hiraeth route console for Docker services, local tools, server monitoring, and operator links.

The project is source-code first and Docker deployed. It currently uses the official `node:22-alpine` image through `docker-compose.yml`; no custom Docker image is required.

## Features

- Path-based portal pages: `/`, `/services`, `/monitor`, `/ports`, `/ops`
- Live server monitor API for CPU, memory, disk, uptime, and service health
- Optional YABS benchmark import for network, disk, and Geekbench snapshots with scheduled refresh status
- Browser-side Oracle region latency probe based on CloudPingTest endpoint style
- Config-driven branding, services, links, health checks, ticker text, and terminal copy
- Pixel-terminal UI with a black canvas and pointer trail
- Security headers enabled by default
- No secrets required in tracked source files

## Quick Start

```bash
cp config/portal.example.json config/portal.local.json
# Edit config/portal.local.json for your own domain, services, and health checks.
docker compose up -d
```

The app binds to:

```text
http://127.0.0.1:8790
```

If you expose it through Cloudflare Tunnel or another reverse proxy, point the public hostname at:

```text
http://localhost:8790
```

## Configuration

Tracked template:

```text
config/portal.example.json
```

Local private override, ignored by git:

```text
config/portal.local.json
```

Do not commit private hostnames, service names, tokens, API keys, or personal images. Keep them in `portal.local.json`, environment variables, or your deployment platform.

## Backend API

- `GET /api/config` returns the sanitized public UI configuration.
- `GET /api/status` returns configured service health checks.
- `GET /api/monitor` returns host metrics, benchmark summary, benchmark automation status, and service health.
- `GET /api/benchmark` returns the latest sanitized benchmark import plus automation status.

## Benchmark Import

Run the importer manually when you want to refresh the Monitor benchmark panel immediately:

```bash
./scripts/run-benchmark.sh
```

The script downloads YABS, runs it, saves the raw output under `data/*.raw.log`, then writes structured monitor data to:

```text
data/benchmark.local.json
```

It also writes scheduler/run state to:

```text
data/benchmark-status.local.json
```

To make the benchmark panel update automatically, install the user-level systemd timer. The default interval is every 6 hours, with the first run scheduled about 5 minutes after enabling:

```bash
./scripts/install-benchmark-timer.sh
```

Use a custom interval in seconds if needed:

```bash
./scripts/install-benchmark-timer.sh 43200
```

Both the local benchmark JSON, scheduler state, and raw logs are ignored by git. You can pass normal YABS flags through the wrapper, for example:

```bash
./scripts/run-benchmark.sh -s
```

## Project Layout

- `server.mjs` static server, config loader, health checks, and monitor API
- `site/index.html` static shell and default SEO metadata
- `site/app.js` UI rendering, route switching, status polling, and canvas effects
- `site/styles.css` visual design
- `scripts/run-benchmark.sh` YABS import wrapper with run status updates
- `scripts/install-benchmark-timer.sh` optional user-level systemd timer installer
- `scripts/parse-yabs.mjs` raw YABS log parser
- `data/benchmark.example.json` public empty benchmark template
- `config/portal.example.json` public template config
- `docker-compose.yml` runtime container settings

## GitHub Safety Checklist

Before pushing a public repository:

```bash
git status --ignored --short
rg -n "token|secret|password|api[_-]?key|your-private-domain" . -g '!config/portal.local.json' -g '!site/local-icon.*' -g '!data/benchmark.local.json' -g '!data/benchmark-status.local.json' -g '!data/*.raw.log' -g '!geekbench_claim.url'
```

`config/portal.local.json`, `site/local-icon.*`, `data/benchmark.local.json`, `data/benchmark-status.local.json`, `data/*.raw.log`, and `geekbench_claim.url` are intentionally ignored.
