#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DATA_DIR="${DATA_DIR:-$ROOT_DIR/data}"
YABS_URL="${YABS_URL:-https://yabs.sh}"
INTERVAL_SECONDS="${BENCHMARK_INTERVAL_SECONDS:-21600}"
STATUS_PATH="${BENCHMARK_STATUS:-$DATA_DIR/benchmark-status.local.json}"
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
YABS_SCRIPT="${TMPDIR:-/tmp}/yabs-$TIMESTAMP.sh"
RAW_LOG="$DATA_DIR/yabs-$TIMESTAMP.raw.log"
LATEST_LOG="$DATA_DIR/yabs-latest.raw.log"
JSON_TMP="$DATA_DIR/benchmark.local.json.tmp"
JSON_OUT="$DATA_DIR/benchmark.local.json"
LOCK_DIR="$DATA_DIR/benchmark.lock"
STARTED_AT=""

mkdir -p "$DATA_DIR"

iso_now() {
  date -u +%Y-%m-%dT%H:%M:%SZ
}

iso_after_seconds() {
  local seconds="$1"
  date -u -d "@$(($(date +%s) + seconds))" +%Y-%m-%dT%H:%M:%SZ
}

write_status() {
  local running="$1"
  local message="$2"
  local exit_code="${3:-}"
  local finished_at="${4:-}"
  local next_run=""

  if [[ "$running" == "false" && "$INTERVAL_SECONDS" =~ ^[0-9]+$ && "$INTERVAL_SECONDS" -gt 0 ]]; then
    next_run="$(iso_after_seconds "$INTERVAL_SECONDS")"
  fi

  STATUS_MODE="${BENCHMARK_MODE:-scheduled}" \
  STATUS_PATH="$STATUS_PATH" \
  STATUS_RUNNING="$running" \
  STATUS_INTERVAL_SECONDS="$INTERVAL_SECONDS" \
  STATUS_STARTED_AT="$STARTED_AT" \
  STATUS_FINISHED_AT="$finished_at" \
  STATUS_NEXT_RUN_AT="$next_run" \
  STATUS_EXIT_CODE="$exit_code" \
  STATUS_MESSAGE="$message" \
  node <<'NODE'
const { writeFileSync, mkdirSync } = require('node:fs');
const { dirname } = require('node:path');
const emptyToNull = (value) => value ? value : null;
const numberOrNull = (value) => {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};
const statusPath = process.env.STATUS_PATH;
const payload = {
  mode: process.env.STATUS_MODE || 'scheduled',
  running: process.env.STATUS_RUNNING === 'true',
  intervalSeconds: numberOrNull(process.env.STATUS_INTERVAL_SECONDS),
  lastStartedAt: emptyToNull(process.env.STATUS_STARTED_AT),
  lastFinishedAt: emptyToNull(process.env.STATUS_FINISHED_AT),
  nextRunAt: emptyToNull(process.env.STATUS_NEXT_RUN_AT),
  lastExitCode: numberOrNull(process.env.STATUS_EXIT_CODE),
  message: process.env.STATUS_MESSAGE || '',
};
mkdirSync(dirname(statusPath), { recursive: true });
writeFileSync(statusPath, JSON.stringify(payload, null, 2) + '\n');
NODE
}

if [[ $# -eq 0 && -n "${BENCHMARK_ARGS:-}" ]]; then
  set -- $BENCHMARK_ARGS
fi

if [[ -d "$LOCK_DIR" ]]; then
  old_pid="$(cat "$LOCK_DIR/pid" 2>/dev/null || true)"
  if [[ -n "$old_pid" ]] && ! kill -0 "$old_pid" 2>/dev/null; then
    rm -rf "$LOCK_DIR"
  fi
fi

if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  echo "[benchmark] another benchmark run is already active"
  write_status true "benchmark already running" "" "" || true
  exit 0
fi

echo "$$" > "$LOCK_DIR/pid"

finish() {
  local code=$?
  trap - EXIT
  local finished_at="$(iso_now)"

  if [[ "$code" -eq 0 ]]; then
    write_status false "ready" "$code" "$finished_at" || true
  else
    write_status false "failed" "$code" "$finished_at" || true
  fi

  rm -rf "$LOCK_DIR"
  rm -f "$YABS_SCRIPT" "$JSON_TMP"
  exit "$code"
}

trap finish EXIT
STARTED_AT="$(iso_now)"
write_status true "running" "" "" || true

echo "[benchmark] downloading YABS from $YABS_URL"
curl -fsSL "$YABS_URL" -o "$YABS_SCRIPT"
chmod 700 "$YABS_SCRIPT"

echo "[benchmark] running YABS; raw log: $RAW_LOG"
bash "$YABS_SCRIPT" "$@" | tee "$RAW_LOG"
cp "$RAW_LOG" "$LATEST_LOG"

echo "[benchmark] parsing structured monitor data"
node "$ROOT_DIR/scripts/parse-yabs.mjs" "$RAW_LOG" > "$JSON_TMP"
mv "$JSON_TMP" "$JSON_OUT"

echo "[benchmark] wrote $JSON_OUT"
echo "[benchmark] refresh /monitor to view the uploaded benchmark data"
