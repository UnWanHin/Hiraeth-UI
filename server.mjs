import { createServer, request as httpRequest } from "node:http";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { Socket } from "node:net";
import { promisify } from "node:util";
import { arch, cpus, hostname, platform } from "node:os";

const execFileAsync = promisify(execFile);
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 8790);
const root = process.env.STATIC_ROOT || "/app/site";
const benchmarkPath = process.env.BENCHMARK_DATA || "/app/data/benchmark.local.json";
const benchmarkStatusPath = process.env.BENCHMARK_STATUS || "/app/data/benchmark-status.local.json";
const dockerSocketPath = process.env.DOCKER_SOCKET || "/var/run/docker.sock";

const defaultConfig = {
  brand: {
    appName: "Hiraeth",
    productName: "Hiraeth",
    publicHost: "portal.example.com",
    canonicalUrl: "https://portal.example.com/",
    description: "A protected route console for services, monitoring, local ports, and operator tools.",
    iconPath: "/icon.svg",
    faviconPath: "/icon.svg",
    brandImagePath: "/icon.svg",
    ogImage: "https://portal.example.com/og.svg",
    protectedLabel: "Access protected",
    bindLabel: "127.0.0.1:8790",
    launcherFooterLabel: "Protected route",
  },
  routes: [
    { id: "home", code: "H", name: "Home", description: "Route overview and live summary.", href: "/", accent: "white" },
    { id: "services", code: "SVC", name: "Services", description: "Launch local apps and external consoles.", href: "/services", accent: "green" },
    { id: "monitor", code: "MON", name: "Monitor", description: "CPU, RAM, disk, uptime, and health.", href: "/monitor", accent: "blue" },
    { id: "ports", code: "TCP", name: "Ports", description: "Local listener and tunnel targets.", href: "/ports", accent: "yellow" },
    { id: "ops", code: "OPS", name: "Ops", description: "Operations links and documentation.", href: "/ops", accent: "red" },
  ],
  services: [
    { id: "portal", code: "PORTAL", name: "Hiraeth", description: "Primary control surface and service launcher.", href: "/", port: 8790, scope: "public", accent: "white" },
    { id: "monitor", code: "MON", name: "Server Monitor", description: "Live CPU, RAM, disk, uptime, and port health.", href: "/monitor", port: 8790, scope: "public", accent: "blue" },
  ],
  healthChecks: [
    { id: "portal", name: "Hiraeth", host: "127.0.0.1", port: 8790 },
    { id: "monitor", name: "Server Monitor", host: "127.0.0.1", port: 8790 },
  ],
  portNames: { 8790: "Hiraeth" },
  watchdog: { enabled: false, intervalSeconds: 30, failureThreshold: 3, cooldownSeconds: 180 },
  heroTerminal: [
    { code: "00", command: "mount route://portal.example.com", status: "OK" },
    { code: "01", command: "enable access gate", status: "READY" },
    { code: "02", command: "scan local ports --watch 8790", status: "LIVE" },
  ],
  ticker: ["HIRAETH://ROUTE MATRIX ONLINE", "ACCESS:GATE_ENABLED", "TUNNEL:LOCALHOST:8790", "MONITOR:/monitor", "SERVICES:/services", "PORTS:/ports", "OPS:/ops", "PIXEL TRAIL:ARMED"],
  opsLinks: [],
};

const defaultBenchmarkAutomation = {
  mode: "manual",
  running: false,
  intervalSeconds: null,
  lastStartedAt: null,
  lastFinishedAt: null,
  nextRunAt: null,
  lastExitCode: null,
  message: "No benchmark scheduler state found.",
};

const defaultBenchmark = {
  updatedAt: null,
  status: "empty",
  source: "none",
  summary: "No benchmark result uploaded yet.",
  system: {
    os: "",
    kernel: "",
    virtualization: "",
    location: "",
    isp: "",
    asn: "",
    host: "",
    country: "",
  },
  cpu: {
    model: "",
    cores: null,
    singleCore: null,
    multiCore: null,
    fullTest: "",
  },
  memory: {
    total: "",
    swap: "",
  },
  disk: [],
  network: [],
  raw: {
    path: "",
    note: "Run scripts/run-benchmark.sh on the host to generate data/benchmark.local.json.",
  },
};

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

const baseHeaders = {
  "cache-control": "no-store",
  "content-security-policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
  "referrer-policy": "same-origin",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
};

let previousCpuSnapshot = null;
let previousDiskIoSnapshot = null;
let publicRouteCache = { expiresAt: 0, values: [] };

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function cleanText(value, fallback = "", maxLength = 180) {
  if (typeof value !== "string") return fallback;
  const cleaned = value.replace(/[\u0000-\u001f\u007f]/g, "").trim();
  return cleaned ? cleaned.slice(0, maxLength) : fallback;
}

function cleanId(value, fallback = "item") {
  const cleaned = cleanText(value, fallback, 48).toLowerCase().replace(/[^a-z0-9_-]/g, "");
  return cleaned || fallback;
}

function cleanAccent(value, fallback = "green") {
  const allowed = new Set(["white", "green", "blue", "yellow", "red"]);
  const cleaned = cleanText(value, fallback, 16).toLowerCase();
  return allowed.has(cleaned) ? cleaned : fallback;
}

