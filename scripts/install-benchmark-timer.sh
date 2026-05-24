#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INTERVAL_SECONDS="${1:-${BENCHMARK_INTERVAL_SECONDS:-21600}}"
FIRST_RUN_SECONDS="${BENCHMARK_FIRST_RUN_SECONDS:-300}"
UNIT_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/systemd/user"
SERVICE_FILE="$UNIT_DIR/hiraeth-ui-benchmark.service"
TIMER_FILE="$UNIT_DIR/hiraeth-ui-benchmark.timer"
STATUS_PATH="${BENCHMARK_STATUS:-$ROOT_DIR/data/benchmark-status.local.json}"

mkdir -p "$UNIT_DIR"

cat > "$SERVICE_FILE" <<UNIT
[Unit]
Description=Refresh Hiraeth UI YABS benchmark data
Documentation=file://$ROOT_DIR/README.md

[Service]
Type=oneshot
WorkingDirectory=$ROOT_DIR
Environment=BENCHMARK_INTERVAL_SECONDS=$INTERVAL_SECONDS
Environment=BENCHMARK_STATUS=$STATUS_PATH
ExecStart=$ROOT_DIR/scripts/run-benchmark.sh
Nice=10
IOSchedulingClass=best-effort
IOSchedulingPriority=7
UNIT

cat > "$TIMER_FILE" <<UNIT
[Unit]
Description=Refresh Hiraeth UI YABS benchmark data on a safe interval

[Timer]
OnActiveSec=${FIRST_RUN_SECONDS}s
OnUnitInactiveSec=${INTERVAL_SECONDS}s
RandomizedDelaySec=0
Persistent=true
Unit=hiraeth-ui-benchmark.service

[Install]
WantedBy=timers.target
UNIT

STATUS_PATH="$STATUS_PATH" \
STATUS_INTERVAL_SECONDS="$INTERVAL_SECONDS" \
STATUS_NEXT_RUN_AT="$(date -u -d "@$(($(date +%s) + FIRST_RUN_SECONDS))" +%Y-%m-%dT%H:%M:%SZ)" \
node <<'NODE'
const { writeFileSync, mkdirSync } = require('node:fs');
const { dirname } = require('node:path');
const payload = {
  mode: 'scheduled',
  running: false,
  intervalSeconds: Number(process.env.STATUS_INTERVAL_SECONDS),
  lastStartedAt: null,
  lastFinishedAt: null,
  nextRunAt: process.env.STATUS_NEXT_RUN_AT,
  lastExitCode: null,
  message: 'systemd timer enabled',
};
mkdirSync(dirname(process.env.STATUS_PATH), { recursive: true });
writeFileSync(process.env.STATUS_PATH, JSON.stringify(payload, null, 2) + '\n');
NODE

systemctl --user daemon-reload
systemctl --user enable --now hiraeth-ui-benchmark.timer
systemctl --user list-timers hiraeth-ui-benchmark.timer --no-pager
