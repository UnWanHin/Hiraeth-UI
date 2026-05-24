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
    "ogImage": "https://portal.example.com/og.svg"
  }
}
```

Use absolute HTTPS URLs for Open Graph images when the portal is publicly shared.

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
  "accent": "green"
}
```

Use full HTTPS URLs for independent tools on separate hostnames. Use internal paths only for pages served by Hiraeth UI itself.

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
