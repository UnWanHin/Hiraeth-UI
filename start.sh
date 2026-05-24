#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$ROOT_DIR/.env"
ENV_EXAMPLE="$ROOT_DIR/.env.example"
CONFIG_FILE="$ROOT_DIR/config/portal.local.json"
CONFIG_EXAMPLE="$ROOT_DIR/config/portal.example.json"
DATA_DIR="$ROOT_DIR/data"
COMPOSE_CMD=()

usage() {
  cat <<EOF
Hiraeth UI deploy helper

Usage:
  ./start.sh              Initialize local files and start Docker
  ./start.sh start        Same as default
  ./start.sh restart      Restart the Docker service
  ./start.sh stop         Stop the Docker service
  ./start.sh status       Show container status and local health
  ./start.sh logs         Follow container logs
  ./start.sh benchmark    Run the YABS benchmark importer on the host
  ./start.sh init         Create .env and config/portal.local.json only
  ./start.sh help         Show this help

After start, open:
  http://127.0.0.1:8790
EOF
}

info() {
  printf "[hiraeth] %s\\n" "$*"
}

fail() {
  printf "[hiraeth] error: %s\\n" "$*" >&2
  exit 1
}

detect_compose() {
  if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
    COMPOSE_CMD=(docker compose)
    return 0
  fi

  if command -v docker-compose >/dev/null 2>&1; then
    COMPOSE_CMD=(docker-compose)
    return 0
  fi

  return 1
}

load_env() {
  [[ -f "$ENV_FILE" ]] || return 0

  local line key value
  while IFS= read -r line || [[ -n "$line" ]]; do
    case "$line" in
      HIRAETH_HOST=*|HIRAETH_PORT=*|HIRAETH_CONTAINER_NAME=*|HIRAETH_MIGRATE_LEGACY=*|HIRAETH_ENABLE_DOCKER_WATCHDOG=*)
        key="${line%%=*}"
        value="${line#*=}"
        value="${value%\"}"
        value="${value#\"}"
        export "$key=$value"
        ;;
    esac
  done < "$ENV_FILE"
}

ensure_runtime_files() {
  mkdir -p "$DATA_DIR"

  if [[ ! -f "$ENV_FILE" ]]; then
    cp "$ENV_EXAMPLE" "$ENV_FILE"
    info "created .env from .env.example"
  fi

  if [[ ! -f "$CONFIG_FILE" ]]; then
    cp "$CONFIG_EXAMPLE" "$CONFIG_FILE"
    info "created config/portal.local.json from config/portal.example.json"
    info "edit config/portal.local.json to add your own domain, services, and health checks"
  fi
}

local_host_for_browser() {
  local bind_host="${HIRAETH_HOST:-127.0.0.1}"

  if [[ "$bind_host" == "0.0.0.0" ]]; then
    bind_host="127.0.0.1"
  fi

  printf "%s" "$bind_host"
}

open_url() {
  printf "http://%s:%s" "$(local_host_for_browser)" "${HIRAETH_PORT:-8790}"
}

health_url() {
  printf "%s/api/config" "$(open_url)"
}

run_health_check() {
  local url index
  url="$(health_url)"

  if ! command -v curl >/dev/null 2>&1; then
    info "curl not installed; skipped local health check"
    return 0
  fi

  for ((index = 1; index <= 15; index++)); do
    if curl -fsS --max-time 3 "$url" >/dev/null 2>&1; then
      info "health check passed: $url"
      return 0
    fi
    sleep 1
  done

  info "health check not ready: $url"
  info "check logs with: ./start.sh logs"
}

prepare_legacy_container_migration() {
  local legacy_container="studio-portal"
  local target_container="${HIRAETH_CONTAINER_NAME:-hiraeth-ui}"
  local migrate="${HIRAETH_MIGRATE_LEGACY:-true}"

  if [[ "$migrate" != "true" || "$target_container" == "$legacy_container" ]]; then
    return 0
  fi

  if ! command -v docker >/dev/null 2>&1; then
    return 0
  fi

  if docker container inspect "$legacy_container" >/dev/null 2>&1; then
    info "found legacy container $legacy_container; replacing it with $target_container"
    docker rm -f "$legacy_container" >/dev/null
  fi
}
run_compose() {
  detect_compose || fail "Docker Compose is required. Install Docker Engine with the compose plugin first."
  local compose_args=()
  if [[ "${HIRAETH_ENABLE_DOCKER_WATCHDOG:-false}" == "true" ]]; then
    info "Docker watchdog enabled; mounting /var/run/docker.sock"
    compose_args=(-f docker-compose.yml -f docker-compose.watchdog.yml)
  fi
  (cd "$ROOT_DIR" && "${COMPOSE_CMD[@]}" "${compose_args[@]}" "$@")
}

start_app() {
  ensure_runtime_files
  load_env
  prepare_legacy_container_migration
  run_compose up -d
  run_health_check
  info "open $(open_url)"
  info "reverse proxy or Cloudflare Tunnel target: $(open_url)"
}

case "${1:-start}" in
  start)
    start_app
    ;;
  restart)
    ensure_runtime_files
    load_env
    prepare_legacy_container_migration
    run_compose up -d --force-recreate
    run_health_check
    ;;
  stop)
    load_env
    run_compose down
    ;;
  status)
    load_env
    run_compose ps
    run_health_check
    ;;
  logs)
    load_env
    run_compose logs -f --tail=120
    ;;
  benchmark)
    "$ROOT_DIR/scripts/run-benchmark.sh" "${@:2}"
    ;;
  init)
    ensure_runtime_files
    ;;
  help|--help|-h)
    usage
    ;;
  *)
    usage
    fail "unknown command: $1"
    ;;
esac
