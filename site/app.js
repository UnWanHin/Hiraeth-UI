let routePages = [
  { id: "home", code: "H", name: "Home", description: "Route overview and live summary.", href: "/", accent: "white" },
  { id: "services", code: "SVC", name: "Services", description: "Launch local apps and external consoles.", href: "/services", accent: "green" },
  { id: "monitor", code: "MON", name: "Monitor", description: "CPU, RAM, disk, uptime, and health.", href: "/monitor", accent: "blue" },
  { id: "ports", code: "TCP", name: "Ports", description: "Local listener and tunnel targets.", href: "/ports", accent: "yellow" },
  { id: "ops", code: "OPS", name: "Ops", description: "Operations links and documentation.", href: "/ops", accent: "red" },
];

let services = [
  { id: "portal", code: "PORTAL", name: "Hiraeth", description: "Primary control surface and service launcher.", href: "/", port: 8790, scope: "public", accent: "white" },
  { id: "monitor", code: "MON", name: "Server Monitor", description: "Live CPU, RAM, disk, uptime, and port health.", href: "/monitor", port: 8790, scope: "public", accent: "blue" },
];

let portNames = {
  8790: "Hiraeth",
};

let brandConfig = {
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
};

let heroTerminalLines = [
  { code: "00", command: "mount route://portal.example.com", status: "OK" },
  { code: "01", command: "enable access gate", status: "READY" },
  { code: "02", command: "scan local ports --watch 8790", status: "LIVE" },
];

let tickerItems = ["HIRAETH://ROUTE MATRIX ONLINE", "ACCESS:GATE_ENABLED", "TUNNEL:LOCALHOST:8790", "MONITOR:/monitor", "SERVICES:/services", "PORTS:/ports", "OPS:/ops", "PIXEL TRAIL:ARMED"];

let opsLinks = [
  { name: "Cloudflare Zero Trust", description: "Tunnel and Access", href: "https://one.dash.cloudflare.com/" },
  { name: "Cloudflare Dashboard", description: "DNS and hostname routes", href: "https://dash.cloudflare.com/" },
  { name: "Project Repository", description: "Source and deployment docs", href: "https://github.com/your-org/studio-portal" },
  { name: "Docker Compose Docs", description: "Runtime configuration", href: "https://docs.docker.com/compose/" },
];


const displayTimeZone = "Asia/Hong_Kong";
const displayTimeZoneLabel = "UTC+8";
const languageStorageKey = "hiraeth.language";
const supportedLanguages = ["zh-Hant", "zh-Hans", "en"];
const localeByLanguage = {
  "zh-Hant": "zh-Hant-HK",
  "zh-Hans": "zh-Hans-CN",
  en: "en-GB",
};
const ogLocaleByLanguage = {
  "zh-Hant": "zh_TW",
  "zh-Hans": "zh_CN",
  en: "en_US",
};

