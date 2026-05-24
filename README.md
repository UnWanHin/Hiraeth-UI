# Hiraeth UI

Hiraeth UI is a lightweight self-hosted route console for private tools, Docker services, local ports, server monitoring, and operator links. It is built as a source-code-first Node app and runs with Docker Compose using the official `node:22-alpine` image.

The default deployment binds to `127.0.0.1:8790`, so it is intended to sit behind Cloudflare Tunnel, Nginx, Caddy, or another reverse proxy.

## Features

- Path-based portal pages: `/`, `/services`, `/monitor`, `/ports`, `/ops`
- Config-driven service launcher, route categories, health checks, ticker text, and ops links
- Live monitor API for CPU, memory, disk, uptime, process count, and TCP service health
- Optional YABS benchmark import for network speed, disk IO, and Geekbench snapshots
- Browser-side Oracle region latency probe
- Pixel-terminal UI with black canvas styling and pointer trail effects
- Security headers enabled by default
- Open-source hygiene: local config, benchmark output, secrets, and personal assets are ignored

## Quick Start

```bash
git clone https://github.com/UnWanHin/Hiraeth-UI.git
cd Hiraeth-UI
./start.sh
```

Then open:

```text
http://127.0.0.1:8790
```

`./start.sh` creates `.env` and `config/portal.local.json` on first run, starts Docker Compose, and checks the local API.

## One-Click Deploy Script

```bash
./start.sh              # initialize and start
./start.sh status       # show container status and API health
./start.sh logs         # follow container logs
./start.sh restart      # recreate and restart
./start.sh stop         # stop the stack
./start.sh benchmark    # run YABS importer on the host
```

The script does not overwrite an existing `.env` or `config/portal.local.json`.

## Manual Docker Deploy

```bash
cp .env.example .env
cp config/portal.example.json config/portal.local.json
docker compose up -d
```

Default bind:

```text
http://127.0.0.1:8790
```

Default Docker service:

```text
hiraeth-ui
```

Change port, host, or container name in `.env`:

```dotenv
HIRAETH_HOST=127.0.0.1
HIRAETH_PORT=8790
HIRAETH_CONTAINER_NAME=hiraeth-ui
HIRAETH_MIGRATE_LEGACY=true
```

If you previously ran this portal under the old container name `studio-portal`, the start script removes that legacy container before creating `hiraeth-ui`. Set `HIRAETH_MIGRATE_LEGACY=false` in `.env` to disable that behavior.

## Reverse Proxy

For Cloudflare Tunnel, publish a hostname and point the service at:

```text
http://localhost:8790
```

For independent tools, prefer one hostname per service:

```text
portal.example.com  -> Hiraeth UI
api.example.com     -> API manager
hermes.example.com  -> Hermes
```

Put all protected hostnames under the same Cloudflare Access application if you want one login session across the portal and linked tools.

More deployment notes are in [docs/deployment.md](docs/deployment.md).

## Configuration

Tracked template:

```text
config/portal.example.json
```

Private local override:

```text
config/portal.local.json
```

Edit `config/portal.local.json` to add your own domain, services, health checks, port labels, and ops links. Do not commit private hostnames, service names, tokens, API keys, or personal images.

More config examples are in [docs/configuration.md](docs/configuration.md).

## Backend API

- `GET /api/config` returns sanitized public UI configuration.
- `GET /api/status` returns configured TCP service health checks.
- `GET /api/monitor` returns host metrics, benchmark summary, automation status, and service health.
- `GET /api/benchmark` returns the latest sanitized benchmark import plus automation status.

## Benchmark Import

Run once:

```bash
./start.sh benchmark
```

Install a user-level systemd timer:

```bash
./scripts/install-benchmark-timer.sh
```

Use a custom interval in seconds:

```bash
./scripts/install-benchmark-timer.sh 43200
```

Benchmark JSON, scheduler state, raw logs, and lock files are ignored by git.

## Project Layout

- `server.mjs` static server, config loader, health checks, and monitor API
- `site/index.html` static shell and default SEO metadata
- `site/app.js` UI rendering, route switching, status polling, and canvas effects
- `site/styles.css` visual design
- `config/portal.example.json` public template config
- `.env.example` Docker Compose defaults
- `start.sh` one-command deploy helper
- `scripts/run-benchmark.sh` YABS import wrapper
- `scripts/install-benchmark-timer.sh` optional systemd timer installer
- `scripts/parse-yabs.mjs` raw YABS log parser
- `data/benchmark.example.json` public empty benchmark template
- `docs/` deployment, configuration, and maintenance docs

## Security Notes

- Keep Hiraeth bound to localhost unless you have a separate authentication layer.
- Use Cloudflare Access, Nginx auth, VPN, or another gate for public exposure.
- Keep deployment-specific values in `.env` or `config/portal.local.json`.
- Do not commit `.env`, `config/*.local.json`, private keys, tunnel tokens, benchmark raw logs, or personal images.

Before pushing a public repository:

```bash
git status --ignored --short
rg -n "token|secret|password|api[_-]?key|your-private-domain" . -g "!config/portal.local.json" -g "!site/local-icon.*" -g "!data/benchmark.local.json" -g "!data/benchmark-status.local.json" -g "!data/*.raw.log" -g "!geekbench_claim.url"
```

## License

Add a `LICENSE` file before presenting this as a public reusable project.