function cleanHref(value, fallback = "#") {
  const cleaned = cleanText(value, fallback, 500);
  if (cleaned.startsWith("/") || cleaned.startsWith("#")) return cleaned;
  try {
    const url = new URL(cleaned);
    return ["http:", "https:"].includes(url.protocol) ? cleaned : fallback;
  } catch {
    return fallback;
  }
}

function cleanPort(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 && parsed <= 65535 ? parsed : null;
}

function cleanOptionalNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function cleanIsoDate(value) {
  if (typeof value !== "string") return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? new Date(parsed).toISOString() : null;
}

function cleanHost(value, fallback = "127.0.0.1") {
  const cleaned = cleanText(value, fallback, 253);
  return /^[a-zA-Z0-9_.:-]+$/.test(cleaned) ? cleaned : fallback;
}

function cleanBoolean(value, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function cleanInteger(value, fallback, min, max) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function cleanDockerContainer(value) {
  const cleaned = cleanText(value, "", 128);
  return /^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,127}$/.test(cleaned) ? cleaned : "";
}

function cleanRestartAction(value) {
  const action = isRecord(value) ? value : {};
  const type = cleanText(action.type, "", 16).toLowerCase();
  if (type !== "docker") return null;
  const container = cleanDockerContainer(action.container);
  if (!container) return null;
  return {
    enabled: cleanBoolean(action.enabled, false),
    type: "docker",
    container,
    label: cleanText(action.label, "Restart", 32),
    watchdog: cleanBoolean(action.watchdog, false),
  };
}

function cleanWatchdogConfig(value) {
  const watchdog = isRecord(value) ? value : {};
  return {
    enabled: cleanBoolean(watchdog.enabled, defaultConfig.watchdog.enabled),
    intervalSeconds: cleanInteger(watchdog.intervalSeconds, defaultConfig.watchdog.intervalSeconds, 10, 3600),
    failureThreshold: cleanInteger(watchdog.failureThreshold, defaultConfig.watchdog.failureThreshold, 1, 20),
    cooldownSeconds: cleanInteger(watchdog.cooldownSeconds, defaultConfig.watchdog.cooldownSeconds, 30, 86400),
  };
}

function cleanBrand(value) {
  const brand = isRecord(value) ? value : {};
  const iconPath = cleanHref(brand.iconPath, defaultConfig.brand.iconPath);
  return {
    appName: cleanText(brand.appName, defaultConfig.brand.appName, 80),
    productName: cleanText(brand.productName, defaultConfig.brand.productName, 80),
    publicHost: cleanText(brand.publicHost, defaultConfig.brand.publicHost, 120),
    canonicalUrl: cleanHref(brand.canonicalUrl, defaultConfig.brand.canonicalUrl),
    description: cleanText(brand.description, defaultConfig.brand.description, 260),
    iconPath,
    faviconPath: cleanHref(brand.faviconPath, iconPath),
    brandImagePath: cleanHref(brand.brandImagePath, iconPath),
    ogImage: cleanHref(brand.ogImage, defaultConfig.brand.ogImage),
    protectedLabel: cleanText(brand.protectedLabel, defaultConfig.brand.protectedLabel, 80),
    bindLabel: cleanText(brand.bindLabel, defaultConfig.brand.bindLabel, 80),
    launcherFooterLabel: cleanText(brand.launcherFooterLabel, defaultConfig.brand.launcherFooterLabel, 80),
  };
}

function cleanRoute(value, fallback) {
  const route = isRecord(value) ? value : {};
  return {
    id: cleanId(route.id, fallback.id),
    code: cleanText(route.code, fallback.code, 12),
    name: cleanText(route.name, fallback.name, 48),
    description: cleanText(route.description, fallback.description, 160),
    href: cleanHref(route.href, fallback.href),
    accent: cleanAccent(route.accent, fallback.accent),
  };
}

function cleanService(value, fallback) {
  const service = isRecord(value) ? value : {};
  return {
    id: cleanId(service.id, fallback.id),
    code: cleanText(service.code, fallback.code, 16),
    name: cleanText(service.name, fallback.name, 80),
    description: cleanText(service.description, fallback.description, 220),
    href: cleanHref(service.href, fallback.href),
    port: cleanPort(service.port),
    scope: cleanText(service.scope, fallback.scope || "local", 32),
    accent: cleanAccent(service.accent, fallback.accent || "green"),
  };
}

function cleanHealthCheck(value, fallback) {
  const check = isRecord(value) ? value : {};
  const portValue = cleanPort(check.port ?? fallback.port);
  if (!portValue) return null;
  return {
    id: cleanId(check.id, fallback.id),
    name: cleanText(check.name, fallback.name, 80),
    host: cleanHost(check.host, fallback.host || "127.0.0.1"),
    port: portValue,
    restart: cleanRestartAction(check.restart),
  };
}

function cleanTerminalLine(value, fallback) {
  const line = isRecord(value) ? value : {};
  return {
    code: cleanText(line.code, fallback.code || "--", 8),
    command: cleanText(line.command, fallback.command || "status pending", 140),
    status: cleanText(line.status, fallback.status || "OK", 24),
  };
}