const messages = {
  "zh-Hant": {
    aria: {
      portalHeader: "Hiraeth \u9802\u90E8\u5C0E\u89BD",
      home: "Hiraeth \u9996\u9801",
      primaryNav: "\u4E3B\u8981\u5C0E\u89BD",
      language: "\u8A9E\u8A00\u5207\u63DB",
      primaryActions: "\u4E3B\u8981\u64CD\u4F5C",
      routeOverview: "\u8DEF\u7531\u7E3D\u89BD",
      routeCategories: "\u8DEF\u7531\u5206\u985E",
      runtimeHighlights: "\u904B\u884C\u72C0\u614B\u6458\u8981",
      machineUsage: "\u6A5F\u5668\u8CC7\u6E90\u4F7F\u7528\u91CF",
      diskThroughput: "\u78C1\u789F\u541E\u5410\u91CF",
      oracleSummary: "Oracle \u5EF6\u9072\u6458\u8981",
    },
    brand: {
      description: "\u53D7\u4FDD\u8B77\u7684\u670D\u52D9\u5165\u53E3\uFF0C\u7528\u65BC\u96C6\u4E2D\u7BA1\u7406\u670D\u52D9\u3001\u6A5F\u5668\u72C0\u614B\u3001\u672C\u6A5F\u7AEF\u53E3\u8207\u64CD\u4F5C\u5DE5\u5177\u3002",
      protectedLabel: "Access \u5DF2\u4FDD\u8B77",
      launcherFooterLabel: "\u53D7\u4FDD\u8B77\u8DEF\u7531",
    },
    nav: { home: "\u9996\u9801", services: "\u670D\u52D9", monitor: "\u76E3\u63A7", ports: "\u7AEF\u53E3", ops: "\u904B\u7DAD" },
    routes: {
      home: { name: "\u9996\u9801", description: "\u8DEF\u7531\u7E3D\u89BD\u8207\u5373\u6642\u6458\u8981\u3002" },
      services: { name: "\u670D\u52D9", description: "\u555F\u52D5\u672C\u6A5F\u5DE5\u5177\u8207\u5916\u90E8\u63A7\u5236\u53F0\u3002" },
      monitor: { name: "\u76E3\u63A7", description: "CPU\u3001RAM\u3001\u78C1\u789F\u3001\u904B\u884C\u6642\u9593\u8207\u5065\u5EB7\u72C0\u614B\u3002" },
      ports: { name: "\u7AEF\u53E3", description: "\u672C\u6A5F\u76E3\u807D\u8207 Tunnel \u76EE\u6A19\u3002" },
      ops: { name: "\u904B\u7DAD", description: "\u904B\u7DAD\u9023\u7D50\u8207\u6587\u6A94\u3002" },
    },
    servicesText: {
      portal: { name: "Hiraeth", description: "\u53D7\u4FDD\u8B77\u7684\u4E2D\u63A7\u5165\u53E3\u8207\u670D\u52D9\u555F\u52D5\u5668\u3002" },
      monitor: { name: "\u4F3A\u670D\u5668\u76E3\u63A7", description: "\u5373\u6642 CPU\u3001RAM\u3001\u78C1\u789F\u3001\u904B\u884C\u6642\u9593\u8207\u7AEF\u53E3\u5065\u5EB7\u72C0\u614B\u3002" },
      hermes: { name: "Hermes WebUI", description: "Agent \u5DE5\u4F5C\u5340\u8207\u53D7\u4FDD\u8B77\u7684\u700F\u89BD\u5668\u63A7\u5236\u53F0\u3002" },
      litellm: { name: "API Manager", description: "LiteLLM \u9598\u9053\u7BA1\u7406\u3001\u6A21\u578B\u8DEF\u7531\u3001\u91D1\u9470\u8207\u7528\u91CF\u3002" },
      cloudflared: { name: "Cloudflare Tunnel", description: "\u9019\u53F0\u4F3A\u670D\u5668\u7684\u5C08\u7528\u516C\u958B\u8DEF\u7531\u3002" },
      homepage: { name: "Classic Homepage", description: "\u4FDD\u7559\u4F5C\u5099\u7528\u7684\u539F\u59CB\u5100\u8868\u677F\u3002" },
    },
    home: {
      eyebrow: "\u5DE5\u4F5C\u5BA4\u8DEF\u7531",
      openLauncher: "\u958B\u555F\u555F\u52D5\u5668",
      onlineServices: "\u5728\u7DDA\u670D\u52D9",
      strip: { cloudflare: "cloudflare", bind: "\u7D81\u5B9A", services: "\u670D\u52D9", updated: "\u66F4\u65B0" },
    },
    services: { eyebrow: "\u555F\u52D5\u77E9\u9663", lead: "\u5F9E\u4E00\u500B\u5206\u985E\u6E05\u695A\u7684\u670D\u52D9\u9762\u677F\u958B\u555F\u672C\u6A5F\u5DE5\u5177\u8207\u5916\u90E8\u63A7\u5236\u53F0\u3002" },
    monitor: {
      eyebrow: "\u4F3A\u670D\u5668\u76E3\u63A7",
      title: "\u5373\u6642\u6A5F\u5668\u72C0\u614B",
      lead: "\u8FFD\u8E64\u76EE\u524D\u4F3A\u670D\u5668\u7684 CPU\u3001RAM\u3001\u78C1\u789F\u3001\u904B\u884C\u6642\u9593\u8207\u670D\u52D9\u5065\u5EB7\u72C0\u614B\u3002",
      lastProbe: "\u6700\u5F8C\u63A2\u6E2C",
      cpu: "CPU",
      memory: "\u8A18\u61B6\u9AD4",
      disk: "\u78C1\u789F",
      uptime: "\u904B\u884C\u6642\u9593",
      loadPending: "\u8CA0\u8F09\u7B49\u5F85\u4E2D",
      ramPending: "RAM \u7B49\u5F85\u4E2D",
      rootPending: "\u6839\u78C1\u789F\u7B49\u5F85\u4E2D",
      processPending: "\u9032\u7A0B\u8CA0\u8F09\u7B49\u5F85\u4E2D",
      hostFacts: "\u4E3B\u6A5F\u8CC7\u6599",
      runtime: "\u904B\u884C\u74B0\u5883",
      host: "\u4E3B\u6A5F",
      platform: "\u5E73\u53F0",
      cores: "\u6838\u5FC3",
      processes: "\u9032\u7A0B",
      serviceHealth: "\u670D\u52D9\u5065\u5EB7",
      load: "\u8CA0\u8F09 {load1} / {load5} / {load15}",
      memoryNote: "{used} \u5DF2\u7528 \u00B7 {free} \u53EF\u7528",
      diskNote: "{used} / {total} \u4F4D\u65BC {mount}",
      loadNote: "{running} \u904B\u884C\u4E2D \u00B7 {processes} \u9032\u7A0B",
      unavailable: "\u4E0D\u53EF\u7528",
    },
    ports: {
      eyebrow: "\u672C\u6A5F\u7AEF\u53E3",
      lead: "\u76EE\u524D\u7531 portal \u8FFD\u8E64\u7684\u672C\u6A5F\u76E3\u807D\u7AEF\u53E3\u6E05\u55AE\u3002",
      routingRule: "\u8DEF\u7531\u898F\u5247",
      ruleTitle: "Portal \u5167\u90E8\u9801\u9762\u7528 Path\uFF0C\u7368\u7ACB\u61C9\u7528\u7528\u5B50\u57DF\u540D\u3002",
      ruleBody: "\u50CF /monitor \u9019\u985E\u9801\u9762\u5C6C\u65BC\u9019\u500B portal\u3002LiteLLM\u3001Hermes \u9019\u985E\u7368\u7ACB\u5DE5\u5177\u516C\u958B\u6642\u61C9\u4F7F\u7528\u81EA\u5DF1\u7684 hostname\u3002",
    },
    ops: { eyebrow: "\u64CD\u4F5C\u901A\u9053", lead: "\u628A\u5916\u90E8\u63A7\u5236\u5E73\u9762\u8207\u672C\u6A5F\u6587\u6A94\u5F9E\u670D\u52D9\u555F\u52D5\u5668\u4E2D\u5206\u96E2\u51FA\u4F86\u3002" },
    launcher: {
      trigger: "\u555F\u52D5\u5668",
      eyebrow: "\u547D\u4EE4\u555F\u52D5\u5668",
      close: "\u95DC\u9589\u555F\u52D5\u5668",
      searchAria: "\u641C\u5C0B\u8DEF\u7531\u8207\u670D\u52D9",
      searchPlaceholder: "\u641C\u5C0B\u8DEF\u7531\u3001\u670D\u52D9\u3001\u7AEF\u53E3",
      resultsAria: "\u53EF\u7528\u8DEF\u7531\u8207\u670D\u52D9",
      empty: "\u627E\u4E0D\u5230\u8DEF\u7531",
      adjust: "\u8ABF\u6574\u641C\u5C0B\u95DC\u9375\u5B57\u3002",
      type: "\u985E\u578B",
      target: "\u76EE\u6A19",
      status: "\u72C0\u614B",
      open: "\u958B\u555F",
    },
    benchmark: {
      eyebrow: "\u57FA\u6E96\u4E0A\u50B3",
      lastRun: "\u6700\u5F8C\u904B\u884C",
      autoRefresh: "\u81EA\u52D5\u5237\u65B0",
      nextRun: "\u4E0B\u6B21\u904B\u884C",
      node: "\u7BC0\u9EDE",
      cpuScore: "CPU \u5206\u6578",
      memory: "\u8A18\u61B6\u9AD4",
      rawLog: "\u539F\u59CB\u65E5\u8A8C",
      geekbench: "Geekbench",
      runHint: "\u904B\u884C scripts/run-benchmark.sh \u532F\u5165 YABS \u6578\u64DA\u3002",
      network: "\u7DB2\u7D61",
      disk: "\u78C1\u789F",
      notUploaded: "\u5C1A\u672A\u4E0A\u50B3",
      noBenchmark: "\u5C1A\u672A\u4E0A\u50B3\u57FA\u6E96\u6578\u64DA",
      noSystem: "\u6C92\u6709\u7CFB\u7D71\u57FA\u6E96\u5143\u6578\u64DA",
      running: "\u904B\u884C\u4E2D",
      scheduled: "\u6BCF {interval}",
      manual: "\u624B\u52D5",
      runningNow: "\u6B63\u5728\u904B\u884C",
      yabsRunning: "YABS \u904B\u884C\u4E2D",
      refreshSummary: "YABS \u6B63\u5728\u5237\u65B0\u7DB2\u7D61\u8207\u78C1\u789F\u57FA\u6E96\u6578\u64DA\uFF0C\u5B8C\u6210\u5F8C\u6B64\u9762\u677F\u6703\u81EA\u52D5\u66F4\u65B0\u3002",
      noCpu: "\u5C1A\u672A\u4E0A\u50B3 CPU \u57FA\u6E96\u6578\u64DA",
      openResult: "\u958B\u555F\u7D50\u679C",
      system: { ISP: "ISP", ASN: "ASN", Region: "\u5730\u5340", OS: "OS", Kernel: "Kernel", VM: "VM" },
    },
    oracle: {
      eyebrow: "oracle cloudping",
      title: "Oracle \u5340\u57DF\u5EF6\u9072",
      probe: "\u63A2\u6E2C",
      source: "\u4F86\u6E90",
      fastest: "\u6700\u5FEB",
      mean: "\u5E73\u5747",
      progress: "\u9032\u5EA6",
      updated: "\u66F4\u65B0",
      auto: "\u81EA\u52D5",
      fastestRegions: "\u6700\u5FEB\u5340\u57DF",
      regionMatrix: "\u5340\u57DF\u77E9\u9663",
      idle: "\u9592\u7F6E",
      probing: "\u63A2\u6E2C\u4E2D",
      auto5m: "\u81EA\u52D5 5 \u5206\u9418",
      failed: "\u5931\u6557",
      noSamples: "\u9084\u6C92\u6709 Oracle \u5EF6\u9072\u6A23\u672C",
    },
    status: { pending: "\u7B49\u5F85", online: "\u5728\u7DDA", offline: "\u96E2\u7DDA", active: "\u7576\u524D", route: "\u8DEF\u7531", gated: "\u53D7\u4FDD\u8B77", ok: "\u6B63\u5E38", error: "\u932F\u8AA4", open: "\u958B\u555F", local: "\u672C\u6A5F", tracked: "\u8FFD\u8E64", closed: "\u95DC\u9589" },
    routeLabels: { pathRoute: "Portal Path", currentHost: "\u7576\u524D\u4E3B\u6A5F", localhostOnly: "\u50C5 localhost", externalConsole: "\u5916\u90E8\u63A7\u5236\u53F0", localOnly: "\u50C5\u672C\u6A5F" },
    detail: {
      localRuns: "\u6B64\u670D\u52D9\u76EE\u524D\u53EA\u5728\u4F3A\u670D\u5668\u672C\u6A5F\u904B\u884C\uFF0C\u516C\u958B\u4F7F\u7528\u524D\u9700\u8981\u5C08\u7528 Tunnel \u8DEF\u7531\u3002",
      publicAvailable: "\u53EF\u900F\u904E\u53D7\u4FDD\u8B77\u7684\u516C\u958B\u63A7\u5236\u53F0\u4F7F\u7528\u3002",
      localOnlyTarget: "\u50C5\u672C\u6A5F\u76EE\u6A19\u3002\u5F9E\u516C\u958B portal \u4F7F\u7528\u524D\uFF0C\u8ACB\u5148\u52A0\u5C08\u7528 Cloudflare hostname\u3002",
      localAction: "\u672C\u6A5F",
    },
    preview: { route: "\u8DEF\u7531", service: "\u670D\u52D9", port: "\u7AEF\u53E3 {port}" },
    health: {
      allNominal: "\u7CFB\u7D71\u6B63\u5E38",
      servicePending: "{count} \u9805\u670D\u52D9\u7B49\u5F85",
      updated: "\u66F4\u65B0 {time}",
      onlineCount: "{online}/{total} \u5728\u7DDA",
      syncPending: "\u540C\u6B65\u7B49\u5F85\u4E2D",
      syncUnavailable: "\u540C\u6B65\u4E0D\u53EF\u7528",
      statusUnavailable: "\u72C0\u614B API \u4E0D\u53EF\u7528",
      retrying: "\u91CD\u8A66\u4E2D",
      checking: "\u6AA2\u67E5\u4E2D",
      waitingProbe: "\u7B49\u5F85\u9996\u6B21\u63A2\u6E2C",
    },
    time: { soon: "\u5373\u5C07", justNow: "\u525B\u525B", inMinutes: "{value} \u5206\u9418\u5F8C", minutesAgo: "{value} \u5206\u9418\u524D", inHours: "{value} \u5C0F\u6642\u5F8C", hoursAgo: "{value} \u5C0F\u6642\u524D", manual: "\u624B\u52D5", daysHours: "{days} \u5929 {hours} \u5C0F\u6642", hoursMinutes: "{hours} \u5C0F\u6642 {minutes} \u5206\u9418", minutes: "{minutes} \u5206\u9418" },
  },
  "zh-Hans": {
    aria: {
      portalHeader: "Hiraeth \u9876\u90E8\u5BFC\u822A",
      home: "Hiraeth \u9996\u9875",
      primaryNav: "\u4E3B\u8981\u5BFC\u822A",
      language: "\u8BED\u8A00\u5207\u6362",
      primaryActions: "\u4E3B\u8981\u64CD\u4F5C",
      routeOverview: "\u8DEF\u7531\u603B\u89C8",
      routeCategories: "\u8DEF\u7531\u5206\u7C7B",
      runtimeHighlights: "\u8FD0\u884C\u72B6\u6001\u6458\u8981",
      machineUsage: "\u673A\u5668\u8D44\u6E90\u4F7F\u7528\u91CF",
      diskThroughput: "\u78C1\u76D8\u541E\u5410\u91CF",
      oracleSummary: "Oracle \u5EF6\u8FDF\u6458\u8981",
    },
    brand: {
      description: "\u53D7\u4FDD\u62A4\u7684\u670D\u52A1\u5165\u53E3\uFF0C\u7528\u4E8E\u96C6\u4E2D\u7BA1\u7406\u670D\u52A1\u3001\u673A\u5668\u72B6\u6001\u3001\u672C\u673A\u7AEF\u53E3\u4E0E\u64CD\u4F5C\u5DE5\u5177\u3002",
      protectedLabel: "Access \u5DF2\u4FDD\u62A4",
      launcherFooterLabel: "\u53D7\u4FDD\u62A4\u8DEF\u7531",
    },
    nav: { home: "\u9996\u9875", services: "\u670D\u52A1", monitor: "\u76D1\u63A7", ports: "\u7AEF\u53E3", ops: "\u8FD0\u7EF4" },
    routes: {
      home: { name: "\u9996\u9875", description: "\u8DEF\u7531\u603B\u89C8\u4E0E\u5B9E\u65F6\u6458\u8981\u3002" },
      services: { name: "\u670D\u52A1", description: "\u542F\u52A8\u672C\u673A\u5DE5\u5177\u4E0E\u5916\u90E8\u63A7\u5236\u53F0\u3002" },
      monitor: { name: "\u76D1\u63A7", description: "CPU\u3001RAM\u3001\u78C1\u76D8\u3001\u8FD0\u884C\u65F6\u95F4\u4E0E\u5065\u5EB7\u72B6\u6001\u3002" },
      ports: { name: "\u7AEF\u53E3", description: "\u672C\u673A\u76D1\u542C\u4E0E Tunnel \u76EE\u6807\u3002" },
      ops: { name: "\u8FD0\u7EF4", description: "\u8FD0\u7EF4\u94FE\u63A5\u4E0E\u6587\u6863\u3002" },
    },
    servicesText: {
      portal: { name: "Hiraeth", description: "\u53D7\u4FDD\u62A4\u7684\u4E2D\u63A7\u5165\u53E3\u4E0E\u670D\u52A1\u542F\u52A8\u5668\u3002" },
      monitor: { name: "\u670D\u52A1\u5668\u76D1\u63A7", description: "\u5B9E\u65F6 CPU\u3001RAM\u3001\u78C1\u76D8\u3001\u8FD0\u884C\u65F6\u95F4\u4E0E\u7AEF\u53E3\u5065\u5EB7\u72B6\u6001\u3002" },
      hermes: { name: "Hermes WebUI", description: "Agent \u5DE5\u4F5C\u533A\u4E0E\u53D7\u4FDD\u62A4\u7684\u6D4F\u89C8\u5668\u63A7\u5236\u53F0\u3002" },
      litellm: { name: "API Manager", description: "LiteLLM \u7F51\u5173\u7BA1\u7406\u3001\u6A21\u578B\u8DEF\u7531\u3001\u5BC6\u94A5\u4E0E\u7528\u91CF\u3002" },
      cloudflared: { name: "Cloudflare Tunnel", description: "\u8FD9\u53F0\u670D\u52A1\u5668\u7684\u4E13\u7528\u516C\u5F00\u8DEF\u7531\u3002" },
      homepage: { name: "Classic Homepage", description: "\u4FDD\u7559\u4F5C\u5907\u7528\u7684\u539F\u59CB\u4EEA\u8868\u677F\u3002" },
    },
    home: {
      eyebrow: "\u5DE5\u4F5C\u5BA4\u8DEF\u7531",
      openLauncher: "\u5F00\u542F\u542F\u52A8\u5668",
      onlineServices: "\u5728\u7EBF\u670D\u52A1",
      strip: { cloudflare: "cloudflare", bind: "\u7ED1\u5B9A", services: "\u670D\u52A1", updated: "\u66F4\u65B0" },
    },
    services: { eyebrow: "\u542F\u52A8\u77E9\u9635", lead: "\u4ECE\u4E00\u4E2A\u5206\u7C7B\u6E05\u695A\u7684\u670D\u52A1\u9762\u677F\u5F00\u542F\u672C\u673A\u5DE5\u5177\u4E0E\u5916\u90E8\u63A7\u5236\u53F0\u3002" },
    monitor: {
      eyebrow: "\u670D\u52A1\u5668\u76D1\u63A7",
      title: "\u5B9E\u65F6\u673A\u5668\u72B6\u6001",
      lead: "\u8FFD\u8E2A\u5F53\u524D\u670D\u52A1\u5668\u7684 CPU\u3001RAM\u3001\u78C1\u76D8\u3001\u8FD0\u884C\u65F6\u95F4\u4E0E\u670D\u52A1\u5065\u5EB7\u72B6\u6001\u3002",
      lastProbe: "\u6700\u540E\u63A2\u6D4B",
      cpu: "CPU",
      memory: "\u5185\u5B58",
      disk: "\u78C1\u76D8",
      uptime: "\u8FD0\u884C\u65F6\u95F4",
      loadPending: "\u8D1F\u8F7D\u7B49\u5F85\u4E2D",
      ramPending: "RAM \u7B49\u5F85\u4E2D",
      rootPending: "\u6839\u78C1\u76D8\u7B49\u5F85\u4E2D",
      processPending: "\u8FDB\u7A0B\u8D1F\u8F7D\u7B49\u5F85\u4E2D",
      hostFacts: "\u4E3B\u673A\u8D44\u6599",
      runtime: "\u8FD0\u884C\u73AF\u5883",
      host: "\u4E3B\u673A",
      platform: "\u5E73\u53F0",
      cores: "\u6838\u5FC3",
      processes: "\u8FDB\u7A0B",
      serviceHealth: "\u670D\u52A1\u5065\u5EB7",
      load: "\u8D1F\u8F7D {load1} / {load5} / {load15}",
      memoryNote: "{used} \u5DF2\u7528 \u00B7 {free} \u53EF\u7528",
      diskNote: "{used} / {total} \u4F4D\u4E8E {mount}",
      loadNote: "{running} \u8FD0\u884C\u4E2D \u00B7 {processes} \u8FDB\u7A0B",
      unavailable: "\u4E0D\u53EF\u7528",
    },
    ports: {
      eyebrow: "\u672C\u673A\u7AEF\u53E3",
      lead: "\u5F53\u524D\u7531 portal \u8FFD\u8E2A\u7684\u672C\u673A\u76D1\u542C\u7AEF\u53E3\u6E05\u5355\u3002",
      routingRule: "\u8DEF\u7531\u89C4\u5219",
      ruleTitle: "Portal \u5185\u90E8\u9875\u9762\u7528 Path\uFF0C\u72EC\u7ACB\u5E94\u7528\u7528\u5B50\u57DF\u540D\u3002",
      ruleBody: "\u50CF /monitor \u8FD9\u7C7B\u9875\u9762\u5C5E\u4E8E\u8FD9\u4E2A portal\u3002LiteLLM\u3001Hermes \u8FD9\u7C7B\u72EC\u7ACB\u5DE5\u5177\u516C\u5F00\u65F6\u5E94\u4F7F\u7528\u81EA\u5DF1\u7684 hostname\u3002",
    },
    ops: { eyebrow: "\u64CD\u4F5C\u901A\u9053", lead: "\u628A\u5916\u90E8\u63A7\u5236\u5E73\u9762\u4E0E\u672C\u673A\u6587\u6863\u4ECE\u670D\u52A1\u542F\u52A8\u5668\u4E2D\u5206\u79BB\u51FA\u6765\u3002" },
    launcher: {
      trigger: "\u542F\u52A8\u5668",
      eyebrow: "\u547D\u4EE4\u542F\u52A8\u5668",
      close: "\u5173\u95ED\u542F\u52A8\u5668",
      searchAria: "\u641C\u7D22\u8DEF\u7531\u4E0E\u670D\u52A1",
      searchPlaceholder: "\u641C\u7D22\u8DEF\u7531\u3001\u670D\u52A1\u3001\u7AEF\u53E3",
      resultsAria: "\u53EF\u7528\u8DEF\u7531\u4E0E\u670D\u52A1",
      empty: "\u627E\u4E0D\u5230\u8DEF\u7531",
      adjust: "\u8C03\u6574\u641C\u7D22\u5173\u952E\u8BCD\u3002",
      type: "\u7C7B\u578B",
      target: "\u76EE\u6807",
      status: "\u72B6\u6001",
      open: "\u5F00\u542F",
    },
    benchmark: {
      eyebrow: "\u57FA\u51C6\u4E0A\u4F20",
      lastRun: "\u6700\u540E\u8FD0\u884C",
      autoRefresh: "\u81EA\u52A8\u5237\u65B0",
      nextRun: "\u4E0B\u6B21\u8FD0\u884C",
      node: "\u8282\u70B9",
      cpuScore: "CPU \u5206\u6570",
      memory: "\u5185\u5B58",
      rawLog: "\u539F\u59CB\u65E5\u5FD7",
      geekbench: "Geekbench",
      runHint: "\u8FD0\u884C scripts/run-benchmark.sh \u5BFC\u5165 YABS \u6570\u636E\u3002",
      network: "\u7F51\u7EDC",
      disk: "\u78C1\u76D8",
      notUploaded: "\u5C1A\u672A\u4E0A\u4F20",
      noBenchmark: "\u5C1A\u672A\u4E0A\u4F20\u57FA\u51C6\u6570\u636E",
      noSystem: "\u6CA1\u6709\u7CFB\u7EDF\u57FA\u51C6\u5143\u6570\u636E",
      running: "\u8FD0\u884C\u4E2D",
      scheduled: "\u6BCF {interval}",
      manual: "\u624B\u52A8",
      runningNow: "\u6B63\u5728\u8FD0\u884C",
      yabsRunning: "YABS \u8FD0\u884C\u4E2D",
      refreshSummary: "YABS \u6B63\u5728\u5237\u65B0\u7F51\u7EDC\u4E0E\u78C1\u76D8\u57FA\u51C6\u6570\u636E\uFF0C\u5B8C\u6210\u540E\u6B64\u9762\u677F\u4F1A\u81EA\u52A8\u66F4\u65B0\u3002",
      noCpu: "\u5C1A\u672A\u4E0A\u4F20 CPU \u57FA\u51C6\u6570\u636E",
      openResult: "\u5F00\u542F\u7ED3\u679C",
      system: { ISP: "ISP", ASN: "ASN", Region: "\u5730\u533A", OS: "OS", Kernel: "Kernel", VM: "VM" },
    },
    oracle: {
      eyebrow: "oracle cloudping",
      title: "Oracle \u533A\u57DF\u5EF6\u8FDF",
      probe: "\u63A2\u6D4B",
      source: "\u6765\u6E90",
      fastest: "\u6700\u5FEB",
      mean: "\u5E73\u5747",
      progress: "\u8FDB\u5EA6",
      updated: "\u66F4\u65B0",
      auto: "\u81EA\u52A8",
      fastestRegions: "\u6700\u5FEB\u533A\u57DF",
      regionMatrix: "\u533A\u57DF\u77E9\u9635",
      idle: "\u95F2\u7F6E",
      probing: "\u63A2\u6D4B\u4E2D",
      auto5m: "\u81EA\u52A8 5 \u5206\u949F",
      failed: "\u5931\u8D25",
      noSamples: "\u8FD8\u6CA1\u6709 Oracle \u5EF6\u8FDF\u6837\u672C",
    },
    status: { pending: "\u7B49\u5F85", online: "\u5728\u7EBF", offline: "\u79BB\u7EBF", active: "\u5F53\u524D", route: "\u8DEF\u7531", gated: "\u53D7\u4FDD\u62A4", ok: "\u6B63\u5E38", error: "\u9519\u8BEF", open: "\u5F00\u542F", local: "\u672C\u673A", tracked: "\u8FFD\u8E2A", closed: "\u5173\u95ED" },
    routeLabels: { pathRoute: "Portal Path", currentHost: "\u5F53\u524D\u4E3B\u673A", localhostOnly: "\u4EC5 localhost", externalConsole: "\u5916\u90E8\u63A7\u5236\u53F0", localOnly: "\u4EC5\u672C\u673A" },
    detail: {
      localRuns: "\u6B64\u670D\u52A1\u76EE\u524D\u53EA\u5728\u670D\u52A1\u5668\u672C\u673A\u8FD0\u884C\uFF0C\u516C\u5F00\u4F7F\u7528\u524D\u9700\u8981\u4E13\u7528 Tunnel \u8DEF\u7531\u3002",
      publicAvailable: "\u53EF\u901A\u8FC7\u53D7\u4FDD\u62A4\u7684\u516C\u5F00\u63A7\u5236\u53F0\u4F7F\u7528\u3002",
      localOnlyTarget: "\u4EC5\u672C\u673A\u76EE\u6807\u3002\u4ECE\u516C\u5F00 portal \u4F7F\u7528\u524D\uFF0C\u8BF7\u5148\u52A0\u4E13\u7528 Cloudflare hostname\u3002",
      localAction: "\u672C\u673A",
    },
    preview: { route: "\u8DEF\u7531", service: "\u670D\u52A1", port: "\u7AEF\u53E3 {port}" },
    health: {
      allNominal: "\u7CFB\u7EDF\u6B63\u5E38",
      servicePending: "{count} \u9879\u670D\u52A1\u7B49\u5F85",
      updated: "\u66F4\u65B0 {time}",
      onlineCount: "{online}/{total} \u5728\u7EBF",
      syncPending: "\u540C\u6B65\u7B49\u5F85\u4E2D",
      syncUnavailable: "\u540C\u6B65\u4E0D\u53EF\u7528",
      statusUnavailable: "\u72B6\u6001 API \u4E0D\u53EF\u7528",
      retrying: "\u91CD\u8BD5\u4E2D",
      checking: "\u68C0\u67E5\u4E2D",
      waitingProbe: "\u7B49\u5F85\u9996\u6B21\u63A2\u6D4B",
    },
    time: { soon: "\u5373\u5C06", justNow: "\u521A\u521A", inMinutes: "{value} \u5206\u949F\u540E", minutesAgo: "{value} \u5206\u949F\u524D", inHours: "{value} \u5C0F\u65F6\u540E", hoursAgo: "{value} \u5C0F\u65F6\u524D", manual: "\u624B\u52A8", daysHours: "{days} \u5929 {hours} \u5C0F\u65F6", hoursMinutes: "{hours} \u5C0F\u65F6 {minutes} \u5206\u949F", minutes: "{minutes} \u5206\u949F" },
  },
  en: {
    aria: {
      portalHeader: "Hiraeth header",
      home: "Hiraeth home",
      primaryNav: "Primary navigation",
      language: "Language switcher",
      primaryActions: "Primary actions",
      routeOverview: "Route overview",
      routeCategories: "Route categories",
      runtimeHighlights: "Runtime highlights",
      machineUsage: "Machine resource usage",
      diskThroughput: "Disk throughput",
      oracleSummary: "Oracle latency summary",
    },
    brand: {
      description: "A protected route console for services, machine status, local ports, and operator tools.",
      protectedLabel: "Access protected",
      launcherFooterLabel: "Protected route",
    },
    nav: { home: "Home", services: "Services", monitor: "Monitor", ports: "Ports", ops: "Ops" },
    routes: {
      home: { name: "Home", description: "Route overview and live summary." },
      services: { name: "Services", description: "Launch local apps and external consoles." },
      monitor: { name: "Monitor", description: "CPU, RAM, disk, uptime, and health." },
      ports: { name: "Ports", description: "Local listeners and tunnel targets." },
      ops: { name: "Ops", description: "Operations links and documentation." },
    },
    servicesText: {
      portal: { name: "Hiraeth", description: "Protected control surface and service launcher." },
      monitor: { name: "Server Monitor", description: "Live CPU, RAM, disk, uptime, and port health." },
      hermes: { name: "Hermes WebUI", description: "Agent workspace and protected browser console." },
      litellm: { name: "API Manager", description: "LiteLLM gateway admin, model routing, keys, and usage." },
      cloudflared: { name: "Cloudflare Tunnel", description: "Dedicated public route for this server." },
      homepage: { name: "Classic Homepage", description: "Original dashboard kept as a fallback." },
    },
    home: {
      eyebrow: "studio router",
      openLauncher: "Open launcher",
      onlineServices: "online services",
      strip: { cloudflare: "cloudflare", bind: "bind", services: "services", updated: "updated" },
    },
    services: { eyebrow: "launch matrix", lead: "Open local tools and external consoles from one classified service surface." },
    monitor: {
      eyebrow: "server monitor",
      title: "Live Machine Status",
      lead: "CPU, RAM, disk, uptime, and service health for the current server.",
      lastProbe: "last probe",
      cpu: "CPU",
      memory: "Memory",
      disk: "Disk",
      uptime: "Uptime",
      loadPending: "load pending",
      ramPending: "RAM pending",
      rootPending: "root volume pending",
      processPending: "process load pending",
      hostFacts: "host facts",
      runtime: "Runtime",
      host: "Host",
      platform: "Platform",
      cores: "Cores",
      processes: "Processes",
      serviceHealth: "service health",
      load: "load {load1} / {load5} / {load15}",
      memoryNote: "{used} used \u00B7 {free} free",
      diskNote: "{used} / {total} on {mount}",
      loadNote: "{running} running \u00B7 {processes} processes",
      unavailable: "unavailable",
    },
    ports: {
      eyebrow: "local ports",
      lead: "A focused list of local listeners that the portal currently tracks.",
      routingRule: "routing rule",
      ruleTitle: "Path inside portal, subdomain for independent apps.",
      ruleBody: "Pages like /monitor live inside this portal. Tools like LiteLLM and Hermes should get their own hostnames when exposed remotely.",
    },
    ops: { eyebrow: "operator rail", lead: "External control planes and local documentation grouped away from service launchers." },
    launcher: {
      trigger: "Launcher",
      eyebrow: "command launcher",
      close: "Close launcher",
      searchAria: "Search routes and services",
      searchPlaceholder: "Search routes, services, ports",
      resultsAria: "Available routes and services",
      empty: "No route found",
      adjust: "Adjust the search query.",
      type: "Type",
      target: "Target",
      status: "Status",
      open: "Open",
    },
    benchmark: {
      eyebrow: "benchmark uplink",
      lastRun: "Last run",
      autoRefresh: "Auto refresh",
      nextRun: "Next run",
      node: "Node",
      cpuScore: "CPU score",
      memory: "Memory",
      rawLog: "Raw log",
      geekbench: "Geekbench",
      runHint: "Run scripts/run-benchmark.sh to import YABS data.",
      network: "Network",
      disk: "Disk",
      notUploaded: "not uploaded",
      noBenchmark: "No benchmark data uploaded",
      noSystem: "No system benchmark metadata",
      running: "running",
      scheduled: "every {interval}",
      manual: "manual",
      runningNow: "running now",
      yabsRunning: "YABS running",
      refreshSummary: "YABS is refreshing Network and Disk benchmark data now. This panel will update automatically after the run finishes.",
      noCpu: "No CPU benchmark uploaded",
      openResult: "open result",
      system: { ISP: "ISP", ASN: "ASN", Region: "Region", OS: "OS", Kernel: "Kernel", VM: "VM" },
    },
    oracle: {
      eyebrow: "oracle cloudping",
      title: "Oracle Region Latency",
      probe: "Probe",
      source: "Source",
      fastest: "Fastest",
      mean: "Mean",
      progress: "Progress",
      updated: "Updated",
      auto: "Auto",
      fastestRegions: "Fastest Regions",
      regionMatrix: "Region Matrix",
      idle: "idle",
      probing: "probing",
      auto5m: "auto 5m",
      failed: "failed",
      noSamples: "No Oracle latency samples yet",
    },
    status: { pending: "pending", online: "online", offline: "offline", active: "active", route: "route", gated: "gated", ok: "ok", error: "error", open: "open", local: "local", tracked: "tracked", closed: "closed" },
    routeLabels: { pathRoute: "path route", currentHost: "current host", localhostOnly: "localhost only", externalConsole: "external console", localOnly: "local only" },
    detail: {
      localRuns: "Runs on this server only until it gets a dedicated tunnel route.",
      publicAvailable: "Available through the protected public control surface.",
      localOnlyTarget: "Local-only target. Add a dedicated Cloudflare hostname before using this from the public portal.",
      localAction: "Local",
    },
    preview: { route: "route", service: "service", port: "port {port}" },
    health: {
      allNominal: "All systems nominal",
      servicePending: "{count} service pending",
      updated: "Updated {time}",
      onlineCount: "{online}/{total} online",
      syncPending: "sync pending",
      syncUnavailable: "sync unavailable",
      statusUnavailable: "Status API unavailable",
      retrying: "Retrying",
      checking: "Checking",
      waitingProbe: "Waiting for first probe",
    },
    time: { soon: "soon", justNow: "just now", inMinutes: "in {value}m", minutesAgo: "{value}m ago", inHours: "in {value}h", hoursAgo: "{value}h ago", manual: "manual", daysHours: "{days}d {hours}h", hoursMinutes: "{hours}h {minutes}m", minutes: "{minutes}m" },
  },
};


