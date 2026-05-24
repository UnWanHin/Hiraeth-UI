# Deployment Guide

Hiraeth UI is designed for Linux servers. By default it runs as a private localhost service behind a reverse proxy or tunnel. The Docker service binds to `127.0.0.1:8790`, so the portal is not directly exposed on the server network.

## One-Command Local Deploy

From the repository root:

```bash
./start.sh
```

The script creates `.env` and `config/portal.local.json` if they do not already exist, starts Docker Compose, then checks `GET /api/config`. If an old container named `studio-portal` exists, it is removed before creating the default `hiraeth-ui` container; set `HIRAETH_MIGRATE_LEGACY=false` to skip that migration.

Useful commands:

```bash
./start.sh status
./start.sh logs
./start.sh restart
./start.sh stop
./start.sh benchmark
```

## Manual Docker Deploy

```bash
cp .env.example .env
cp config/portal.example.json config/portal.local.json
docker compose up -d
```

Open the local service:

```text
http://127.0.0.1:8790
```

## Cloudflare Tunnel

Create a public hostname in Cloudflare Zero Trust and point it at:

```text
http://localhost:8790
```

Recommended route model:

```text
portal.example.com     -> http://localhost:8790
api.example.com        -> another local service
hermes.example.com     -> another local service
```

Use one Access policy that covers the hostnames you want protected. The portal links can point to those hostnames; clicking a card opens the target service URL.

## Nginx Reverse Proxy

Example:

```nginx
server {
    listen 443 ssl http2;
    server_name portal.example.com;

    location / {
        proxy_pass http://127.0.0.1:8790;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Updating

```bash
git pull
./start.sh restart
```

If new config keys are added later, compare your local file with:

```bash
diff -u config/portal.example.json config/portal.local.json
```

## Rollback

```bash
git log --oneline
git checkout <known-good-commit>
./start.sh restart
```

Return to the main branch afterward:

```bash
git checkout main
```