function cleanOpsLink(value, fallback) {
  const link = isRecord(value) ? value : {};
  return {
    name: cleanText(link.name, fallback.name || "Link", 80),
    description: cleanText(link.description, fallback.description || "External resource", 140),
    href: cleanHref(link.href, fallback.href || "#"),
  };
}

function normalizeConfig(input) {
  const config = isRecord(input) ? input : {};
  const routes = Array.isArray(config.routes) && config.routes.length
    ? config.routes.map((route, index) => cleanRoute(route, defaultConfig.routes[index] || defaultConfig.routes[0]))
    : defaultConfig.routes;
  const services = Array.isArray(config.services) && config.services.length
    ? config.services.map((service, index) => cleanService(service, defaultConfig.services[index] || defaultConfig.services[0]))
    : defaultConfig.services;
  const healthChecks = Array.isArray(config.healthChecks) && config.healthChecks.length
    ? config.healthChecks.map((check, index) => cleanHealthCheck(check, defaultConfig.healthChecks[index] || defaultConfig.healthChecks[0])).filter(Boolean)
    : defaultConfig.healthChecks;
  const portNames = isRecord(config.portNames) ? Object.fromEntries(
    Object.entries(config.portNames)
      .map(([key, value]) => [String(cleanPort(key)), cleanText(value, "Service", 80)])
      .filter(([key]) => key !== "null"),
  ) : defaultConfig.portNames;
  const heroTerminal = Array.isArray(config.heroTerminal) && config.heroTerminal.length
    ? config.heroTerminal.map((line, index) => cleanTerminalLine(line, defaultConfig.heroTerminal[index] || defaultConfig.heroTerminal[0]))
    : defaultConfig.heroTerminal;
  const ticker = Array.isArray(config.ticker) && config.ticker.length
    ? config.ticker.map((item) => cleanText(item, "STATUS:OK", 100)).filter(Boolean)
    : defaultConfig.ticker;
  const opsLinks = Array.isArray(config.opsLinks)
    ? config.opsLinks.map((link, index) => cleanOpsLink(link, defaultConfig.opsLinks[index] || {}))
    : defaultConfig.opsLinks;

  return {
    brand: cleanBrand(config.brand),
    routes,
    services,
    healthChecks,
    portNames,
    watchdog: cleanWatchdogConfig(config.watchdog),
    heroTerminal,
    ticker,
    opsLinks,
  };
}


function cleanBenchmarkSystem(value) {
  const system = isRecord(value) ? value : {};
  return {
    os: cleanText(system.os, "", 120),
    kernel: cleanText(system.kernel, "", 120),
    virtualization: cleanText(system.virtualization, "", 80),
    location: cleanText(system.location, "", 120),
    isp: cleanText(system.isp, "", 120),
    asn: cleanText(system.asn, "", 120),
    host: cleanText(system.host, "", 160),
    country: cleanText(system.country, "", 80),
  };
}

function cleanBenchmarkCpu(value) {
  const cpu = isRecord(value) ? value : {};
  return {
    model: cleanText(cpu.model, "", 160),
    cores: cleanOptionalNumber(cpu.cores),
    singleCore: cleanOptionalNumber(cpu.singleCore),
    multiCore: cleanOptionalNumber(cpu.multiCore),
    fullTest: cleanHref(cpu.fullTest, ""),
  };
}

function cleanBenchmarkMemory(value) {
  const memory = isRecord(value) ? value : {};
  return {
    total: cleanText(memory.total, "", 80),
    swap: cleanText(memory.swap, "", 80),
  };
}

function cleanBenchmarkDisk(value) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 16).map((item) => {
    const row = isRecord(item) ? item : {};
    return {
      name: cleanText(row.name, "disk test", 80),
      read: cleanText(row.read, "", 80),
      write: cleanText(row.write, "", 80),
      total: cleanText(row.total, "", 80),
    };
  });
}

function cleanBenchmarkNetwork(value) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 24).map((item) => {
    const row = isRecord(item) ? item : {};
    return {
      provider: cleanText(row.provider, "network", 80),
      location: cleanText(row.location, "", 120),
      send: cleanText(row.send, "", 80),
      receive: cleanText(row.receive, "", 80),
      latency: cleanText(row.latency, "", 48),
    };
  });
}

function normalizeBenchmarkAutomation(input) {
  const status = isRecord(input) ? input : {};
  const intervalSeconds = cleanOptionalNumber(status.intervalSeconds);
  const lastExitCode = cleanOptionalNumber(status.lastExitCode);
  return {
    mode: cleanText(status.mode, defaultBenchmarkAutomation.mode, 24),
    running: Boolean(status.running),
    intervalSeconds: intervalSeconds && intervalSeconds > 0 ? Math.round(intervalSeconds) : null,
    lastStartedAt: cleanIsoDate(status.lastStartedAt),
    lastFinishedAt: cleanIsoDate(status.lastFinishedAt),
    nextRunAt: cleanIsoDate(status.nextRunAt),
    lastExitCode: lastExitCode === null ? null : Math.round(lastExitCode),
    message: cleanText(status.message, defaultBenchmarkAutomation.message, 180),
  };
}