Object.assign(messages["zh-Hant"].routeLabels, {
  publicPending: "\u516C\u958B\u8DEF\u7531\u7B49\u5F85",
  publicClosed: "\u516C\u958B\u672A\u901A",
  publicState: "\u516C\u958B {state} {ms}ms",
  localTcpClosed: "\u672C\u6A5F TCP \u95DC\u9589",
  localTcpMs: "\u672C\u6A5F TCP {ms}ms",
  localTcpWith: "\u672C\u6A5F TCP {latency}",
});
Object.assign(messages["zh-Hans"].routeLabels, {
  publicPending: "\u516C\u5F00\u8DEF\u7531\u7B49\u5F85",
  publicClosed: "\u516C\u5F00\u672A\u901A",
  publicState: "\u516C\u5F00 {state} {ms}ms",
  localTcpClosed: "\u672C\u673A TCP \u5173\u95ED",
  localTcpMs: "\u672C\u673A TCP {ms}ms",
  localTcpWith: "\u672C\u673A TCP {latency}",
});
Object.assign(messages.en.routeLabels, {
  publicPending: "public pending",
  publicClosed: "public closed",
  publicState: "public {state} {ms}ms",
  localTcpClosed: "local tcp closed",
  localTcpMs: "local tcp {ms}ms",
  localTcpWith: "local tcp {latency}",
});

