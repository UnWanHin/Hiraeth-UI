#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { basename } from "node:path";

const rawPath = process.argv[2];

if (!rawPath) {
  console.error("usage: parse-yabs.mjs <raw-yabs-log>");
  process.exit(2);
}

const text = readFileSync(rawPath, "utf8");
const lines = text.replace(/\r/g, "\n").split(/\n/);

function clean(value, maxLength = 160) {
  return String(value ?? "")
    .replace(/\x1b\[[0-9;]*m/g, "")
    .replace(/\x1b\[[0-9;?]*[A-Za-z]/g, "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function field(label) {
  const pattern = new RegExp("^\\s*" + escapeRegExp(label) + "\\s*:\\s*(.+?)\\s*$", "mi");
  const match = text.match(pattern);
  return clean(match?.[1] || "");
}

function firstMatch(pattern) {
  const match = text.match(pattern);
  return clean(match?.[1] || "");
}

function firstNumber(value) {
  const match = String(value || "").replace(/,/g, "").match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function score(label) {
  return firstNumber(firstMatch(new RegExp("^\\s*" + escapeRegExp(label) + "\\s*\\|\\s*([0-9,]+)", "mi")));
}

function cells(line) {
  return String(line).split("|").map((item) => clean(item, 120));
}

function parseDiskTables() {
  const rows = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = clean(lines[index], 240);
    if (!line.startsWith("Block Size") || !line.includes("|")) continue;

    const headers = cells(line).slice(1).filter(Boolean);
    let read = [];
    let write = [];
    let total = [];

    for (let offset = 1; offset <= 8 && index + offset < lines.length; offset += 1) {
      const nextLine = clean(lines[index + offset], 240);
      if (nextLine.startsWith("Block Size")) break;
      if (!nextLine.includes("|")) break;
      const row = cells(nextLine);
      const key = (row[0] || "").toLowerCase();
      if (key === "read" && !read.length) read = row;
      if (key === "write" && !write.length) write = row;
      if (key === "total" && !total.length) total = row;
    }

    headers.forEach((header, headerIndex) => {
      const item = {
        name: header,
        read: read[headerIndex + 1] || "",
        write: write[headerIndex + 1] || "",
        total: total[headerIndex + 1] || "",
      };
      if (item.read || item.write || item.total) rows.push(item);
    });
  }

  return rows.slice(0, 16);
}

function parseNetworkTables() {
  const rows = [];
  const seen = new Set();

  function push(row) {
    const key = [row.provider, row.location, row.send, row.receive, row.latency].join("|");
    if (seen.has(key)) return;
    seen.add(key);
    rows.push(row);
  }

  const ooklaDownload = firstMatch(/^\s*Download:\s*(.+?)\s*$/mi);
  const ooklaUpload = firstMatch(/^\s*Upload:\s*(.+?)\s*$/mi);
  const ooklaLatency = firstMatch(/^\s*(?:Idle )?Latency:\s*(.+?)\s*$/mi);
  const ooklaServer = firstMatch(/^\s*Server:\s*(.+?)\s*$/mi);
  if (ooklaDownload || ooklaUpload) {
    push({
      provider: "Ookla",
      location: ooklaServer || field("Location") || "speedtest",
      send: ooklaUpload,
      receive: ooklaDownload,
      latency: ooklaLatency,
    });
  }

  for (const line of lines) {
    if (!line.includes("|")) continue;
    const row = cells(line);
    if (row.length < 5) continue;

    const first = (row[0] || "").toLowerCase();
    const joined = row.join(" ").toLowerCase();
    const badHeader = first.includes("provider") || first.includes("block size") || first.includes("test") || /^-+$/.test(first);
    const hasSpeed = /bits\/sec|bytes\/sec|bit\/s|bps|mbps|gbps|kbits|mbits|gbits/i.test(row[2] + " " + row[3]);
    const hasLatency = /\bms\b|\d+\.\d+s\b/i.test(row[4] || "");

    if (badHeader || joined.includes("geekbench") || (!hasSpeed && !hasLatency)) continue;

    push({
      provider: row[0],
      location: row[1].replace(/\s+/g, " "),
      send: row[2],
      receive: row[3],
      latency: row[4],
    });
  }

  return rows.slice(0, 24);
}

const cpuCoresLine = field("CPU Cores");
const network = parseNetworkTables();
const disk = parseDiskTables();
const singleCore = score("Single Core");
const multiCore = score("Multi Core");
const summaryParts = [];

if (network.length) summaryParts.push(network.length + " network nodes");
if (disk.length) summaryParts.push(disk.length + " disk profiles");
if (singleCore || multiCore) summaryParts.push("Geekbench parsed");

const output = {
  updatedAt: new Date().toISOString(),
  status: "ready",
  source: "YABS",
  summary: summaryParts.length ? "Imported " + summaryParts.join(", ") + "." : "YABS raw log imported. Parser found limited structured data.",
  system: {
    os: field("Distro") || field("OS"),
    kernel: field("Kernel"),
    virtualization: field("VM Type") || field("Virtualization"),
    location: field("Location") || field("Region"),
    isp: field("ISP"),
    asn: field("ASN"),
    host: field("Host"),
    country: field("Country"),
  },
  cpu: {
    model: field("CPU Model") || field("Processor"),
    cores: firstNumber(cpuCoresLine),
    singleCore,
    multiCore,
    fullTest: firstMatch(/^\s*Full Test\s*\|\s*(https?:\/\/\S+)/mi),
  },
  memory: {
    total: field("Total Mem") || field("Memory") || field("RAM"),
    swap: field("Total Swap") || field("Swap"),
  },
  disk,
  network,
  raw: {
    path: "data/" + basename(rawPath),
    note: "Raw YABS log is stored locally and ignored by git.",
  },
};

process.stdout.write(JSON.stringify(output, null, 2) + "\n");