function normalizeBenchmark(input) {
  const benchmark = isRecord(input) ? input : {};
  const raw = isRecord(benchmark.raw) ? benchmark.raw : {};

  return {
    updatedAt: cleanIsoDate(benchmark.updatedAt),
    status: cleanText(benchmark.status, defaultBenchmark.status, 24),
    source: cleanText(benchmark.source, defaultBenchmark.source, 80),
    summary: cleanText(benchmark.summary, defaultBenchmark.summary, 220),
    system: cleanBenchmarkSystem(benchmark.system),
    cpu: cleanBenchmarkCpu(benchmark.cpu),
    memory: cleanBenchmarkMemory(benchmark.memory),
    disk: cleanBenchmarkDisk(benchmark.disk),
    network: cleanBenchmarkNetwork(benchmark.network),
    raw: {
      path: cleanText(raw.path, defaultBenchmark.raw.path, 160),
      note: cleanText(raw.note, defaultBenchmark.raw.note, 220),
    },
  };
}

async function loadConfig() {
  const candidates = [
    process.env.PORTAL_CONFIG,
    "/app/config/portal.local.json",
    "/app/config/portal.example.json",
  ].filter(Boolean);

  for (const filePath of candidates) {
    try {
      const raw = await readFile(filePath, "utf8");
      return normalizeConfig(JSON.parse(raw));
    } catch (error) {
      if (error && error.code !== "ENOENT") {
        console.warn("Ignoring invalid portal config at " + filePath);
      }
    }
  }

  return normalizeConfig(defaultConfig);
}

const portalConfig = await loadConfig();

async function readBenchmarkData() {
  const candidates = [
    benchmarkPath,
    "/app/data/benchmark.example.json",
  ].filter(Boolean);

  for (const filePath of candidates) {
    try {
      const raw = await readFile(filePath, "utf8");
      return normalizeBenchmark(JSON.parse(raw));
    } catch (error) {
      if (error && error.code !== "ENOENT") {
        console.warn("Ignoring invalid benchmark data at " + filePath);
      }
    }
  }

  return normalizeBenchmark(defaultBenchmark);
}

async function readBenchmarkStatus() {
  try {
    const raw = await readFile(benchmarkStatusPath, "utf8");
    return normalizeBenchmarkAutomation(JSON.parse(raw));
  } catch (error) {
    if (error && error.code !== "ENOENT") {
      console.warn("Ignoring invalid benchmark status at " + benchmarkStatusPath);
    }
  }

  return normalizeBenchmarkAutomation(defaultBenchmarkAutomation);
}

async function benchmarkDataWithStatus() {
  const [benchmark, automation] = await Promise.all([readBenchmarkData(), readBenchmarkStatus()]);
  return {
    ...benchmark,
    automation,
  };
}