Object.assign(messages["zh-Hant"].health, {
  checkNow: "檢查",
  checkingNow: "檢查中",
  restart: "重啟",
  restarting: "重啟中",
  restartUnavailable: "不可重啟",
  watchdogOn: "自動保活",
  watchdogOff: "手動",
  restartOk: "重啟已送出",
  restartFailed: "重啟失敗",
});
Object.assign(messages["zh-Hans"].health, {
  checkNow: "检查",
  checkingNow: "检查中",
  restart: "重启",
  restarting: "重启中",
  restartUnavailable: "不可重启",
  watchdogOn: "自动保活",
  watchdogOff: "手动",
  restartOk: "重启已送出",
  restartFailed: "重启失败",
});
Object.assign(messages.en.health, {
  checkNow: "Check",
  checkingNow: "Checking",
  restart: "Restart",
  restarting: "Restarting",
  restartUnavailable: "No restart",
  watchdogOn: "watchdog",
  watchdogOff: "manual",
  restartOk: "restart sent",
  restartFailed: "restart failed",
});


function supportedLanguage(language) {
  return supportedLanguages.includes(language) ? language : "zh-Hant";
}

function initialLanguage() {
  try {
    const stored = window.localStorage.getItem(languageStorageKey);
    if (supportedLanguages.includes(stored)) return stored;
  } catch {}

  const browserLanguage = (navigator.language || "").toLowerCase();
  if (browserLanguage.startsWith("zh-cn") || browserLanguage.startsWith("zh-sg") || browserLanguage.includes("hans")) return "zh-Hans";
  if (browserLanguage.startsWith("en")) return "en";
  return "zh-Hant";
}

let currentLanguage = initialLanguage();

function lookupMessage(language, key) {
  return key.split(".").reduce((value, part) => (value && Object.prototype.hasOwnProperty.call(value, part) ? value[part] : undefined), messages[language]);
}

function interpolate(value, params = {}) {
  return String(value).replace(/\{(\w+)\}/g, (match, key) => (params[key] === undefined || params[key] === null ? match : String(params[key])));
}

function tx(key, fallback = key, params = {}) {
  const value = lookupMessage(currentLanguage, key) ?? lookupMessage("en", key);
  return interpolate(value === undefined ? fallback : value, params);
}

function t(key, params = {}) {
  return tx(key, key, params);
}

function currentLocale() {
  return localeByLanguage[currentLanguage] || localeByLanguage["zh-Hant"];
}

function formatDisplayTime(value, includeZone = true) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  const time = date.toLocaleTimeString(currentLocale(), { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: displayTimeZone });
  return includeZone ? time + " " + displayTimeZoneLabel : time;
}

function formatDisplayDateTime(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  return date.toLocaleString(currentLocale(), { hour12: false, timeZone: displayTimeZone }) + " " + displayTimeZoneLabel;
}

