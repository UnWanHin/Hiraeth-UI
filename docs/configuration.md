# Configuration Guide

Runtime configuration lives in:

```text
config/portal.local.json
```

This file is ignored by git. Public defaults and examples live in:

```text
config/portal.example.json
```

## Brand

Set public-facing labels and metadata:

```json
{
  "brand": {
    "appName": "Hiraeth",
    "productName": "Hiraeth",
    "publicHost": "portal.example.com",
    "canonicalUrl": "https://portal.example.com/",
    "description": "A self-hosted route console.",
    "iconPath": "/icon.svg",
    "faviconPath": "/icon.svg",
    "brandImagePath": "/icon.svg",
    "ogImage": "https://portal.example.com/og.svg"
  }
}
```

Use `faviconPath` for the browser tab icon and `brandImagePath` for in-page marks such as the top bar and route hub. Use absolute HTTPS URLs for Open Graph images when the portal is publicly shared.

## Routes

Routes control the top navigation and page categories:

```json
{
  "id": "monitor",
  "code": "MON",
  "name": "Monitor",
  "description": "CPU, RAM, disk, uptime, and health.",
  "href": "/monitor",
  "accent": "blue"
}
```

Built-in page paths are:

```text
/
/services
/monitor
/ports
/ops
```

## Modules

Modules define the home-page expansion slots and the high-level service filters on `/services`:

```json
{
  "id": "api",
  "code": "API",
  "name": "API",
  "description": "API gateways, model routing, keys, and usage surfaces.",
  "href": "/services?module=api",
  "accent": "blue",
  "status": "ready"
}
```

Use stable lowercase `id` values. Services link to module cards by setting their `module` field to the module `id`. A module `href` can point at `/services?module=<id>` to open a pre-filtered service view.

## Services

Services are launcher cards:

```json
{
  "id": "api",
  "code": "API",
  "name": "API Manager",
  "description": "LiteLLM or another API gateway.",
  "href": "https://api.example.com",
  "port": 4000,
  "scope": "protected",
  "accent": "green",
  "category": "API",
  "module": "api",
  "tags": ["gateway", "models"]
}
```

Use full HTTPS URLs for independent tools on separate hostnames. Use internal paths only for pages served by Hiraeth UI itself.

Service metadata drives the portal UI:

- `category` creates category chips on `/services`.
- `module` attaches a service to a module card and enables `/services?module=<id>`.
- `tags` are shown on service cards and included in search.

If a service omits these fields, Hiraeth falls back to a neutral `Services` category and the `integrations` module instead of leaking a previous service's metadata.

## Health Checks

Health checks test whether a local TCP port accepts connections:

```json
{
  "id": "api",
  "name": "API Manager",
  "host": "127.0.0.1",
  "port": 4000
}
```

If Docker runs with host networking, `127.0.0.1` means the host machine. This is the default Linux deployment mode.

## Local Ports

`portNames` gives friendly labels to monitored ports:

```json
{
  "portNames": {
    "8790": "Hiraeth",
    "4000": "API Manager"
  }
}
```

## Benchmark Data

Run a manual benchmark:

```bash
./start.sh benchmark
```

Enable scheduled refresh:

```bash
./scripts/install-benchmark-timer.sh
```

Benchmark output is written to ignored local files under `data/`.

## Watchdog And Restart

Hiraeth can show restart buttons and run an optional watchdog for configured Docker containers. This is disabled by default because access to the Docker socket is powerful.

Enable the Docker socket override in local environment only:

```dotenv
HIRAETH_ENABLE_DOCKER_WATCHDOG=true
```

Then opt in per health check from `config/portal.local.json`:

```json
{
  "id": "api",
  "name": "API Manager",
  "host": "127.0.0.1",
  "port": 4000,
  "restart": {
    "enabled": true,
    "type": "docker",
    "container": "api-container-name",
    "label": "Restart",
    "watchdog": true
  }
}
```

Global watchdog timing is controlled by:

```json
{
  "watchdog": {
    "enabled": true,
    "intervalSeconds": 30,
    "failureThreshold": 3,
    "cooldownSeconds": 180
  }
}
```

The restart API only accepts configured service IDs and never accepts arbitrary shell commands. Host processes should stay monitor-only until a separate allowlisted backend, such as systemd unit control, is designed.