function publicConfig() {
  return {
    brand: portalConfig.brand,
    routes: portalConfig.routes,
    services: portalConfig.services,
    portNames: portalConfig.portNames,
    heroTerminal: portalConfig.heroTerminal,
    ticker: portalConfig.ticker,
    opsLinks: portalConfig.opsLinks,
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function round(value, places = 1) {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

function toBytes(kib) {
  return Number(kib) * 1024;
}

async function readText(filePath) {
  return readFile(filePath, "utf8");
}

const restartRuntime = new Map();

function runtimeFor(id) {
  if (!restartRuntime.has(id)) {
    restartRuntime.set(id, { failures: 0, restarting: false, lastRestartAt: null, lastRestartOk: null, lastRestartMessage: "", nextAutoRestartAt: null });
  }
  return restartRuntime.get(id);
}

function restartInfo(target) {
  const state = runtimeFor(target.id);
  const canRestart = Boolean(target.restart && target.restart.enabled);
  return {
    canRestart,
    restartLabel: canRestart ? target.restart.label : "",
    watchdogEnabled: canRestart && Boolean(target.restart.watchdog && portalConfig.watchdog.enabled),
    failures: state.failures,
    restarting: state.restarting,
    lastRestartAt: state.lastRestartAt,
    lastRestartOk: state.lastRestartOk,
    lastRestartMessage: state.lastRestartMessage,
    nextAutoRestartAt: state.nextAutoRestartAt,
  };
}

function probe(target) {
  const started = Date.now();

  return new Promise((resolve) => {
    const socket = new Socket();
    let settled = false;

    const finish = (online) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve({
        id: target.id,
        name: target.name,
        port: target.port,
        online,
        latencyMs: online ? Date.now() - started : null,
      });
    };

    socket.setTimeout(900);
    socket.once("connect", () => finish(true));
    socket.once("timeout", () => finish(false));
    socket.once("error", () => finish(false));
    socket.connect(target.port, target.host);
  });
}

function decorateStatus(target, status) {
  return {
    ...status,
    ...restartInfo(target),
  };
}

async function serviceStatuses() {
  const checks = portalConfig.healthChecks;
  const statuses = await Promise.all(checks.map(probe));
  return statuses.map((status, index) => decorateStatus(checks[index], status));
}

async function statusResponse(res) {
  const [services, publicRoutes] = await Promise.all([
    serviceStatuses(),
    publicRouteStatuses(),
  ]);
  const online = services.filter((service) => service.online).length;

  sendJson(res, {
    updatedAt: new Date().toISOString(),
    watchdog: portalConfig.watchdog,
    summary: {
      online,
      total: services.length,
    },
    services,
    publicRoutes,
  });
}

async function benchmarkResponse(res) {
  sendJson(res, await benchmarkDataWithStatus());
}

async function cpuSnapshot() {
  const stat = await readText("/proc/stat");
  const cpuLine = stat.split("\n").find((line) => line.startsWith("cpu "));
  if (!cpuLine) throw new Error("cpu_stat_unavailable");

  const values = cpuLine.trim().split(/\s+/).slice(1).map(Number);
  const idle = (values[3] || 0) + (values[4] || 0);
  const total = values.reduce((sum, value) => sum + value, 0);
  return { idle, total };
}

function calculateCpuUsage(previous, current) {
  const idleDelta = current.idle - previous.idle;
  const totalDelta = current.total - previous.total;
  if (totalDelta <= 0) return 0;
  return Math.max(0, Math.min(100, (1 - idleDelta / totalDelta) * 100));
}

async function cpuMetrics() {
  const current = await cpuSnapshot();
  if (!previousCpuSnapshot) {
    await sleep(140);
    const next = await cpuSnapshot();
    previousCpuSnapshot = next;
    return {
      usagePct: round(calculateCpuUsage(current, next)),
      idlePct: round(100 - calculateCpuUsage(current, next)),
      cores: cpus().length,
    };
  }

  const usage = calculateCpuUsage(previousCpuSnapshot, current);
  previousCpuSnapshot = current;
  return {
    usagePct: round(usage),
    idlePct: round(100 - usage),
    cores: cpus().length,
  };
}

async function memoryMetrics() {
  const meminfo = await readText("/proc/meminfo");
  const values = Object.fromEntries(
    meminfo
      .trim()
      .split("\n")
      .map((line) => {
        const match = line.match(/^([^:]+):\s+(\d+)/);
        return match ? [match[1], Number(match[2])] : null;
      })
      .filter(Boolean),
  );

  const totalBytes = toBytes(values.MemTotal || 0);
  const availableBytes = toBytes(values.MemAvailable || values.MemFree || 0);
  const usedBytes = Math.max(0, totalBytes - availableBytes);
  const swapTotalBytes = toBytes(values.SwapTotal || 0);
  const swapFreeBytes = toBytes(values.SwapFree || 0);
  const swapUsedBytes = Math.max(0, swapTotalBytes - swapFreeBytes);

  return {
    totalBytes,
    usedBytes,
    availableBytes,
    usedPct: totalBytes ? round((usedBytes / totalBytes) * 100) : 0,
    swapTotalBytes,
    swapUsedBytes,
    swapUsedPct: swapTotalBytes ? round((swapUsedBytes / swapTotalBytes) * 100) : 0,
  };
}

async function loadMetrics() {
  const loadavg = (await readText("/proc/loadavg")).trim().split(/\s+/);
  const [running, processes] = (loadavg[3] || "0/0").split("/").map(Number);
  const cores = cpus().length;
  const load1 = Number(loadavg[0] || 0);

  return {
    load1,
    load5: Number(loadavg[1] || 0),
    load15: Number(loadavg[2] || 0),
    running,
    processes,
    pressurePct: cores ? round((load1 / cores) * 100) : 0,
  };
}

async function uptimeMetrics() {
  const [uptimeSeconds, idleSeconds] = (await readText("/proc/uptime")).trim().split(/\s+/).map(Number);
  return {
    uptimeSeconds: Math.floor(uptimeSeconds || 0),
    idleSeconds: Math.floor(idleSeconds || 0),
  };
}

async function diskMetrics() {
  const { stdout } = await execFileAsync("df", ["-kP", "/"], { timeout: 1000 });
  const line = stdout.trim().split("\n")[1];
  if (!line) throw new Error("disk_stat_unavailable");

  const columns = line.trim().split(/\s+/);
  const [filesystem, totalKib, usedKib, availableKib, capacity, mount] = columns;
  return {
    filesystem,
    mount,
    totalBytes: toBytes(totalKib),
    usedBytes: toBytes(usedKib),
    availableBytes: toBytes(availableKib),
    usedPct: Number(String(capacity).replace("%", "")) || 0,
  };
}

function isWholeDiskDevice(name) {
  if (/^(loop|ram|fd|sr|zram)/.test(name)) return false;
  return /^(sd[a-z]+|vd[a-z]+|xvd[a-z]+|nvme\d+n\d+|mmcblk\d+|md\d+|dm-\d+)$/.test(name);
}

async function diskIoSnapshot() {
  const diskstats = await readText("/proc/diskstats");
  const devices = [];

  for (const line of diskstats.trim().split("\n")) {
    const columns = line.trim().split(/\s+/);
    if (columns.length < 13) continue;

    const name = columns[2];
    if (!isWholeDiskDevice(name)) continue;

    const readSectors = Number(columns[5] || 0);
    const writeSectors = Number(columns[9] || 0);
    const ioMs = Number(columns[12] || 0);
    devices.push({
      name,
      readBytes: readSectors * 512,
      writeBytes: writeSectors * 512,
      ioMs,
    });
  }

  return {
    timestampMs: Date.now(),
    readBytes: devices.reduce((sum, device) => sum + device.readBytes, 0),
    writeBytes: devices.reduce((sum, device) => sum + device.writeBytes, 0),
    ioMs: devices.reduce((sum, device) => sum + device.ioMs, 0),
    devices: devices.map((device) => device.name),
  };
}

function calculateDiskIo(previous, current) {
  const elapsedMs = Math.max(1, current.timestampMs - previous.timestampMs);
  const seconds = elapsedMs / 1000;
  const readDelta = Math.max(0, current.readBytes - previous.readBytes);
  const writeDelta = Math.max(0, current.writeBytes - previous.writeBytes);
  const ioDelta = Math.max(0, current.ioMs - previous.ioMs);

  return {
    readBytesPerSec: Math.round(readDelta / seconds),
    writeBytesPerSec: Math.round(writeDelta / seconds),
    busyPct: round(Math.min(100, (ioDelta / elapsedMs) * 100)),
    sampleMs: elapsedMs,
    devices: current.devices,
  };
}

async function diskIoMetrics() {
  const current = await diskIoSnapshot();
  if (!current.devices.length) {
    previousDiskIoSnapshot = current;
    return {
      readBytesPerSec: null,
      writeBytesPerSec: null,
      busyPct: null,
      sampleMs: 0,
      devices: [],
    };
  }

  if (!previousDiskIoSnapshot) {
    await sleep(180);
    const next = await diskIoSnapshot();
    previousDiskIoSnapshot = next;
    return calculateDiskIo(current, next);
  }

  const usage = calculateDiskIo(previousDiskIoSnapshot, current);
  previousDiskIoSnapshot = current;
  return usage;
}

function isLocalHostname(hostnameValue) {
  return ["localhost", "127.0.0.1", "0.0.0.0", "::1", "[::1]"].includes(hostnameValue);
}

function publicRouteHostSuffix() {
  const hostValue = portalConfig.brand.publicHost || new URL(portalConfig.brand.canonicalUrl).hostname;
  const parts = hostValue.split(".").filter(Boolean);
  return parts.length > 2 ? parts.slice(1).join(".") : hostValue;
}

function publicRouteHostAllowed(hostnameValue) {
  const suffix = publicRouteHostSuffix();
  return hostnameValue === portalConfig.brand.publicHost || hostnameValue === suffix || hostnameValue.endsWith("." + suffix);
}

function publicUrlForService(service) {
  if (!service.href) return null;
  try {
    const url = new URL(service.href, portalConfig.brand.canonicalUrl);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    if (isLocalHostname(url.hostname)) return null;
    if (!publicRouteHostAllowed(url.hostname)) return null;
    return url.href;
  } catch {
    return null;
  }
}

function publicRouteTargets() {
  const seen = new Set();
  return portalConfig.services
    .map((service) => {
      const url = publicUrlForService(service);
      if (!url || seen.has(url)) return null;
      seen.add(url);
      return {
        id: service.id,
        name: service.name,
        url,
      };
    })
    .filter(Boolean);
}

function routeStatusLabel(status) {
  if ([301, 302, 303, 307, 308, 401, 403].includes(status)) return "gated";
  if (status >= 200 && status < 400) return "ok";
  return "error";
}

async function probePublicRoute(target) {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3500);

  try {
    if (typeof fetch !== "function") throw new Error("fetch_unavailable");
    const response = await fetch(target.url, {
      method: "GET",
      redirect: "manual",
      signal: controller.signal,
      headers: {
        accept: "text/html,application/json,*/*",
        "user-agent": "studio-portal-health/1.0",
      },
    });
    const latencyMs = Date.now() - started;
    const brokenGateway = [502, 521, 522, 523, 524, 530].includes(response.status);

    return {
      id: target.id,
      name: target.name,
      url: target.url,
      online: !brokenGateway,
      status: response.status,
      state: routeStatusLabel(response.status),
      latencyMs,
    };
  } catch {
    return {
      id: target.id,
      name: target.name,
      url: target.url,
      online: false,
      status: null,
      state: "offline",
      latencyMs: null,
    };
  } finally {
    clearTimeout(timer);
  }
}

async function publicRouteStatuses() {
  const now = Date.now();
  if (publicRouteCache.expiresAt > now) return publicRouteCache.values;

  const values = await Promise.all(publicRouteTargets().map(probePublicRoute));
  publicRouteCache = {
    expiresAt: now + 30000,
    values,
  };
  return values;
}

async function monitorResponse(res) {
  const [cpu, memory, load, uptime, disk, diskIo, services, publicRoutes, benchmark] = await Promise.all([
    cpuMetrics(),
    memoryMetrics(),
    loadMetrics(),
    uptimeMetrics(),
    diskMetrics(),
    diskIoMetrics(),
    serviceStatuses(),
    publicRouteStatuses(),
    benchmarkDataWithStatus(),
  ]);

  const online = services.filter((service) => service.online).length;
  sendJson(res, {
    updatedAt: new Date().toISOString(),
    host: {
      hostname: hostname(),
      platform: platform(),
      arch: arch(),
      cores: cpu.cores,
    },
    cpu: {
      ...cpu,
      ...load,
    },
    memory,
    disk: {
      ...disk,
      io: diskIo,
    },
    uptime,
    services,
    publicRoutes,
    benchmark,
    summary: {
      online,
      total: services.length,
    },
  });
}

function escapeHtmlAttribute(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function replaceContentAttribute(html, matcher, value) {
  const escaped = escapeHtmlAttribute(value);
  return html.replace(matcher, (match, before, after) => before + escaped + after);
}

function routeForPath(pathname = "/") {
  const normalized = String(pathname || "/").replace(/\/+$/, "") || "/";
  if (normalized === "/") return "home";
  if (normalized === "/services") return "services";
  if (normalized === "/monitor") return "monitor";
  if (normalized === "/ports") return "ports";
  if (normalized === "/ops") return "ops";
  return "home";
}

function runtimeHtml(html, route = "home") {
  const brand = portalConfig.brand;
  const title = brand.appName;
  const description = brand.description;
  const url = brand.canonicalUrl;
  const image = brand.ogImage;
  const siteName = brand.productName || brand.appName;
  const imageAlt = brand.appName + " route console preview";
  const safeRoute = ["home", "services", "monitor", "ports", "ops"].includes(route) ? route : "home";

  let output = String(html)
    .replace(/<title>[^<]*<\/title>/, "<title>" + escapeHtmlAttribute(title) + "</title>")
    .replace(/<body[^>]*>/, "<body data-route=\"" + safeRoute + "\">");
  output = replaceContentAttribute(output, /(<meta name="description" content=")[^"]*(" \/>)/, description);
  output = replaceContentAttribute(output, /(<link rel="canonical" href=")[^"]*(" \/>)/, url);
  output = replaceContentAttribute(output, /(<meta property="og:title" content=")[^"]*(" \/>)/, title);
  output = replaceContentAttribute(output, /(<meta property="og:description" content=")[^"]*(" \/>)/, description);
  output = replaceContentAttribute(output, /(<meta property="og:image" content=")[^"]*(" \/>)/, image);
  output = replaceContentAttribute(output, /(<meta property="og:image:alt" content=")[^"]*(" \/>)/, imageAlt);
  output = replaceContentAttribute(output, /(<meta property="og:url" content=")[^"]*(" \/>)/, url);
  output = replaceContentAttribute(output, /(<meta property="og:site_name" content=")[^"]*(" \/>)/, siteName);
  output = replaceContentAttribute(output, /(<meta name="twitter:title" content=")[^"]*(" \/>)/, title);
  output = replaceContentAttribute(output, /(<meta name="twitter:description" content=")[^"]*(" \/>)/, description);
  output = replaceContentAttribute(output, /(<meta name="twitter:image" content=")[^"]*(" \/>)/, image);
  return output;
}


function readJsonBody(req, limit = 4096) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > limit) {
        reject(new Error("request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("invalid json"));
      }
    });
    req.on("error", reject);
  });
}

function dockerApi(method, path) {
  return new Promise((resolve, reject) => {
    const req = httpRequest({ socketPath: dockerSocketPath, method, path, timeout: 15000 }, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => { body += chunk; });
      response.on("end", () => resolve({ statusCode: response.statusCode || 0, body }));
    });
    req.on("timeout", () => req.destroy(new Error("Docker request timed out")));
    req.on("error", reject);
    req.end();
  });
}

function dockerErrorMessage(error) {
  if (error && error.code === "ENOENT") return "Docker socket is not mounted";
  if (error && error.code === "EACCES") return "Docker socket permission denied";
  return cleanText(error?.message || "Docker restart failed", "Docker restart failed", 160);
}

async function restartDockerContainer(container) {
  const response = await dockerApi("POST", "/containers/" + encodeURIComponent(container) + "/restart?t=10");
  if ([204, 304].includes(response.statusCode)) return;
  if (response.statusCode === 404) throw new Error("Docker container not found");
  throw new Error("Docker returned HTTP " + response.statusCode);
}

function restartTarget(id) {
  const cleaned = cleanId(id, "");
  return portalConfig.healthChecks.find((target) => target.id === cleaned) || null;
}

async function performRestart(id, mode = "manual") {
  const target = restartTarget(id);
  if (!target) return { ok: false, status: 404, code: "RESTART_TARGET_NOT_FOUND", message: "Restart target not found" };
  if (!target.restart || !target.restart.enabled) return { ok: false, status: 409, code: "RESTART_NOT_CONFIGURED", message: "Restart is not configured for this service" };

  const runtime = runtimeFor(target.id);
  if (runtime.restarting) return { ok: false, status: 409, code: "RESTART_IN_PROGRESS", message: "Restart already in progress" };

  runtime.restarting = true;
  runtime.lastRestartMessage = mode === "watchdog" ? "Watchdog restart running" : "Manual restart running";

  try {
    if (target.restart.type === "docker") await restartDockerContainer(target.restart.container);
    runtime.failures = 0;
    runtime.lastRestartAt = new Date().toISOString();
    runtime.lastRestartOk = true;
    runtime.lastRestartMessage = mode === "watchdog" ? "Watchdog restart sent" : "Manual restart sent";
    runtime.nextAutoRestartAt = new Date(Date.now() + portalConfig.watchdog.cooldownSeconds * 1000).toISOString();
    return { ok: true, status: 200, id: target.id, name: target.name, message: runtime.lastRestartMessage };
  } catch (error) {
    runtime.lastRestartAt = new Date().toISOString();
    runtime.lastRestartOk = false;
    runtime.lastRestartMessage = dockerErrorMessage(error);
    runtime.nextAutoRestartAt = new Date(Date.now() + portalConfig.watchdog.cooldownSeconds * 1000).toISOString();
    return { ok: false, status: 500, code: "RESTART_FAILED", id: target.id, name: target.name, message: runtime.lastRestartMessage };
  } finally {
    runtime.restarting = false;
  }
}

async function restartResponse(req, res) {
  if (req.method !== "POST") {
    res.writeHead(405, { ...baseHeaders, "allow": "POST", "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: { code: "METHOD_NOT_ALLOWED", message: "Use POST" } }));
    return;
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    sendApiError(res, 400, "INVALID_JSON", "Invalid JSON body");
    return;
  }

  const result = await performRestart(body.id, "manual");
  const services = await serviceStatuses();
  sendJson(res, { updatedAt: new Date().toISOString(), result, services }, result.status || 200);
}

async function watchdogTick() {
  if (!portalConfig.watchdog.enabled) return;

  const checks = portalConfig.healthChecks;
  const statuses = await Promise.all(checks.map(probe));
  for (let index = 0; index < checks.length; index += 1) {
    const target = checks[index];
    const status = statuses[index];
    const runtime = runtimeFor(target.id);
    runtime.failures = status.online ? 0 : runtime.failures + 1;

    if (status.online || !target.restart || !target.restart.enabled || !target.restart.watchdog) continue;
    if (runtime.failures < portalConfig.watchdog.failureThreshold) continue;
    if (runtime.restarting) continue;
    if (runtime.nextAutoRestartAt && Date.parse(runtime.nextAutoRestartAt) > Date.now()) continue;

    performRestart(target.id, "watchdog").catch((error) => {
      runtime.lastRestartAt = new Date().toISOString();
      runtime.lastRestartOk = false;
      runtime.lastRestartMessage = cleanText(error?.message, "Watchdog restart failed", 160);
    });
  }
}

function startWatchdog() {
  if (!portalConfig.watchdog.enabled) return;
  const intervalMs = portalConfig.watchdog.intervalSeconds * 1000;
  setTimeout(() => watchdogTick().catch(() => {}), Math.min(5000, intervalMs));
  setInterval(() => watchdogTick().catch(() => {}), intervalMs);
}

function sendJson(res, payload, status = 200) {
  res.writeHead(status, {
    ...baseHeaders,
    "content-type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(payload));
}

function sendApiError(res, status, code, message) {
  sendJson(res, { error: { code, message } }, status);
}

function safePath(urlPath) {
  let decoded = "/";
  try {
    decoded = decodeURIComponent(urlPath.split("?")[0]);
  } catch {
    decoded = "/";
  }

  const cleaned = normalize("/" + decoded).replace(/^\/+/g, "");
  if (!cleaned || cleaned === ".") return "index.html";
  if (cleaned.startsWith("..") || cleaned.includes("/../")) return "index.html";
  return cleaned;
}

async function staticResponse(req, res) {
  const requestUrl = new URL(req.url, "http://" + req.headers.host);
  const requested = safePath(requestUrl.pathname);
  const route = routeForPath(requestUrl.pathname);
  const filePath = join(root, requested);
  const extension = extname(filePath);

  try {
    const data = await readFile(filePath);
    res.writeHead(200, {
      ...baseHeaders,
      "content-type": types[extension] || "application/octet-stream",
    });
    res.end(extension === ".html" ? runtimeHtml(data.toString("utf8"), route) : data);
  } catch {
    const data = await readFile(join(root, "index.html"), "utf8");
    res.writeHead(200, {
      ...baseHeaders,
      "content-type": "text/html; charset=utf-8",
    });
    res.end(runtimeHtml(data, route));
  }
}

const server = createServer((req, res) => {
  if (req.url?.startsWith("/api/config")) {
    sendJson(res, publicConfig());
    return;
  }

  if (req.url?.startsWith("/api/status")) {
    statusResponse(res).catch(() => sendApiError(res, 500, "STATUS_UNAVAILABLE", "Status API unavailable"));
    return;
  }

  if (req.url?.startsWith("/api/restart")) {
    restartResponse(req, res).catch(() => sendApiError(res, 500, "RESTART_UNAVAILABLE", "Restart API unavailable"));
    return;
  }

  if (req.url?.startsWith("/api/benchmark")) {
    benchmarkResponse(res).catch(() => sendApiError(res, 500, "BENCHMARK_UNAVAILABLE", "Benchmark API unavailable"));
    return;
  }

  if (req.url?.startsWith("/api/monitor")) {
    monitorResponse(res).catch(() => sendApiError(res, 500, "MONITOR_UNAVAILABLE", "Monitor API unavailable"));
    return;
  }

  staticResponse(req, res).catch(() => {
    res.writeHead(500, { ...baseHeaders, "content-type": "text/plain; charset=utf-8" });
    res.end("Portal unavailable");
  });
});

startWatchdog();

server.listen(port, host, () => {
  console.log("hiraeth-ui listening on http://" + host + ":" + port);
});