const state = {
  selectedId: "portal",
  selectedIndex: 0,
  query: "",
  statuses: new Map(),
  publicRoutes: new Map(),
  statusRefreshing: false,
  launcherOpen: false,
  lastFocus: null,
  route: "home",
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const elements = {
  grid: $("#service-grid"),
  portList: $("#port-list"),
  ring: $(".ring"),
  ringValue: $("#ring-value"),
  statusTitle: $("#status-title"),
  statusTime: $("#status-time"),
  servicesMeta: $("#services-meta"),
  clockTime: $("#clock-time"),
  serviceDetail: $("#service-detail"),
  routeGrid: $("#route-grid"),
  opsGrid: $(".ops-grid"),
  hubRoutes: $("#hub-routes"),
  homeOnline: $("#home-online"),
  homeUpdated: $("#home-updated"),
  launcher: $("#launcher"),
  launcherInput: $("#launcher-input"),
  launcherResults: $("#launcher-results"),
  launcherPreview: $("#launcher-preview"),
  launcherClose: $("#launcher-close"),
  launcherButtons: [$("#open-launcher"), $("#hero-launcher")].filter(Boolean),
  cursorGlow: $("#cursor-glow"),
  pixelTrail: $("#pixel-trail"),
  hubLinks: $("#hub-links"),
  clockZone: $("#clock-zone"),
  languageButtons: $$("[data-lang-option]"),
  statusButtons: $$("[data-refresh-status]"),
};

const monitorElements = {
  updated: $("#monitor-updated"),
  cpu: $("#monitor-cpu"),
  cpuMeter: $("#monitor-cpu-meter"),
  cpuNote: $("#monitor-cpu-note"),
  memory: $("#monitor-memory"),
  memoryMeter: $("#monitor-memory-meter"),
  memoryNote: $("#monitor-memory-note"),
  disk: $("#monitor-disk"),
  diskMeter: $("#monitor-disk-meter"),
  diskNote: $("#monitor-disk-note"),
  diskIo: $("#monitor-disk-io"),
  uptime: $("#monitor-uptime"),
  loadMeter: $("#monitor-load-meter"),
  loadNote: $("#monitor-load-note"),
  host: $("#monitor-host"),
  platform: $("#monitor-platform"),
  cores: $("#monitor-cores"),
  processes: $("#monitor-processes"),
  services: $("#monitor-service-list"),
};

const benchmarkElements = {
  updated: $("#benchmark-updated"),
  auto: $("#benchmark-auto"),
  next: $("#benchmark-next"),
  source: $("#benchmark-source"),
  summary: $("#benchmark-summary"),
  cpuModel: $("#benchmark-cpu-model"),
  cpuScores: $("#benchmark-cpu-scores"),
  node: $("#benchmark-node"),
  memory: $("#benchmark-memory"),
  raw: $("#benchmark-raw"),
  gb6: $("#benchmark-gb6"),
  system: $("#benchmark-system-list"),
  disk: $("#benchmark-disk-list"),
  network: $("#benchmark-network-list"),
};

const oracleElements = {
  status: $("#oracle-status"),
  run: $("#oracle-run"),
  fastest: $("#oracle-fastest"),
  mean: $("#oracle-mean"),
  progress: $("#oracle-progress"),
  updated: $("#oracle-updated"),
  next: $("#oracle-next"),
  top: $("#oracle-top-list"),
  list: $("#oracle-region-list"),
};

const oracleRegions = [
  { text1: "Australia East", text2: "Sydney", code: "ap-sydney-1" },
  { text1: "Australia Southeast", text2: "Melbourne", code: "ap-melbourne-1" },
  { text1: "Brazil East", text2: "Sao Paulo", code: "sa-saopaulo-1" },
  { text1: "Brazil Southeast", text2: "Vinhedo", code: "sa-vinhedo-1" },
  { text1: "Canada Southeast", text2: "Montreal", code: "ca-montreal-1" },
  { text1: "Canada Southeast", text2: "Toronto", code: "ca-toronto-1" },
  { text1: "Chile Central", text2: "Santiago", code: "sa-santiago-1" },
  { text1: "Chile West", text2: "Valparaiso", code: "sa-valparaiso-1" },
  { text1: "Colombia Central", text2: "Bogota", code: "sa-bogota-1" },
  { text1: "France Central", text2: "Paris", code: "eu-paris-1" },
  { text1: "France South", text2: "Marseille", code: "eu-marseille-1" },
  { text1: "Germany Central", text2: "Frankfurt", code: "eu-frankfurt-1" },
  { text1: "India South", text2: "Hyderabad", code: "ap-hyderabad-1" },
  { text1: "India West", text2: "Mumbai", code: "ap-mumbai-1" },
  { text1: "Indonesia North", text2: "Batam", code: "ap-batam-1" },
  { text1: "Israel Central", text2: "Jerusalem", code: "il-jerusalem-1" },
  { text1: "Italy Northwest", text2: "Milan", code: "eu-milan-1" },
  { text1: "Japan Central", text2: "Osaka", code: "ap-osaka-1" },
  { text1: "Japan East", text2: "Tokyo", code: "ap-tokyo-1" },
  { text1: "Mexico Central", text2: "Queretaro", code: "mx-queretaro-1" },
  { text1: "Mexico Northeast", text2: "Monterrey", code: "mx-monterrey-1" },
  { text1: "Netherlands Northwest", text2: "Amsterdam", code: "eu-amsterdam-1" },
  { text1: "Saudi Arabia Central", text2: "Riyadh", code: "me-riyadh-1" },
  { text1: "Saudi Arabia West", text2: "Jeddah", code: "me-jeddah-1" },
  { text1: "Serbia Central", text2: "Jovanovac", code: "eu-jovanovac-1" },
  { text1: "Singapore", text2: "Singapore", code: "ap-singapore-1" },
  { text1: "Singapore", text2: "Singapore West", code: "ap-singapore-2" },
  { text1: "South Africa Central", text2: "Johannesburg", code: "af-johannesburg-1" },
  { text1: "South Korea Central", text2: "Seoul", code: "ap-seoul-1" },
  { text1: "South Korea North", text2: "Chuncheon", code: "ap-chuncheon-1" },
  { text1: "Spain Central", text2: "Madrid", code: "eu-madrid-1" },
  { text1: "Sweden Central", text2: "Stockholm", code: "eu-stockholm-1" },
  { text1: "Switzerland North", text2: "Zurich", code: "eu-zurich-1" },
  { text1: "UAE Central", text2: "Abu Dhabi", code: "me-abudhabi-1" },
  { text1: "UAE East", text2: "Dubai", code: "me-dubai-1" },
  { text1: "UK South", text2: "London", code: "uk-london-1" },
  { text1: "UK West", text2: "Newport", code: "uk-cardiff-1" },
  { text1: "US East", text2: "Ashburn", code: "us-ashburn-1" },
  { text1: "US Midwest", text2: "Chicago", code: "us-chicago-1" },
  { text1: "US West", text2: "Phoenix", code: "us-phoenix-1" },
  { text1: "US West", text2: "San Jose", code: "us-sanjose-1" },
];

const oracleAutoIntervalMs = 300000;

const oracleState = {
  running: false,
  results: new Map(),
  completed: 0,
  runId: 0,
  updatedAt: null,
  nextAutoAt: null,
};

function setText(selector, value) {
  const node = $(selector);
  if (node && value !== undefined && value !== null) node.textContent = String(value);
}

function setAttr(selector, name, value) {
  const node = $(selector);
  if (node && value) node.setAttribute(name, String(value));
}


function applyLanguageState() {
  document.documentElement.lang = currentLanguage;
  setAttr("meta[property=\"og:locale\"]", "content", ogLocaleByLanguage[currentLanguage] || "zh_TW");
  setText("#clock-zone", displayTimeZoneLabel);

  $$("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  $$("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
  $$("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
  });
  $$("[data-lang-option]").forEach((button) => {
    const active = button.dataset.langOption === currentLanguage;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  setText("#services-title", t("nav.services"));
  setText("#monitor-title", t("monitor.title"));
  setText("#host-title", t("monitor.runtime"));
  setText("#ports-title", t("nav.ports"));
  setText("#ops-title", t("nav.ops"));
  setText("#oracle-title", t("oracle.title"));
  setText("#launcher-title", brandConfig.productName || brandConfig.appName || "Hiraeth");
}

function localizedBrandDescription() {
  return tx("brand.description", brandConfig.description);
}

function localizedBrandLabel(field) {
  if (field === "protectedLabel") return tx("brand.protectedLabel", brandConfig.protectedLabel);
  if (field === "launcherFooterLabel") return tx("brand.launcherFooterLabel", brandConfig.launcherFooterLabel);
  return brandConfig[field] || "";
}

function localizedRoute(route) {
  return {
    ...route,
    name: tx("routes." + route.id + ".name", route.name),
    description: tx("routes." + route.id + ".description", route.description),
  };
}

function localizedService(service) {
  return {
    ...service,
    name: tx("servicesText." + service.id + ".name", service.name),
    description: tx("servicesText." + service.id + ".description", service.description),
  };
}

function localizedOpsLink(link) {
  return {
    ...link,
    name: link.name || "Link",
    description: link.description || "External resource",
  };
}

function statusText(status) {
  return tx("status." + status, status);
}

function routeStateText(status) {
  return tx("status." + status, status);
}

function routeKindText(kind) {
  return tx("preview." + kind, kind);
}

function actionText(action) {
  return tx("status." + action, action);
}

function setStatusRefreshing(active) {
  state.statusRefreshing = active;
  elements.statusButtons.forEach((button) => {
    button.disabled = active;
    button.textContent = active ? t("health.checkingNow") : t("health.checkNow");
  });
}

function restartButton(service) {
  if (!service.canRestart) return htmlTag("span", "class=\"watchdog-state\"", escapeHtml(t("health.restartUnavailable")));
  const label = service.restarting ? t("health.restarting") : (service.restartLabel || t("health.restart"));
  return "<button class=\"inline-action restart-action\" type=\"button\" data-restart-service=\"" + escapeHtml(service.id) + "\"" + (service.restarting ? " disabled" : "") + ">" + escapeHtml(label) + "</button>";
}

function restartMeta(service) {
  const parts = [service.watchdogEnabled ? t("health.watchdogOn") : t("health.watchdogOff")];
  if (service.failures) parts.push("fail " + service.failures);
  if (service.lastRestartMessage) parts.push(service.lastRestartMessage);
  return parts.join(" · ");
}

function setLanguage(language) {
  const nextLanguage = supportedLanguage(language);
  if (nextLanguage === currentLanguage) {
    applyLanguageState();
    return;
  }
  currentLanguage = nextLanguage;
  try {
    window.localStorage.setItem(languageStorageKey, currentLanguage);
  } catch {}
  renderShell();
  refreshStatus();
  refreshMonitor();
  renderOraclePing();
  if (state.launcherOpen) renderLauncher();
}

function applyPortalConfig(config) {
  if (!config || typeof config !== "object") return;
  if (Array.isArray(config.routes) && config.routes.length) routePages = config.routes;
  if (Array.isArray(config.services) && config.services.length) services = config.services;
  if (config.portNames && typeof config.portNames === "object") portNames = config.portNames;
  if (config.brand && typeof config.brand === "object") brandConfig = { ...brandConfig, ...config.brand };
  if (Array.isArray(config.heroTerminal) && config.heroTerminal.length) heroTerminalLines = config.heroTerminal;
  if (Array.isArray(config.ticker) && config.ticker.length) tickerItems = config.ticker;
  if (Array.isArray(config.opsLinks)) opsLinks = config.opsLinks;
  state.selectedId = services[0]?.id || "portal";
  updateBrandContent();
  renderHeroTerminal();
  renderTicker();
  renderOpsLinks();
}

async function loadPortalConfig() {
  try {
    const response = await fetch("/api/config", { cache: "no-store" });
    if (!response.ok) return;
    applyPortalConfig(await response.json());
  } catch {
    updateBrandContent();
    renderHeroTerminal();
    renderTicker();
    renderOpsLinks();
  }
}

function updateBrandContent() {
  const title = brandConfig.appName || "Hiraeth";
  const productName = brandConfig.productName || title;
  const description = localizedBrandDescription();
  const iconPath = brandConfig.iconPath || "/icon.svg";
  const faviconPath = brandConfig.faviconPath || iconPath;
  const brandImagePath = brandConfig.brandImagePath || iconPath;
  document.title = title;
  setAttr("meta[name=\"description\"]", "content", description);
  setAttr("link[rel=\"canonical\"]", "href", brandConfig.canonicalUrl);
  setAttr("meta[property=\"og:title\"]", "content", title);
  setAttr("meta[property=\"og:description\"]", "content", description);
  setAttr("meta[property=\"og:image\"]", "content", brandConfig.ogImage);
  setAttr("meta[property=\"og:image:alt\"]", "content", title + " route console preview");
  setAttr("meta[property=\"og:url\"]", "content", brandConfig.canonicalUrl);
  setAttr("meta[property=\"og:site_name\"]", "content", productName);
  setAttr("meta[property=\"og:locale\"]", "content", ogLocaleByLanguage[currentLanguage] || "zh_TW");
  setAttr("meta[name=\"twitter:title\"]", "content", title);
  setAttr("meta[name=\"twitter:description\"]", "content", description);
  setAttr("meta[name=\"twitter:image\"]", "content", brandConfig.ogImage);
  setAttr("link[rel=\"icon\"]", "href", faviconPath);
  setAttr("link[rel=\"shortcut icon\"]", "href", faviconPath);
  setAttr("link[rel=\"apple-touch-icon\"]", "href", brandImagePath);
  setAttr(".brand-mark img", "src", brandImagePath);
  setAttr(".hub-core img", "src", brandImagePath);
  setText(".brand strong", productName);
  setText(".brand small", brandConfig.publicHost);
  setText("#home-title", title);
  setText(".page-home .lead", description);
  setText(".home-strip div:nth-child(1) strong", localizedBrandLabel("protectedLabel"));
  setText(".home-strip div:nth-child(2) strong", brandConfig.bindLabel);
  setText(".hub-core span", String(brandConfig.bindLabel || "8790").replace(/^.*:/, ""));
  setText(".launcher-footer span", localizedBrandLabel("launcherFooterLabel"));
  setText(".launcher-footer strong", brandConfig.publicHost);
  setText("#launcher-title", productName);
  $$("[data-nav]").forEach((link) => {
    const route = routePages.find((item) => item.id === link.dataset.nav);
    if (route) link.textContent = localizedRoute(route).name;
  });
}

function renderHeroTerminal() {
  const terminal = $(".hero-terminal");
  if (!terminal) return;
  terminal.innerHTML = heroTerminalLines
    .map((line) => {
      return '<div><span>' + escapeHtml(line.code || "--") + '</span><code>' + escapeHtml(line.command || "status pending") + '</code><strong>' + escapeHtml(line.status || "OK") + '</strong></div>';
    })
    .join("");
}

function renderTicker() {
  const track = $(".ticker-track");
  if (!track) return;
  const items = tickerItems.length ? tickerItems : ["HIRAETH://ROUTE MATRIX ONLINE"];
  track.innerHTML = items.concat(items).map((item) => '<span>' + escapeHtml(item) + '</span>').join("");
}

function renderOpsLinks() {
  if (!elements.opsGrid || !opsLinks.length) return;
  elements.opsGrid.innerHTML = opsLinks
    .map((link) => {
      const item = localizedOpsLink(link);
      return "<a href=\"" + escapeHtml(item.href || "#") + "\" rel=\"noreferrer\"><span>" + escapeHtml(item.name || "Link") + "</span><small>" + escapeHtml(item.description || "External resource") + "</small></a>";
    })
    .join("");
}

const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => entities[character]);
}

function pageForPath(pathname = window.location.pathname) {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  if (normalized === "/") return "home";
  if (normalized === "/services") return "services";
  if (normalized === "/monitor") return "monitor";
  if (normalized === "/ports") return "ports";
  if (normalized === "/ops") return "ops";
  return "home";
}

function currentRoute() {
  return pageForPath();
}

function applyRoute() {
  state.route = currentRoute();
  document.body.dataset.route = state.route;
  $$('[data-nav]').forEach((link) => {
    const active = link.dataset.nav === state.route;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function statusFor(service) {
  return state.statuses.get(service.id);
}

function statusLabel(service) {
  const status = statusFor(service);
  if (!status) return "pending";
  return status.online ? "online" : "offline";
}

function publicRouteFor(service) {
  return service ? state.publicRoutes.get(service.id) : null;
}

function publicRouteLabel(route) {
  if (!route) return tx("routeLabels.publicPending", "public pending");
  if (!route.online || route.latencyMs === null) return tx("routeLabels.publicClosed", "public closed");
  return tx("routeLabels.publicState", "public {state} {ms}ms", { state: routeStateText(route.state), ms: route.latencyMs });
}

function latencyLabel(service) {
  const status = statusFor(service);
  const publicRoute = publicRouteFor(service);
  if (publicRoute) return publicRouteLabel(publicRoute);
  if (!status) return service.scope;
  if (!status.online || status.latencyMs === null) return tx("routeLabels.localTcpClosed", "local tcp closed");
  return tx("routeLabels.localTcpMs", "local tcp {ms}ms", { ms: status.latencyMs });
}

function routeLabel(item) {
  if (item.kind === "route") return t("routeLabels.pathRoute");
  if (item.href.startsWith("/")) return t("routeLabels.currentHost");
  if (item.href.startsWith("http://localhost")) return t("routeLabels.localhostOnly");
  return t("routeLabels.externalConsole");
}

function selectedService() {
  return services.find((service) => service.id === state.selectedId) || services[0];
}

function isLocalOnlyHref(href) {
  return /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:|\/|$)/.test(String(href || ""));
}

function isPublicRuntime() {
  return !["localhost", "127.0.0.1", "0.0.0.0", ""].includes(window.location.hostname);
}

function canOpenHref(href) {
  return href && !(isPublicRuntime() && isLocalOnlyHref(href));
}

function targetAttributes(item) {
  if (!item.href || item.href.startsWith("/")) return "";
  return ' target="_blank" rel="noreferrer"';
}

function launchItems() {
  const routes = routePages.map((route) => ({ ...route, kind: "route" }));
  const apps = services.map((service) => ({ ...service, kind: "service" }));
  return routes.concat(apps);
}

function renderRoutes() {
  if (elements.routeGrid) {
    elements.routeGrid.innerHTML = routePages
      .filter((route) => route.id !== "home")
      .map((route) => {
        const item = localizedRoute(route);
        return (
          "<a class=\"route-card accent-" + item.accent + "\" href=\"" + escapeHtml(item.href) + "\">" +
          "<span class=\"route-code\">" + escapeHtml(item.code) + "</span>" +
          "<span><strong>" + escapeHtml(item.name) + "</strong><small>" + escapeHtml(item.description) + "</small></span>" +
          "<i aria-hidden=\"true\"></i>" +
          "</a>"
        );
      })
      .join("");
  }

  if (elements.hubRoutes) {
    elements.hubRoutes.innerHTML = routePages
      .filter((route) => route.id !== "home")
      .map((route, index) => {
        const item = localizedRoute(route);
        return (
          "<a class=\"hub-node hub-node-" + index + " accent-" + item.accent + "\" href=\"" + escapeHtml(item.href) + "\">" +
          "<span>" + escapeHtml(item.code) + "</span>" +
          "<strong>" + escapeHtml(item.name) + "</strong>" +
          "</a>"
        );
      })
      .join("");
  }
}

function renderHubLinks() {
  if (!elements.hubLinks) return;
  elements.hubLinks.innerHTML = routePages
    .filter((route) => route.id !== "home")
    .map((route, index) => {
      const points = [
        "M50 50 L17 18",
        "M50 50 L83 18",
        "M50 50 L17 82",
        "M50 50 L83 82",
      ];
      return '<path class="hub-link accent-' + route.accent + '" d="' + points[index] + '" pathLength="100" />';
    })
    .join("");
}

function renderServices() {
  if (!elements.grid) return;
  elements.grid.innerHTML = services
    .map((service) => {
      const item = localizedService(service);
      const label = statusLabel(service);
      const selected = service.id === state.selectedId ? " selected" : "";
      const openable = canOpenHref(service.href);
      const disabled = openable ? "" : " local-disabled";
      const href = openable ? service.href : "#";
      const meta = openable ? routeLabel(service) : t("routeLabels.localOnly");
      return (
        "<a class=\"service-card accent-" + service.accent + selected + disabled + "\" href=\"" + escapeHtml(href) + "\" data-service-id=\"" + escapeHtml(service.id) + "\"" + (openable ? targetAttributes(service) : " aria-disabled=\"true\"") + ">" +
        "<div class=\"service-top\"><span class=\"service-code\">" + escapeHtml(service.code) + "</span><span class=\"status-chip " + label + "\"><i></i>" + escapeHtml(statusText(label)) + "</span></div>" +
        "<div><h3>" + escapeHtml(item.name) + "</h3><p>" + escapeHtml(item.description) + "</p></div>" +
        "<div class=\"service-meta\"><span>" + escapeHtml(meta) + "</span><span>" + escapeHtml(latencyLabel(service)) + "</span></div>" +
        "</a>"
      );
    })
    .join("");
}
function renderDetail() {
  if (!elements.serviceDetail) return;
  const rawService = selectedService();
  const service = localizedService(rawService);
  const label = statusLabel(rawService);
  const openable = canOpenHref(rawService.href);
  const note = openable
    ? (rawService.scope === "local" ? t("detail.localRuns") : t("detail.publicAvailable"))
    : t("detail.localOnlyTarget");
  const action = openable
    ? "<a class=\"button secondary compact\" href=\"" + escapeHtml(rawService.href) + "\"" + targetAttributes(rawService) + ">" + escapeHtml(t("launcher.open")) + "</a>"
    : "<button class=\"button secondary compact disabled\" type=\"button\" disabled>" + escapeHtml(t("detail.localAction")) + "</button>";
  elements.serviceDetail.innerHTML =
    "<div class=\"detail-main\"><span class=\"detail-code accent-" + rawService.accent + "\">" + escapeHtml(rawService.code) + "</span><div><h3>" + escapeHtml(service.name) + "</h3><p>" + escapeHtml(note) + "</p></div></div>" +
    "<div class=\"detail-stats\"><span>" + escapeHtml(statusText(label)) + "</span><strong>" + escapeHtml(rawService.port || routeLabel(rawService)) + "</strong></div>" +
    action;
}
function renderPorts(payload) {
  if (!elements.portList) return;
  const statuses = payload && payload.services ? payload.services.filter((status) => status.id !== "monitor") : [];
  elements.portList.innerHTML = statuses
    .map((status) => {
      const stateLabel = status.online ? "online" : "offline";
      const localLatency = status.online && status.latencyMs !== null ? status.latencyMs + "ms" : statusText("closed");
      const service = services.find((item) => item.port === status.port || item.id === status.id);
      const displayService = service ? localizedService(service) : null;
      const publicRoute = service ? publicRouteFor(service) : null;
      const publicLatency = publicRoute ? publicRouteLabel(publicRoute) : "";
      const latencyText = tx("routeLabels.localTcpWith", "local tcp {latency}", { latency: localLatency }) + (publicLatency ? " \u00B7 " + publicLatency : "");
      const openable = service && canOpenHref(service.href);
      const tag = openable ? "a" : "div";
      const classes = "port-row " + (openable ? "openable" : "local-disabled");
      const attrs = "class=\"" + classes + "\"" + (openable ? " href=\"" + escapeHtml(service.href) + "\"" + targetAttributes(service) : "");
      const action = publicRoute && publicRoute.state === "gated" ? "gated" : (openable ? "open" : (service && isLocalOnlyHref(service.href) ? "local" : "tracked"));
      return htmlTag(tag, attrs,
        htmlTag("span", "class=\"port\"", escapeHtml(status.port)) +
        htmlTag("span", "", htmlTag("strong", "", escapeHtml(displayService ? displayService.name : portNames[status.port] || status.name)) + htmlTag("small", "", escapeHtml(latencyText))) +
        htmlTag("span", "class=\"signal " + stateLabel + "\"", escapeHtml(statusText(stateLabel))) +
        htmlTag("span", "class=\"port-action\"", escapeHtml(status.canRestart ? (status.watchdogEnabled ? t("health.watchdogOn") : t("health.restart")) : actionText(action)))
      );
    })
    .join("");
}
function updateSummary(payload) {
  const { online, total } = payload.summary;
  const pct = total ? Math.round((online / total) * 100) : 0;
  if (elements.ring) elements.ring.style.setProperty("--pct", pct);
  if (elements.ringValue) elements.ringValue.textContent = online + "/" + total;
  if (elements.statusTitle) elements.statusTitle.textContent = online === total ? t("health.allNominal") : t("health.servicePending", { count: total - online });
  const time = formatDisplayTime(payload.updatedAt);
  if (elements.statusTime) elements.statusTime.textContent = t("health.updated", { time });
  if (elements.servicesMeta) elements.servicesMeta.textContent = t("health.onlineCount", { online, total });
  if (elements.homeOnline) elements.homeOnline.textContent = t("health.onlineCount", { online, total });
  if (elements.homeUpdated) elements.homeUpdated.textContent = time;
}

function setSelected(id) {
  state.selectedId = id;
  renderServices();
  renderDetail();
  if (state.launcherOpen) renderLauncher();
}

function filteredItems() {
  const query = state.query.trim().toLowerCase();
  const items = launchItems();
  if (!query) return items;
  return items.filter((item) => {
    const display = item.kind === "route" ? localizedRoute(item) : localizedService(item);
    const haystack = [item.kind, routeKindText(item.kind), item.id, item.code, display.name, display.description, item.href, item.port || "", item.scope || "", routeLabel(item)].join(" ").toLowerCase();
    return haystack.includes(query);
  });
}

function statusForItem(item) {
  if (item.kind === "route") return item.id === state.route ? "active" : "route";
  return statusLabel(item);
}

function renderLauncher() {
  const results = filteredItems();
  if (state.selectedIndex >= results.length) state.selectedIndex = Math.max(0, results.length - 1);
  const active = results[state.selectedIndex];
  if (elements.launcherInput) elements.launcherInput.setAttribute("aria-activedescendant", active ? "launcher-option-" + active.kind + "-" + active.id : "");

  if (!results.length) {
    elements.launcherResults.innerHTML = "<div class=\"empty-state\">" + escapeHtml(t("launcher.empty")) + "</div>";
    elements.launcherPreview.innerHTML = "<div class=\"preview-empty\">" + escapeHtml(t("launcher.adjust")) + "</div>";
    return;
  }

  elements.launcherResults.innerHTML = results
    .map((item, index) => {
      const display = item.kind === "route" ? localizedRoute(item) : localizedService(item);
      const selected = index === state.selectedIndex ? " selected" : "";
      const label = statusForItem(item);
      return (
        "<button id=\"launcher-option-" + item.kind + "-" + escapeHtml(item.id) + "\" class=\"launcher-option accent-" + item.accent + selected + "\" type=\"button\" role=\"option\" aria-selected=\"" + (selected ? "true" : "false") + "\" data-index=\"" + index + "\">" +
        "<span class=\"row-icon\">" + escapeHtml(item.code) + "</span>" +
        "<span><strong>" + escapeHtml(display.name) + "</strong><small>" + escapeHtml(routeLabel(item)) + "</small></span>" +
        "<span class=\"status-chip " + label + "\"><i></i>" + escapeHtml(statusText(label)) + "</span>" +
        "</button>"
      );
    })
    .join("");

  elements.launcherPreview.innerHTML = renderPreview(active);
}

function renderPreview(item) {
  const display = item.kind === "route" ? localizedRoute(item) : localizedService(item);
  const secondLine = item.kind === "route" ? item.href : (item.port ? t("preview.port", { port: item.port }) : routeLabel(item));
  return (
    "<div class=\"preview-code accent-" + item.accent + "\">" + escapeHtml(item.code) + "</div>" +
    "<h3>" + escapeHtml(display.name) + "</h3>" +
    "<p>" + escapeHtml(display.description) + "</p>" +
    "<dl class=\"preview-list\">" +
    "<div><dt>" + escapeHtml(t("launcher.type")) + "</dt><dd>" + escapeHtml(routeKindText(item.kind)) + "</dd></div>" +
    "<div><dt>" + escapeHtml(t("launcher.target")) + "</dt><dd>" + escapeHtml(secondLine) + "</dd></div>" +
    "<div><dt>" + escapeHtml(t("launcher.status")) + "</dt><dd>" + escapeHtml(statusText(statusForItem(item))) + "</dd></div>" +
    "</dl>" +
    "<button class=\"button primary full\" type=\"button\" data-open-active>" + escapeHtml(t("launcher.open")) + "</button>"
  );
}

function openLauncher() {
  state.launcherOpen = true;
  state.lastFocus = document.activeElement;
  state.query = "";
  state.selectedIndex = 0;
  elements.launcher.hidden = false;
  document.body.classList.add("launcher-open");
  elements.launcherInput.value = "";
  renderLauncher();
  requestAnimationFrame(() => elements.launcherInput.focus());
}

function closeLauncher() {
  state.launcherOpen = false;
  elements.launcher.hidden = true;
  document.body.classList.remove("launcher-open");
  if (state.lastFocus && typeof state.lastFocus.focus === "function") state.lastFocus.focus();
}

function openItem(item) {
  if (item.kind === "service") setSelected(item.id);
  closeLauncher();
  if (item.href.startsWith("/")) window.location.assign(item.href);
  else window.open(item.href, "_blank", "noopener,noreferrer");
}

async function refreshStatus(options = {}) {
  if (options.manual) setStatusRefreshing(true);
  try {
    const response = await fetch("/api/status", { cache: "no-store" });
    const payload = await response.json();
    state.statuses = new Map(payload.services.map((service) => [service.id, service]));
    state.publicRoutes = new Map((payload.publicRoutes || []).map((route) => [route.id, route]));
    renderServices();
    renderDetail();
    renderPorts(payload);
    updateSummary(payload);
    if (state.launcherOpen) renderLauncher();
  } catch {
    if (elements.statusTitle) elements.statusTitle.textContent = t("health.statusUnavailable");
    if (elements.statusTime) elements.statusTime.textContent = t("health.retrying");
    if (elements.servicesMeta) elements.servicesMeta.textContent = t("health.syncUnavailable");
  } finally {
    if (options.manual) setStatusRefreshing(false);
  }
}

async function restartService(id) {
  const current = state.statuses.get(id);
  if (current) {
    state.statuses.set(id, { ...current, restarting: true });
    renderServices();
    renderDetail();
  }
  try {
    const response = await fetch("/api/restart", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const payload = await response.json();
    if (Array.isArray(payload.services)) state.statuses = new Map(payload.services.map((service) => [service.id, service]));
    await refreshHealth();
  } catch {
    await refreshHealth();
  }
}

function updateClock() {
  if (elements.clockTime) elements.clockTime.textContent = formatDisplayTime(new Date(), false);
  if (elements.clockZone) elements.clockZone.textContent = displayTimeZoneLabel;
}

function formatBytes(bytes) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = Number(bytes || 0);
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return (value >= 10 || unit === 0 ? value.toFixed(0) : value.toFixed(1)) + " " + units[unit];
}

function formatRate(bytesPerSecond) {
  if (bytesPerSecond === null || bytesPerSecond === undefined || Number.isNaN(Number(bytesPerSecond))) return "--/s";
  return formatBytes(bytesPerSecond) + "/s";
}

function formatDuration(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (days > 0) return t("time.daysHours", { days, hours });
  if (hours > 0) return t("time.hoursMinutes", { hours, minutes });
  return t("time.minutes", { minutes });
}

function setMeter(element, value) {
  if (element) element.style.width = Math.max(0, Math.min(100, Number(value) || 0)) + "%";
}

function renderMonitor(payload) {
  if (!monitorElements.updated) return;
  const diskIo = payload.disk.io || {};
  const diskBusy = diskIo.busyPct === null || diskIo.busyPct === undefined ? "--" : diskIo.busyPct.toFixed(1) + "%";
  monitorElements.updated.textContent = formatDisplayTime(payload.updatedAt);
  monitorElements.cpu.textContent = payload.cpu.usagePct.toFixed(1) + "%";
  monitorElements.cpuNote.textContent = t("monitor.load", { load1: payload.cpu.load1.toFixed(2), load5: payload.cpu.load5.toFixed(2), load15: payload.cpu.load15.toFixed(2) });
  setMeter(monitorElements.cpuMeter, payload.cpu.usagePct);
  monitorElements.memory.textContent = payload.memory.usedPct.toFixed(1) + "%";
  monitorElements.memoryNote.textContent = t("monitor.memoryNote", { used: formatBytes(payload.memory.usedBytes), free: formatBytes(payload.memory.availableBytes) });
  setMeter(monitorElements.memoryMeter, payload.memory.usedPct);
  monitorElements.disk.textContent = payload.disk.usedPct.toFixed(0) + "%";
  monitorElements.diskNote.textContent = t("monitor.diskNote", { used: formatBytes(payload.disk.usedBytes), total: formatBytes(payload.disk.totalBytes), mount: payload.disk.mount });
  if (monitorElements.diskIo) {
    monitorElements.diskIo.innerHTML =
      htmlTag("span", "", "R " + escapeHtml(formatRate(diskIo.readBytesPerSec))) +
      htmlTag("span", "", "W " + escapeHtml(formatRate(diskIo.writeBytesPerSec))) +
      htmlTag("span", "", "IO " + escapeHtml(diskBusy));
  }
  setMeter(monitorElements.diskMeter, payload.disk.usedPct);
  monitorElements.uptime.textContent = formatDuration(payload.uptime.uptimeSeconds);
  monitorElements.loadNote.textContent = t("monitor.loadNote", { running: payload.cpu.running, processes: payload.cpu.processes });
  setMeter(monitorElements.loadMeter, payload.cpu.pressurePct);
  monitorElements.host.textContent = payload.host.hostname;
  monitorElements.platform.textContent = payload.host.platform + " / " + payload.host.arch;
  monitorElements.cores.textContent = String(payload.host.cores);
  monitorElements.processes.textContent = String(payload.cpu.processes);
  monitorElements.services.innerHTML = payload.services
    .map((service) => {
      const label = service.online ? "online" : "offline";
      const latency = service.online && service.latencyMs !== null ? service.latencyMs + "ms" : statusText("closed");
      const publicRoute = state.publicRoutes.get(service.id);
      const publicText = publicRoute ? " \u00B7 " + publicRouteLabel(publicRoute) : "";
      const configured = services.find((item) => item.id === service.id);
      const displayName = configured ? localizedService(configured).name : service.name;
      const metaText = service.canRestart ? " \u00B7 " + restartMeta(service) : "";
      return htmlTag("div", "class=\"monitor-service-row\"",
        htmlTag("span", "class=\"signal " + label + "\"", escapeHtml(statusText(label))) +
        htmlTag("strong", "", escapeHtml(displayName)) +
        htmlTag("small", "", escapeHtml(service.port + " \u00B7 " + tx("routeLabels.localTcpWith", "local tcp {latency}", { latency }) + publicText + metaText)) +
        htmlTag("span", "class=\"monitor-service-actions\"", restartButton(service))
      );
    })
    .join("");
}

function valueOrDash(value) {
  if (value === null || value === undefined || value === "") return "--";
  return String(value);
}

function formatBenchmarkTime(value) {
  if (!value) return t("benchmark.notUploaded");
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return t("benchmark.notUploaded");
  return formatDisplayDateTime(parsed);
}

function formatInterval(seconds) {
  const value = Number(seconds || 0);
  if (!value) return t("time.manual");
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  if (hours > 0 && minutes > 0) return t("time.hoursMinutes", { hours, minutes });
  if (hours > 0) return currentLanguage === "en" ? hours + "h" : hours + (currentLanguage === "zh-Hans" ? " 小时" : " 小時");
  if (minutes > 0) return t("time.minutes", { minutes });
  return value + "s";
}

function formatRelativeTime(value) {
  if (!value) return "--";
  const parsed = value instanceof Date ? value : new Date(value);
  const ms = parsed.getTime() - Date.now();
  if (Number.isNaN(parsed.getTime())) return "--";
  const abs = Math.abs(ms);
  const minutes = Math.round(abs / 60000);
  if (abs < 45000) return ms >= 0 ? t("time.soon") : t("time.justNow");
  if (minutes < 60) return ms >= 0 ? t("time.inMinutes", { value: minutes }) : t("time.minutesAgo", { value: minutes });
  const hours = Math.round(minutes / 60);
  return ms >= 0 ? t("time.inHours", { value: hours }) : t("time.hoursAgo", { value: hours });
}

function parseRateMbps(value) {
  const text = String(value || "").toLowerCase();
  const match = text.match(/(\d+(?:\.\d+)?)/);
  if (!match || text.includes("busy")) return 0;
  const number = Number(match[1]);
  if (text.includes("gbit")) return number * 1000;
  if (text.includes("kbit")) return number / 1000;
  if (text.includes("bit")) return number;
  return 0;
}

function parseDiskMbps(value) {
  const text = String(value || "").toLowerCase();
  const match = text.match(/(\d+(?:\.\d+)?)/);
  if (!match) return 0;
  const number = Number(match[1]);
  if (text.includes("gb/s")) return number * 1024;
  if (text.includes("kb/s")) return number / 1024;
  if (text.includes("mb/s")) return number;
  return 0;
}

function htmlTag(name, attrs, body) {
  const left = String.fromCharCode(60);
  const right = String.fromCharCode(62);
  return left + name + (attrs ? " " + attrs : "") + right + (body || "") + left + "/" + name.split(" ")[0] + right;
}

function barHtml(value, max, mode) {
  const amount = mode === "disk" ? parseDiskMbps(value) : parseRateMbps(value);
  const ratio = max ? amount / max : 0;
  const pct = amount ? Math.max(4, Math.min(100, Math.round(ratio * 100))) : 0;
  const idle = amount ? "" : " idle";
  return htmlTag("i", "class=\"throughput " + mode + idle + "\"", htmlTag("b", "style=\"width:" + pct + "%\"", ""));
}

function renderBenchmarkRows(rows, type) {
  if (!Array.isArray(rows) || !rows.length) {
    return htmlTag("div", "class=\"benchmark-empty\"", escapeHtml(t("benchmark.noBenchmark")));
  }

  if (type === "network") {
    const speeds = rows.flatMap(function(row) { return [parseRateMbps(row.send), parseRateMbps(row.receive)]; });
    const max = Math.max.apply(null, [1].concat(speeds));
    return rows.map(function(row) {
      return htmlTag("div", "class=\"benchmark-row network\"",
        htmlTag("span", "", escapeHtml(row.provider || "network")) +
        htmlTag("strong", "", escapeHtml(row.location || "--")) +
        htmlTag("small", "", htmlTag("em", "", "TX") + escapeHtml(valueOrDash(row.send)) + barHtml(row.send, max, "net")) +
        htmlTag("small", "", htmlTag("em", "", "RX") + escapeHtml(valueOrDash(row.receive)) + barHtml(row.receive, max, "net")) +
        htmlTag("small", "", htmlTag("em", "", "LAT") + escapeHtml(valueOrDash(row.latency)))
      );
    }).join("");
  }

  const totals = rows.map(function(row) { return parseDiskMbps(row.total || row.read || row.write); });
  const max = Math.max.apply(null, [1].concat(totals));
  return rows.map(function(row) {
    return htmlTag("div", "class=\"benchmark-row disk\"",
      htmlTag("span", "", escapeHtml(row.name || "disk test")) +
      htmlTag("strong", "", htmlTag("em", "", "R") + escapeHtml(valueOrDash(row.read))) +
      htmlTag("small", "", htmlTag("em", "", "W") + escapeHtml(valueOrDash(row.write))) +
      htmlTag("small", "", htmlTag("em", "", "T") + escapeHtml(valueOrDash(row.total)) + barHtml(row.total || row.read || row.write, max, "disk"))
    );
  }).join("");
}

function renderBenchmarkSystem(system) {
  const rows = [
    ["ISP", system.isp || system.host],
    ["ASN", system.asn],
    ["Region", system.location || system.country],
    ["OS", system.os],
    ["Kernel", system.kernel],
    ["VM", system.virtualization],
  ].filter(function(row) { return row[1]; });

  if (!rows.length) return htmlTag("div", "class=\"benchmark-empty\"", escapeHtml(t("benchmark.noSystem")));
  return rows.map(function(row) {
    return htmlTag("div", "", htmlTag("span", "", escapeHtml(tx("benchmark.system." + row[0], row[0]))) + htmlTag("strong", "", escapeHtml(row[1])));
  }).join("");
}

function renderBenchmark(payload) {
  if (!benchmarkElements.updated) return;
  const benchmark = payload && typeof payload === "object" ? payload : {};
  const cpu = benchmark.cpu || {};
  const system = benchmark.system || {};
  const memory = benchmark.memory || {};
  const raw = benchmark.raw || {};
  const single = cpu.singleCore ? "S " + cpu.singleCore : "S --";
  const multi = cpu.multiCore ? "M " + cpu.multiCore : "M --";

  const automation = benchmark.automation || {};
  const autoLabel = automation.running ? t("benchmark.running") : (automation.mode === "scheduled" ? t("benchmark.scheduled", { interval: formatInterval(automation.intervalSeconds) }) : t("benchmark.manual"));
  const nextLabel = automation.running ? t("benchmark.runningNow") : formatRelativeTime(automation.nextRunAt);
  const sourceLabel = automation.running ? t("benchmark.yabsRunning") : (benchmark.source || t("benchmark.notUploaded"));
  benchmarkElements.updated.textContent = formatBenchmarkTime(benchmark.updatedAt);
  if (benchmarkElements.auto) benchmarkElements.auto.textContent = autoLabel;
  if (benchmarkElements.next) benchmarkElements.next.textContent = nextLabel;
  benchmarkElements.source.textContent = sourceLabel;
  benchmarkElements.summary.textContent = automation.running
    ? t("benchmark.refreshSummary")
    : (benchmark.summary || t("benchmark.runHint"));
  benchmarkElements.cpuModel.textContent = cpu.model || t("benchmark.noCpu");
  benchmarkElements.cpuScores.textContent = single + " / " + multi;
  benchmarkElements.node.textContent = system.location || system.host || system.isp || "--";
  benchmarkElements.memory.textContent = memory.total || "--";
  benchmarkElements.raw.textContent = raw.path || "--";
  if (benchmarkElements.gb6) {
    benchmarkElements.gb6.textContent = cpu.fullTest ? t("benchmark.openResult") : "--";
    if (cpu.fullTest) benchmarkElements.gb6.href = cpu.fullTest;
    else benchmarkElements.gb6.removeAttribute("href");
  }
  benchmarkElements.system.innerHTML = renderBenchmarkSystem(system);
  benchmarkElements.network.innerHTML = renderBenchmarkRows(benchmark.network, "network");
  benchmarkElements.disk.innerHTML = renderBenchmarkRows(benchmark.disk, "disk");
}

async function refreshMonitor() {
  if (!["home", "monitor"].includes(currentRoute())) return;
  try {
    const response = await fetch("/api/monitor", { cache: "no-store" });
    const payload = await response.json();
    state.statuses = new Map(payload.services.map((service) => [service.id, service]));
    state.publicRoutes = new Map((payload.publicRoutes || []).map((route) => [route.id, route]));
    renderServices();
    renderDetail();
    renderMonitor(payload);
    renderBenchmark(payload.benchmark);
    if (state.launcherOpen) renderLauncher();
  } catch {
    if (monitorElements.updated) monitorElements.updated.textContent = t("monitor.unavailable");
  }
}

async function refreshHealth(options = {}) {
  if (options.manual) setStatusRefreshing(true);
  try {
    await Promise.all([refreshStatus(), refreshMonitor()]);
  } finally {
    if (options.manual) setStatusRefreshing(false);
  }
}

function oracleProbeUrl(region) {
  const cacheBuster = "cache_buster=" + Date.now() + "_" + Math.random().toString(16).slice(2);
  if (region.code === "eu-jovanovac-1") {
    return "https://ocir." + region.code + ".oci.oraclecloud20.com/ping?" + cacheBuster;
  }
  return "https://objectstorage." + region.code + ".oraclecloud.com/ping?" + cacheBuster;
}

function pingOracleRegion(region, timeoutMs = 5200) {
  const started = performance.now();
  return new Promise((resolve) => {
    const image = new Image();
    let settled = false;
    const timer = window.setTimeout(() => finish(false), timeoutMs);

    function finish(ok) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      image.onload = null;
      image.onerror = null;
      resolve(ok ? Math.max(1, Math.round(performance.now() - started)) : null);
    }

    image.onload = () => finish(true);
    image.onerror = () => finish(true);
    image.src = oracleProbeUrl(region);
  });
}

function median(values) {
  if (!values.length) return null;
  const sorted = values.slice().sort((a, b) => a - b);
  const midpoint = Math.floor(sorted.length / 2);
  if (sorted.length % 2) return sorted[midpoint];
  return Math.round((sorted[midpoint - 1] + sorted[midpoint]) / 2);
}

function oracleStats(region) {
  const result = oracleState.results.get(region.code) || { values: [], failed: 0, pending: false };
  const values = result.values || [];
  const min = values.length ? Math.min(...values) : null;
  const max = values.length ? Math.max(...values) : null;
  const mean = values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : null;
  return { region, result, values, min, max, mean, median: median(values) };
}

function latencyClass(value) {
  if (!value) return "pending";
  if (value < 80) return "fast";
  if (value < 180) return "ok";
  return "slow";
}

function renderOracleSummary(stats) {
  const measured = stats.filter((item) => item.mean !== null).sort((a, b) => a.mean - b.mean);
  const fastest = measured[0];
  const mean = measured.length ? Math.round(measured.reduce((sum, item) => sum + item.mean, 0) / measured.length) : null;
  const status = oracleState.running ? t("oracle.probing") : measured.length ? t("oracle.auto5m") : t("oracle.idle");

  if (oracleElements.status) oracleElements.status.textContent = status;
  if (oracleElements.fastest) oracleElements.fastest.textContent = fastest ? fastest.region.text2 + " " + fastest.mean + "ms" : "--";
  if (oracleElements.mean) oracleElements.mean.textContent = mean ? mean + "ms" : "--";
  if (oracleElements.progress) oracleElements.progress.textContent = oracleState.completed + "/" + oracleRegions.length;
  if (oracleElements.updated) {
    oracleElements.updated.textContent = oracleState.updatedAt ? formatDisplayTime(oracleState.updatedAt) : "--";
  }
  if (oracleElements.next) oracleElements.next.textContent = oracleState.running ? t("benchmark.running") : formatRelativeTime(oracleState.nextAutoAt);
  if (oracleElements.run) oracleElements.run.disabled = oracleState.running;
}

function oracleRowHtml(item, index, maxLatency, compact) {
  const region = item.region;
  const value = item.mean;
  const pct = value && maxLatency ? Math.max(5, Math.min(100, Math.round((value / maxLatency) * 100))) : 0;
  const status = item.result.pending ? "pending" : value ? latencyClass(value) : item.result.failed ? "failed" : "pending";
  const label = value ? value + "ms" : item.result.failed ? t("oracle.failed") : "--";
  const city = region.text2 ? region.text2 : region.text1;
  const details = compact ? region.code : region.text1 + " / " + region.code;

  return htmlTag("div", "class=\"oracle-row " + status + "\"",
    htmlTag("span", "class=\"oracle-rank\"", String(index + 1).padStart(2, "0")) +
    htmlTag("span", "class=\"oracle-region\"", htmlTag("strong", "", escapeHtml(city)) + htmlTag("small", "", escapeHtml(details))) +
    htmlTag("span", "class=\"oracle-latency\"", escapeHtml(label)) +
    htmlTag("i", "class=\"oracle-bar\"", htmlTag("b", "style=\"width:" + pct + "%\"", ""))
  );
}

function renderOraclePing() {
  if (!oracleElements.list) return;
  const stats = oracleRegions.map(oracleStats);
  const measured = stats.filter((item) => item.mean !== null).sort((a, b) => a.mean - b.mean);
  const maxLatency = Math.max(1, ...measured.map((item) => item.mean || 0));
  const ordered = measured.concat(stats.filter((item) => item.mean === null));

  renderOracleSummary(stats);
  if (oracleElements.top) {
    oracleElements.top.innerHTML = measured.length
      ? measured.slice(0, 6).map((item, index) => oracleRowHtml(item, index, maxLatency, true)).join("")
      : htmlTag("div", "class=\"benchmark-empty\"", escapeHtml(t("oracle.noSamples")));
  }
  oracleElements.list.innerHTML = ordered.map((item, index) => oracleRowHtml(item, index, maxLatency, false)).join("");
}

async function startOraclePing() {
  if (oracleState.running || !oracleElements.list) return;
  const runId = oracleState.runId + 1;
  oracleState.runId = runId;
  oracleState.running = true;
  oracleState.completed = 0;
  oracleState.updatedAt = null;
  oracleState.results = new Map(oracleRegions.map((region) => [region.code, { values: [], failed: 0, pending: true }]));
  renderOraclePing();

  let cursor = 0;
  async function worker() {
    while (cursor < oracleRegions.length && oracleState.runId === runId) {
      const region = oracleRegions[cursor];
      cursor += 1;
      const elapsed = await pingOracleRegion(region);
      const result = oracleState.results.get(region.code) || { values: [], failed: 0, pending: true };
      result.pending = false;
      if (elapsed) result.values.push(elapsed);
      else result.failed += 1;
      oracleState.results.set(region.code, result);
      oracleState.completed += 1;
      renderOraclePing();
    }
  }

  await Promise.all([worker(), worker(), worker(), worker(), worker()]);
  if (oracleState.runId === runId) {
    oracleState.running = false;
    oracleState.updatedAt = new Date();
    oracleState.nextAutoAt = new Date(Date.now() + oracleAutoIntervalMs);
    renderOraclePing();
  }
}

function initializeOraclePing() {
  if (!oracleElements.list) return;
  oracleState.nextAutoAt = new Date(Date.now() + oracleAutoIntervalMs);
  renderOraclePing();
  if (oracleElements.run) oracleElements.run.addEventListener("click", () => startOraclePing());
  if (currentRoute() === "monitor") window.setTimeout(() => startOraclePing(), 700);
  window.setInterval(() => {
    if (currentRoute() === "monitor" && !oracleState.running) startOraclePing();
  }, oracleAutoIntervalMs);
  window.setInterval(() => {
    if (currentRoute() === "monitor") renderOraclePing();
  }, 30000);
}

function startPointerEffects() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raf = 0;
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let glowX = pointerX;
  let glowY = pointerY;
  let lastTarget = null;
  const interactiveSelector = ".route-card, .service-card, .monitor-card, .benchmark-row, .benchmark-ledger div, .oracle-row, .oracle-summary div, .oracle-panel-block, .ops-grid a, .port-row, .launcher-option, .button, .nav a, .hub-node";

  function updateGlow() {
    if (!elements.cursorGlow) return;
    glowX += (pointerX - glowX) * 0.18;
    glowY += (pointerY - glowY) * 0.18;
    elements.cursorGlow.style.transform = "translate3d(" + glowX + "px," + glowY + "px,0) translate(-50%, -50%)";
    raf = requestAnimationFrame(updateGlow);
  }

  function resetCard(target) {
    if (!target) return;
    target.style.setProperty("--rx", "0deg");
    target.style.setProperty("--ry", "0deg");
    target.style.setProperty("--card-x", "50%");
    target.style.setProperty("--card-y", "50%");
  }

  function onPointerMove(event) {
    pointerX = event.clientX;
    pointerY = event.clientY;
    document.documentElement.style.setProperty("--pointer-x", pointerX + "px");
    document.documentElement.style.setProperty("--pointer-y", pointerY + "px");

    const target = event.target.closest(interactiveSelector);
    if (target !== lastTarget) {
      resetCard(lastTarget);
      lastTarget = target;
    }
    if (!target || reduceMotion) return;

    const rect = target.getBoundingClientRect();
    const localX = ((event.clientX - rect.left) / rect.width) * 100;
    const localY = ((event.clientY - rect.top) / rect.height) * 100;
    const rotateY = ((localX - 50) / 50) * 3.2;
    const rotateX = -((localY - 50) / 50) * 3.2;
    target.style.setProperty("--card-x", localX.toFixed(2) + "%");
    target.style.setProperty("--card-y", localY.toFixed(2) + "%");
    target.style.setProperty("--rx", rotateX.toFixed(2) + "deg");
    target.style.setProperty("--ry", rotateY.toFixed(2) + "deg");
  }

  function onPointerOut(event) {
    const target = event.target.closest(interactiveSelector);
    if (target && !target.contains(event.relatedTarget)) resetCard(target);
  }

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("pointerout", onPointerOut, true);
  if (!reduceMotion) raf = requestAnimationFrame(updateGlow);

  return () => {
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerout", onPointerOut, true);
    cancelAnimationFrame(raf);
  };
}

function startPixelTrail() {
  const canvas = elements.pixelTrail;
  if (!canvas) return () => {};
  const context = canvas.getContext("2d");
  if (!context) return () => {};

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return () => {};

  const particles = [];
  let width = 0;
  let height = 0;
  let ratio = window.devicePixelRatio || 1;
  let raf = 0;
  let lastX = window.innerWidth / 2;
  let lastY = window.innerHeight / 2;

  function resize() {
    ratio = window.devicePixelRatio || 1;
    width = canvas.width = Math.floor(window.innerWidth * ratio);
    height = canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    context.imageSmoothingEnabled = false;
  }

  function pushParticle(x, y, size, life, vx, vy, alpha) {
    particles.push({
      x: x * ratio,
      y: y * ratio,
      size: size * ratio,
      life,
      maxLife: life,
      vx: vx * ratio,
      vy: vy * ratio,
      alpha,
    });
  }

  function onPointerMove(event) {
    const x = event.clientX;
    const y = event.clientY;
    const dx = x - lastX;
    const dy = y - lastY;
    const distance = Math.max(1, Math.hypot(dx, dy));
    const steps = Math.min(14, Math.max(3, Math.floor(distance / 7)));

    for (let step = 0; step < steps; step += 1) {
      const t = step / steps;
      const px = lastX + dx * t;
      const py = lastY + dy * t;
      const jitterX = (Math.random() - 0.5) * 10;
      const jitterY = (Math.random() - 0.5) * 10;
      const size = 4 + Math.floor(Math.random() * 3);
      pushParticle(px + jitterX, py + jitterY, size, 30 + Math.random() * 24, (Math.random() - 0.5) * 0.28, (Math.random() - 0.5) * 0.28, 0.82 + Math.random() * 0.18);
    }

    pushParticle(x, y, 9, 24, 0, 0, 1);
    if (particles.length > 560) particles.splice(0, particles.length - 560);
    lastX = x;
    lastY = y;
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    for (let index = particles.length - 1; index >= 0; index -= 1) {
      const particle = particles[index];
      particle.life -= 1;
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.life <= 0) {
        particles.splice(index, 1);
        continue;
      }

      const pct = particle.life / particle.maxLife;
      const alpha = particle.alpha * pct;
      const snappedX = Math.round(particle.x / (4 * ratio)) * (4 * ratio);
      const snappedY = Math.round(particle.y / (4 * ratio)) * (4 * ratio);
      context.fillStyle = "rgba(47, 255, 142, " + alpha.toFixed(3) + ")";
      context.fillRect(snappedX, snappedY, particle.size, particle.size);
      if (pct > 0.34) {
        context.fillStyle = "rgba(209, 255, 229, " + (alpha * 0.42).toFixed(3) + ")";
        context.fillRect(snappedX, snappedY, Math.max(1, particle.size / 2), Math.max(1, particle.size / 2));
      }
      if (pct > 0.72) {
        context.fillStyle = "rgba(86, 216, 255, " + (alpha * 0.22).toFixed(3) + ")";
        context.fillRect(snappedX + 2 * ratio, snappedY + 2 * ratio, Math.max(1, particle.size / 3), Math.max(1, particle.size / 3));
      }
    }
    raf = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  raf = requestAnimationFrame(draw);

  return () => {
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointerMove);
    cancelAnimationFrame(raf);
  };
}

function startMesh() {
  const canvas = $("#mesh");
  if (!canvas) return () => {};
  const context = canvas.getContext("2d");
  if (!context) return () => {};

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const blocks = [];
  const lanes = [];
  let width = 0;
  let height = 0;
  let ratio = 1;
  let raf = 0;
  let frame = 0;
  let seed = 8790;

  function random() {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  }

  function snap(value, grid) {
    return Math.round(value / grid) * grid;
  }

  function resize() {
    ratio = window.devicePixelRatio || 1;
    width = canvas.width = Math.floor(window.innerWidth * ratio);
    height = canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    context.imageSmoothingEnabled = false;
    blocks.length = 0;
    lanes.length = 0;
    seed = 8790;

    const grid = 10 * ratio;
    const count = Math.max(520, Math.min(1500, Math.floor((window.innerWidth * window.innerHeight) / 980)));
    for (let index = 0; index < count; index += 1) {
      const x = snap(random() * width, grid);
      const y = snap(random() * height, grid);
      const sizeRoll = random();
      const accentRoll = random();
      const base = sizeRoll < 0.68 ? 2 : sizeRoll < 0.92 ? 3 : 5;
      const yRatio = y / Math.max(1, height);
      const xRatio = x / Math.max(1, width);
      const greenBias = yRatio > 0.74 ? 0.075 : yRatio > 0.48 && xRatio > 0.22 && xRatio < 0.78 ? 0.038 : 0.006;
      blocks.push({
        x,
        y,
        size: base * ratio,
        alpha: 0.08 + random() * 0.32,
        phase: random() * Math.PI * 2,
        drift: (random() < 0.5 ? -1 : 1) * (0.025 + random() * 0.07) * ratio,
        tone: accentRoll < greenBias ? "green" : accentRoll < greenBias + 0.014 ? "blue" : "gray",
      });
    }

    const bandRatios = [0.045, 0.12, 0.47, 0.535, 0.61, 0.745, 0.905];
    for (const band of bandRatios) {
      const y = snap(height * band + (random() - 0.5) * 18 * ratio, grid);
      const greenChance = band > 0.84 ? 0.22 : band > 0.46 && band < 0.66 ? 0.12 : 0.018;
      for (let x = -140 * ratio + random() * 48 * ratio; x < width + 140 * ratio;) {
        const gap = (10 + random() * 30) * ratio;
        const segmentWidth = snap((18 + random() * (band > 0.46 ? 86 : 58)) * ratio, 4 * ratio);
        const toneRoll = random();
        lanes.push({
          x: snap(x, 2 * ratio),
          y,
          width: segmentWidth,
          height: (random() < 0.28 ? 4 : 2) * ratio,
          alpha: 0.12 + random() * 0.24,
          phase: random() * Math.PI * 2,
          speed: (random() < 0.5 ? -1 : 1) * (0.018 + random() * 0.034) * ratio,
          tone: toneRoll < greenChance ? "green" : toneRoll < greenChance + 0.014 ? "blue" : "gray",
        });
        x += segmentWidth + gap;
      }
    }
  }

  function setPixelFill(tone, alpha) {
    if (tone === "green") context.fillStyle = "rgba(47, 255, 142, " + Math.min(0.58, alpha + 0.08).toFixed(3) + ")";
    else if (tone === "blue") context.fillStyle = "rgba(84, 217, 255, " + Math.min(0.46, alpha + 0.04).toFixed(3) + ")";
    else context.fillStyle = "rgba(150, 150, 150, " + alpha.toFixed(3) + ")";
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    frame += reduceMotion ? 0 : 1;

    for (const block of blocks) {
      if (!reduceMotion) block.y += block.drift;
      if (block.y < -12 * ratio) block.y = height + 12 * ratio;
      if (block.y > height + 12 * ratio) block.y = -12 * ratio;

      const pulse = 0.74 + Math.sin(frame * 0.018 + block.phase) * 0.26;
      setPixelFill(block.tone, Math.max(0.04, block.alpha * pulse));
      context.fillRect(snap(block.x, 2 * ratio), snap(block.y, 2 * ratio), block.size, block.size);
    }

    for (const lane of lanes) {
      if (!reduceMotion) lane.x += lane.speed;
      if (lane.x < -180 * ratio) lane.x = width + 120 * ratio;
      if (lane.x > width + 180 * ratio) lane.x = -120 * ratio;

      const pulse = 0.76 + Math.sin(frame * 0.026 + lane.phase) * 0.24;
      setPixelFill(lane.tone, Math.max(0.05, lane.alpha * pulse));
      context.fillRect(snap(lane.x, 2 * ratio), snap(lane.y, 2 * ratio), lane.width, lane.height);
    }

    if (!reduceMotion) raf = requestAnimationFrame(draw);
  }

  function onResize() {
    resize();
    draw();
  }

  resize();
  draw();
  window.addEventListener("resize", onResize);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", onResize);
  };
}

if (elements.grid) {
  elements.grid.addEventListener("click", (event) => {
    if (event.target.closest(".local-disabled")) event.preventDefault();
  });
  elements.grid.addEventListener("pointerover", (event) => {
    const card = event.target.closest("[data-service-id]");
    if (card) setSelected(card.dataset.serviceId);
  });
  elements.grid.addEventListener("focusin", (event) => {
    const card = event.target.closest("[data-service-id]");
    if (card) setSelected(card.dataset.serviceId);
  });
}

elements.languageButtons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.langOption)));
elements.statusButtons.forEach((button) => button.addEventListener("click", () => refreshHealth({ manual: true })));
if (monitorElements.services) {
  monitorElements.services.addEventListener("click", (event) => {
    const button = event.target.closest("[data-restart-service]");
    if (!button) return;
    button.disabled = true;
    button.textContent = t("health.restarting");
    restartService(button.dataset.restartService);
  });
}
elements.launcherButtons.forEach((button) => button.addEventListener("click", openLauncher));
elements.launcherClose.addEventListener("click", closeLauncher);
elements.launcher.addEventListener("click", (event) => {
  if (event.target.matches("[data-close-launcher]")) closeLauncher();
});
elements.launcherInput.addEventListener("input", () => {
  state.query = elements.launcherInput.value;
  state.selectedIndex = 0;
  renderLauncher();
});
elements.launcherInput.addEventListener("keydown", (event) => {
  const results = filteredItems();
  if (event.key === "ArrowDown") {
    event.preventDefault();
    state.selectedIndex = results.length ? (state.selectedIndex + 1) % results.length : 0;
    renderLauncher();
  }
  if (event.key === "ArrowUp") {
    event.preventDefault();
    state.selectedIndex = results.length ? (state.selectedIndex - 1 + results.length) % results.length : 0;
    renderLauncher();
  }
  if (event.key === "Enter" && results[state.selectedIndex]) {
    event.preventDefault();
    openItem(results[state.selectedIndex]);
  }
  if (event.key === "Escape") {
    event.preventDefault();
    closeLauncher();
  }
});
elements.launcherResults.addEventListener("pointerover", (event) => {
  const option = event.target.closest("[data-index]");
  if (!option) return;
  state.selectedIndex = Number(option.dataset.index);
  renderLauncher();
});
elements.launcherResults.addEventListener("click", (event) => {
  const option = event.target.closest("[data-index]");
  if (!option) return;
  const item = filteredItems()[Number(option.dataset.index)];
  if (item) openItem(item);
});
elements.launcherPreview.addEventListener("click", (event) => {
  if (!event.target.closest("[data-open-active]")) return;
  const item = filteredItems()[state.selectedIndex];
  if (item) openItem(item);
});
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if ((event.metaKey || event.ctrlKey) && key === "k") {
    event.preventDefault();
    openLauncher();
  }
  if (event.key === "Escape" && state.launcherOpen) {
    event.preventDefault();
    closeLauncher();
  }
});

function renderShell() {
  applyRoute();
  applyLanguageState();
  updateBrandContent();
  renderHeroTerminal();
  renderTicker();
  renderOpsLinks();
  renderRoutes();
  renderHubLinks();
  renderServices();
  renderDetail();
  updateClock();
}

async function initialize() {
  renderShell();
  startPointerEffects();
  startPixelTrail();
  startMesh();
  await loadPortalConfig();
  renderShell();
  refreshStatus();
  refreshMonitor();
  initializeOraclePing();
  setInterval(updateClock, 1000);
  setInterval(refreshStatus, 8000);
  setInterval(refreshMonitor, 3000);
}

initialize().catch((error) => {
  console.error(error);
  renderShell();
});
