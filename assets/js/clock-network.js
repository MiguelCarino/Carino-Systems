// i18n bridge — i18n.js is deferred and this file is not, so window.t does not
// exist yet at parse time; resolve it lazily on each call. Falls back to the
// English key, which is exactly what the dictionary is keyed on.
// (Named `tt` because several functions below shadow `t` with a timeout id.)
function tt(s) { return (typeof window.t === 'function') ? window.t(s) : s; }
let battListenersBound = false;

// CONFIGURATION: SPEED TEST FILES
const TEST_FILE_SMALL = "https://raw.githubusercontent.com/MiguelCarino/Carino-Systems/refs/heads/main/assets/files/sample_1mb";
const TEST_FILE_LARGE = "https://raw.githubusercontent.com/MiguelCarino/Carino-Systems/refs/heads/main/assets/files/sample_25mb";


// MODULE: TIME & GREETING
const GREETINGS = {
  morning: [
    "Good Morning, Boss.",
    "おはようございます、組長。",
    "Buenos días, Jefe.",
    "Доброе утро, Босс.",
    "좋은 아침입니다, 보스님.",
    "早上好，老大。",
    "Καλημέρα, Αρχηγέ.",
    "ᐅᓪᓛᒃᑯᑦ, ᐊᖓᔪᖅᑳᖅ.",
    "בוקר טוב, בוס.",
    "Buongiorno, Capo.",
    "Bonjour, Chef.",
    "Bom dia, Chefe."
  ],

  afternoon: [
    "Good Afternoon, Boss.",
    "こんにちは、組長。",
    "Buenas tardes, Jefe.",
    "Добрый день, Босс.",
    "좋은 오후입니다, 보스님.",
    "下午好，老大。",
    "Καλό απόγευμα, Αρχηγέ.",
    "ᐅᓐᓄᓴᒃᑯᑦ, ᐊᖓᔪᖅᑳᖅ.",
    "צהריים טובים, בוס.",
    "Buon pomeriggio, Capo.",
    "Bon après-midi, Chef.",
    "Boa tarde, Chefe."
  ],

  evening: [
    "Good Evening, Boss.",
    "こんばんは、組長。",
    "Buenas tardes, Jefe.",
    "Добрый вечер, Босс.",
    "좋은 저녁입니다, 보스님.",
    "晚上好，老大。",
    "Καλησπέρα, Αρχηγέ.",
    "ᐅᓐᓄᒃᑯᑦ, ᐊᖓᔪᖅᑳᖅ.",
    "ערב טוב, בוס.",
    "Buonasera, Capo.",
    "Bonsoir, Chef.",
    "Boa noite, Chefe."
  ],

  night: [
    "Good Night, Boss.",
    "おやすみなさい、組長。",
    "Buenas noches, Jefe.",
    "Спокойной ночи, Босс.",
    "안녕히 주무세요, 보스님.",
    "晚安，老大。",
    "Καληνύχτα, Αρχηγέ.",
    "ᐅᓐᓄᐊᒃᑯᑦ, ᐊᖓᔪᖅᑳᖅ.",
    "לילה טוב, בוס.",
    "Buonanotte, Capo.",
    "Bonne nuit, Chef.",
    "Boa noite, Chefe."
  ]
};

let greetLangIndex = 0;
let greetPeriod = null;
// The header clock (Local/UTC/Epoch/TAI/.beats + click-to-cycle) is owned by
// the shared module carino-clock.js. This file only keeps the greeting and the
// Sys-Status diagnostics rows fresh.

function getGreetPeriod(hrs) {
  if (hrs >= 5 && hrs < 12) return 'morning';
  if (hrs >= 12 && hrs < 18) return 'afternoon';
  if (hrs >= 18 && hrs < 22) return 'evening';
  return 'night';
}

function fadeSetText(el, text) {
  el.style.opacity = '0';
  setTimeout(() => { el.textContent = text; el.style.opacity = '1'; }, 500);
}

function updateTime() {
  const now = new Date();

  const elUTC = document.getElementById('clockUTC');
  const elEpoch = document.getElementById('clockEpoch');
  const elGreet = document.getElementById('greeting');
  const elLastCheck = document.getElementById('lastCheck');

  // clockLocal / tzName (the header clock) are owned by carino-clock.js — here we
  // only refresh the diagnostics dropdown rows.
  if(elUTC) elUTC.textContent = now.toISOString().substring(11, 19) + 'Z';
  if(elEpoch) elEpoch.textContent = Math.floor(now.getTime() / 1000);
  if(elLastCheck) elLastCheck.textContent = now.toLocaleTimeString('en-US', { hour12: false, second: 'numeric' });

  if(elGreet) {
    const period = getGreetPeriod(now.getHours());
    if (period !== greetPeriod) {
      greetPeriod = period;
      greetLangIndex = 0;
      elGreet.textContent = GREETINGS[period][0];
      elGreet.style.opacity = '1';
    }
  }
}
setInterval(updateTime, 1000);
updateTime();

setInterval(() => {
  const elGreet = document.getElementById('greeting');
  if (!elGreet || !greetPeriod) return;
  greetLangIndex = (greetLangIndex + 1) % 12;
  fadeSetText(elGreet, GREETINGS[greetPeriod][greetLangIndex]);
}, 5000);


// MODULE: SYSTEM & HARDWARE DETECTION
const $ = (id) => document.getElementById(id);

async function detectSystem() {
  const ua = navigator.userAgent;
  let os = "Unknown";
  let browser = "Browser";
  let browserVersion = "";
  let arch = "";

  // 1. OS DETECTION
  if (ua.includes("Win")) os = "Windows";
  else if (ua.includes("Mac")) os = "macOS";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Linux")) {
    if (ua.includes("Fedora")) os = "Fedora";
    else if (ua.includes("Ubuntu")) os = "Ubuntu";
    else if (ua.includes("Debian")) os = "Debian";
    else if (ua.includes("Arch")) os = "Arch";
    else if (ua.includes("Gentoo")) os = "Gentoo";
    else if (ua.includes("NixOS")) os = "NixOS";
    else os = "Linux";
  }

  // 2. BROWSER DETECTION
  const isBrave = (navigator.brave && await navigator.brave.isBrave()) || false;

  if (isBrave) {
    browser = "Brave";
    const match = ua.match(/Chrome\/(\d+\.\d+)/); 
    if (match) browserVersion = match[1];
  } else if (ua.includes("CriOS")) {
    browser = "Chrome iOS";
    const match = ua.match(/CriOS\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes("FxiOS")) {
    browser = "Firefox iOS";
    const match = ua.match(/FxiOS\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes("Edg")) {
    browser = "Edge";
    const match = ua.match(/Edg\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes("Chrome") && !ua.includes("Chromium")) {
    browser = "Chrome";
    const match = ua.match(/Chrome\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes("Chromium")) {
    browser = "Chromium";
    const match = ua.match(/Chromium\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes("Firefox")) {
    browser = "Firefox";
    const match = ua.match(/Firefox\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes("Safari")) {
    browser = "Safari";
    const match = ua.match(/Version\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  }

  // 3. ARCHITECTURE
  if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
    try {
      const uaData = await navigator.userAgentData.getHighEntropyValues(["architecture", "bitness"]);
      if (uaData.architecture) arch = ` ${uaData.architecture}`;
      if (uaData.bitness) arch += ` ${uaData.bitness}-bit`;
    } catch(e) {}
  } else {
    if (ua.includes("WOW64") || ua.includes("Win64") || ua.includes("x86_64")) arch = " x64";
    else if (ua.includes("arm")) arch = " arm";
  }

  const versionText = browserVersion ? ` v${browserVersion}` : '';
  const el = $('sysClient');
  if(el) el.textContent = `${browser}${versionText} on ${os} [${arch.trim()}]`;

  // 4. CPU CORES
  const elCPU = $('sysCPU');
  if(elCPU) {
    const cores = navigator.hardwareConcurrency;
    elCPU.textContent = cores ? `${cores} ` + tt("Logical Cores") : tt("Unknown (Masked)");
  }

  // 4b. RAM
  const elRAM = $('sysRAM');
  if(elRAM) {
    const ram = navigator.deviceMemory;
    elRAM.textContent = ram ? `~${ram} GB` : tt("Masked");
  }

  // 5. DISPLAY
  const elScreen = $('sysScreen');
  if(elScreen) {
    const w = window.screen.width;
    const h = window.screen.height;
    const dpr = window.devicePixelRatio || 1;
    elScreen.textContent = `${w}x${h} (${dpr.toFixed(1)}x)`;
  }

  // 5b. BATTERY
  const elBatt = $('sysBattery');
  if(elBatt) {
    if ('getBattery' in navigator) {
      try {
        const batt = await navigator.getBattery();
        const fmt = (b) => `${Math.round(b.level * 100)}% — ${b.charging ? tt('Charging') : tt('On battery')}`;
        elBatt.textContent = fmt(batt);
        // detectSystem() re-runs on a language switch; bind the battery events
        // only on the first pass so switching languages never stacks listeners.
        if (!battListenersBound) {
          battListenersBound = true;
          batt.addEventListener('levelchange',   () => { elBatt.textContent = fmt(batt); });
          batt.addEventListener('chargingchange', () => { elBatt.textContent = fmt(batt); });
        }
      } catch(e) { elBatt.textContent = tt("N/A"); }
    } else { elBatt.textContent = tt("N/A"); }
  }

  // 5c. CONNECTION TYPE
  const elConn = $('sysConn');
  if(elConn) {
    const conn = navigator.connection;
    if(conn) {
      const type = (conn.type && conn.type !== 'unknown') ? conn.type : (conn.effectiveType || null);
      elConn.textContent = type ? type.toUpperCase() : tt("Unknown");
    } else {
      elConn.textContent = tt("N/A");
    }
  }

  // 6. GPU
  const elGPU = document.getElementById('sysGPU');
  if (!elGPU) return;

  const safeSet = (main, sub, title) => {
    elGPU.textContent = "";
    elGPU.style.lineHeight = "1.2";
    elGPU.style.textAlign = "right";
    if (title) elGPU.title = title;

    const mainSpan = document.createElement("span");
    mainSpan.textContent = main || "Unknown GPU";

    const subSpan = document.createElement("span");
    subSpan.textContent = sub || "";
    subSpan.style.fontSize = "0.75em";
    subSpan.style.opacity = "0.7";
    subSpan.style.display = "block";
    subSpan.style.marginTop = "2px";

    elGPU.appendChild(mainSpan);
    if (sub) elGPU.appendChild(subSpan);
  };

  const tryGetGL = () => {
    const canvas = document.createElement("canvas");
    // Avoid huge canvases; we just need a context + parameters.
    const opts = { powerPreference: "high-performance" };
    return (
      canvas.getContext("webgl2", opts) ||
      canvas.getContext("webgl", opts) ||
      canvas.getContext("experimental-webgl", opts) ||
      null
    );
  };

  const stripParens = (s) => {
    // Remove parenthetical parts: "Foo (bar)" -> "Foo"
    // Keeps you from getting long backend strings in the "clean" name.
    let out = "", depth = 0;
    for (const ch of s) {
      if (ch === "(") depth++;
      else if (ch === ")") depth = Math.max(0, depth - 1);
      else if (depth === 0) out += ch;
    }
    return out.replace(/\s+/g, " ").trim();
  };

  const normalizeName = (s) => {
    if (!s) return "";
    return s
      .replace(/\/PCIe\/SSE2/gi, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const parseANGLE = (raw) => {
    // Example patterns:
    // "ANGLE (NVIDIA, NVIDIA GeForce RTX 4090 (0x2684) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    // "ANGLE (Apple, Apple M2, Metal)"
    const m = raw.match(/^ANGLE\s*\((.+)\)\s*$/);
    if (!m) return null;

    const parts = m[1].split(/,\s*/g).map(p => p.trim()).filter(Boolean);
    // Usually: vendor, renderer, api/backend...
    const vendor = parts[0] || "";
    let device = parts[1] || parts[0] || "";
    let api = parts.slice(2).join(", ");

    // Clean D3D shader suffixes if present
    device = device.replace(/\s(vs|ps|gs|ds|es|cs)_\d_\d/gi, "").trim();

    return { vendor, device, api };
  };

  const classifyGPU = (vendorRaw, rendererRaw) => {
    const s = `${vendorRaw} ${rendererRaw}`.toLowerCase();

    // Software-ish
    if (s.includes("swiftshader") || s.includes("llvmpipe") || s.includes("soft") || s.includes("software"))
      return "Software";

    // Integrated-ish
    if (
      s.includes("intel") || s.includes("uhd") || s.includes("iris") ||
      s.includes("apple") || s.includes("m1") || s.includes("m2") || s.includes("m3") ||
      s.includes("adreno") || s.includes("mali") || s.includes("powervr") ||
      s.includes("radeon graphics") // AMD iGPU branding on some systems
    ) return "Integrated";

    // Discrete-ish
    if (
      s.includes("nvidia") || s.includes("geforce") || s.includes("quadro") || s.includes("rtx") || s.includes("gtx") ||
      s.includes("amd") || s.includes("radeon") || s.includes("rx ") || s.includes("vega") ||
      s.includes("arc ") // Intel Arc (discrete)
    ) return "Discrete";

    return "Unknown";
  };

  try {
    const gl = tryGetGL();
    if (!gl) {
      safeSet("WebGL Disabled", "", "");
      return;
    }

    // 1) Prefer unmasked renderer/vendor; fall back to standard RENDERER/VENDOR
    let vendor = "";
    let renderer = "";
    try {
      const dbg = gl.getExtension("WEBGL_debug_renderer_info");
      if (dbg) {
        vendor   = gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL)   || "";
        renderer = gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || "";
      }
    } catch(e) {}
    // Standard params always available (Firefox prefers these now)
    const maskedRenderer = gl.getParameter(gl.RENDERER) || "";
    const maskedVendor   = gl.getParameter(gl.VENDOR)   || "";
    const raw      = renderer || maskedRenderer || "Unknown";
    const rawVendor = vendor  || maskedVendor   || "";

    // 3) ANGLE parsing (if present)
    let cleanName = raw;
    let backend = "";
    const angle = parseANGLE(raw);
    if (angle) {
      cleanName = angle.device || cleanName;
      backend = angle.api ? `ANGLE (${angle.api})` : "ANGLE";
    } else if (/swiftshader/i.test(raw)) {
      backend = "Software rasterizer";
    }

    cleanName = normalizeName(stripParens(cleanName));

    // 4) Limits
    const maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE);

    // 5) Type
    const gpuType = classifyGPU(rawVendor, raw);

    // 6) Render
    const sub = [
      `[${gpuType}]`,
      backend || "",
      `Tex: ${maxTex}`
    ].filter(Boolean).join(" | ");

    // Put the “full raw string” in title for hover inspection
    const title = [rawVendor && `Vendor: ${rawVendor}`, `Renderer: ${raw}`].filter(Boolean).join("\n");
    safeSet(cleanName || "Unknown GPU", sub, title);
  } catch (e) {
    safeSet("Error", "", "");
  }
}

// MODULE: NETWORK, PING & SPEED

async function fetchJSON(url, { timeoutMs = 4000 } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { mode: "cors", signal: ctrl.signal, cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally { clearTimeout(t); }
}

async function tryProviders(getters) {
  const errors = [];
  for (const g of getters) {
    try { return await g(); }
    catch (e) { errors.push(e.message || String(e)); }
  }
  throw new Error(errors.join(" | "));
}

async function detectIPs() {
  const ipv4 = $('ipv4'); const ipv6 = $('ipv6');
  const dot4 = $('dot4'); const dot6 = $('dot6');

  if(ipv4) ipv4.textContent = "..."; 
  if(ipv6) ipv6.textContent = "...";
  if(dot4) dot4.className = "status-dot scanning"; 
  if(dot6) dot6.className = "status-dot scanning";

  const v6Promise = tryProviders([
    async () => (await fetchJSON("https://api6.ipify.org?format=json")).ip,
    async () => (await fetchJSON("https://api64.ipify.org?format=json")).ip,
    async () => (await fetchJSON("https://ipapi.co/json/")).ip,
  ]);

  const v4Promise = tryProviders([
    async () => (await fetchJSON("https://api4.ipify.org?format=json")).ip,
    async () => (await fetchJSON("https://api.ipify.org?format=json")).ip,
    async () => (await fetchJSON("https://ipapi.co/json/")).ip,
  ]);

  const [v6, v4] = await Promise.allSettled([v6Promise, v4Promise]);
  const isFirefox = /Firefox\//.test(navigator.userAgent);

  if (v6.status === "fulfilled" && v6.value.includes(":")) {
    if(ipv6) ipv6.textContent = v6.value;
    if(dot6) dot6.className = "status-dot success";
  } else {
    if(ipv6) ipv6.textContent = isFirefox ? "Blocked by browser" : "Not detected";
    if(dot6) dot6.className = "status-dot unknown";
  }

  if (v4.status === "fulfilled" && v4.value.includes(".")) {
    if(ipv4) ipv4.textContent = v4.value;
    if(dot4) dot4.className = "status-dot success";
  } else {
    if(ipv4) ipv4.textContent = isFirefox ? "Blocked by browser" : "Unavailable";
    if(dot4) dot4.className = isFirefox ? "status-dot unknown" : "status-dot fail";
  }
}

async function detectISP() {
  const el = $('sysISP');
  if (!el) return;
  el.textContent = "...";
  try {
    const data = await fetchJSON("https://ipapi.co/json/", { timeoutMs: 5000 });
    const org = (data.org || "").replace(/^AS\d+\s+/i, "").trim();
    el.textContent = org || "Unknown";
  } catch(e) {
    el.textContent = /Firefox\//.test(navigator.userAgent) ? "Blocked by browser" : "Unavailable";
  }
}

// === PING & JITTER ===
// A browser can't ICMP-ping, so we time HEAD requests to our own page: the RTT
// includes the HTTP stack, but it is the same overhead on every sample, so the
// *variation* between samples is still a fair jitter reading.
//   - The first sample is discarded: it pays for DNS + TCP + TLS setup and would
//     otherwise show up as one huge outlier and inflate jitter.
//   - Ping = median of the remaining samples (robust against a single stall).
//   - Jitter = mean absolute difference between CONSECUTIVE samples (the IPDV
//     mean of RFC 3550), which is what speed tests report — not the stddev.
// Requests are sequential and cache-busted so each one is a real round trip.
const PING_SAMPLES = 6;   // 1 warm-up + 5 measured

async function checkPing() {
  const el = $('pingVal');
  const elJit = $('jitterVal');
  if (el) el.textContent = tt("Testing...");
  if (elJit) elJit.textContent = "...";

  // origin+pathname, so a #hash route or existing query can't break the buster
  const base = window.location.origin + window.location.pathname;
  const samples = [];

  for (let i = 0; i < PING_SAMPLES; i++) {
    const start = performance.now();
    try {
      await fetch(`${base}?_p=${start}`, { method: 'HEAD', cache: 'no-store' });
      samples.push(performance.now() - start);
    } catch (e) { /* a dropped sample just shrinks the set */ }
  }

  const measured = samples.slice(1);   // drop the warm-up (connection setup)
  if (!measured.length) {
    if (el) el.textContent = tt("Timeout");
    if (elJit) elJit.textContent = "--";
    return;
  }

  const sorted = [...measured].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  if (el) {
    el.textContent = Math.round(median) + " ms";
    el.title = `Median of ${measured.length} HTTP HEAD round trips (warm-up discarded).\n` +
               `Samples: ${measured.map(v => Math.round(v)).join(', ')} ms`;
  }

  if (elJit) {
    if (measured.length < 2) { elJit.textContent = "--"; return; }
    let sum = 0;
    for (let i = 1; i < measured.length; i++) sum += Math.abs(measured[i] - measured[i - 1]);
    const jitter = sum / (measured.length - 1);
    elJit.textContent = (jitter < 10 ? jitter.toFixed(1) : Math.round(jitter)) + " ms";
    elJit.title = 'Mean deviation between consecutive round trips (RFC 3550 IPDV).\n' +
                  'Under ~30 ms is comfortable for calls and remote desktop; ' +
                  'high jitter with a low ping still means a choppy connection.';
  }
}

// === SMART SPEED TEST ===
function formatSpeed(bitsPerSecond) {
    const kbps = bitsPerSecond / 1000;
    const mbps = kbps / 1000;
    if (mbps >= 1) return mbps.toFixed(1) + " Mbps";
    if (kbps >= 1) return kbps.toFixed(0) + " Kbps";
    return bitsPerSecond.toFixed(0) + " bps";
}

async function performDownload(url) {
    const start = performance.now();
    const res = await fetch(url, { method: 'GET', cache: 'no-store' });
    if (!res.ok) throw new Error("Net Error");
    const blob = await res.blob();
    const duration = (performance.now() - start) / 1000;
    const bytes = blob.size;
    return { duration, bytes };
}

async function runSpeedTest() {
    const elSpeed = $('sysSpeed');
    if (!elSpeed) return;
    
    elSpeed.textContent = tt("Testing...");
    
    try {
        let result = await performDownload(TEST_FILE_SMALL);
        
        if (result.duration < 0.5) {
            elSpeed.textContent = tt("Boost Test...");
            result = await performDownload(TEST_FILE_LARGE);
        }

        if (result.duration <= 0) throw new Error("Instant");
        const bits = result.bytes * 8;
        const bps = bits / result.duration;
        elSpeed.textContent = formatSpeed(bps);

    } catch (e) {
        if (navigator.connection && navigator.connection.downlink) {
           elSpeed.textContent = "~" + navigator.connection.downlink + " Mbps (Est)";
        } else {
           elSpeed.textContent = tt("Error");
        }
    }
}

// MODULE: WEBRTC NETWORK PROBE — local IP, NAT type, interfaces, VPN/route hints
// A browser can't traceroute, can't ICMP-ping the gateway, and can't fetch an
// http:// router from an https:// page (mixed-content). The one window into the
// network's shape is WebRTC ICE candidates:
//   host  candidates = local interface addresses. Modern browsers MASK these
//                      behind a random <uuid>.local mDNS name, so a numeric LAN
//                      IP is rare — but each distinct name is still one real
//                      interface, so VPN/virtual adapters and multi-homing count
//                      even when the address itself is hidden.
//   srflx candidates = the public ip:port a STUN server sees us from — our WAN
//                      address plus the NAT's port mapping. Comparing that mapping
//                      across two STUN servers separates cone NAT (same external
//                      port = endpoint-independent) from symmetric NAT.
// Unlike the old iceServers:[] probe, adding STUN is what lets us read the WAN
// mapping and NAT behaviour instead of only (masked) host candidates.
const STUN_SERVERS = [
  'stun:stun.l.google.com:19302',
  'stun:stun.cloudflare.com:3478',
];
let _rtc = { ready: false, ts: 0, locals: [], mdns: 0, ifaces: 0, publics: [], ports: [] };
function _isPrivate(ip) {
  // RFC1918 + link-local + CGNAT (100.64/10, common on carrier/Starlink networks).
  return /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.)/.test(ip);
}

async function probeWebRTC(timeoutMs = 2500) {
  if (_rtc.ready && Date.now() - _rtc.ts < 60000) return _rtc;
  return new Promise((resolve) => {
    const locals = new Set(), mdns = new Set(), publics = new Set(), ports = new Set();
    let pc, settled = false;
    const finish = () => {
      if (settled) return; settled = true;
      try { pc && pc.close(); } catch (e) {}
      _rtc = { ready: true, ts: Date.now(),
               locals: [...locals], mdns: mdns.size, ifaces: locals.size + mdns.size,
               publics: [...publics], ports: [...ports] };
      resolve(_rtc);
    };
    try { pc = new RTCPeerConnection({ iceServers: STUN_SERVERS.map(urls => ({ urls })) }); }
    catch (e) { return finish(); }
    try { pc.createDataChannel('probe'); } catch (e) {}
    pc.onicecandidate = (e) => {
      if (!e || !e.candidate) return finish();
      // candidate:<foundation> <comp> <proto> <prio> <ADDR> <PORT> typ <type> ...
      const parts = (e.candidate.candidate || '').split(' ');
      const addr = parts[4] || '', port = +parts[5] || 0;
      const ti = parts.indexOf('typ');
      const typ = ti >= 0 ? parts[ti + 1] : '';
      if (/\.local$/i.test(addr)) { mdns.add(addr.toLowerCase()); return; }  // masked interface
      if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(addr)) return;                     // ignore IPv6 for the topology math
      if (typ === 'host') locals.add(addr);
      else if (typ === 'srflx' || typ === 'prflx') { publics.add(addr); if (port) ports.add(port); }
    };
    pc.createOffer().then(o => pc.setLocalDescription(o)).catch(finish);
    setTimeout(finish, timeoutMs);
  });
}

function classifyNAT(r) {
  if (!r.publics.length) return { txt: r.ifaces ? 'UDP blocked' : 'Hidden', ok: false };
  if (r.locals.some(ip => !_isPrivate(ip) && r.publics.includes(ip))) return { txt: 'Open — no NAT', ok: true };
  if (r.publics.length > 1) return { txt: 'Symmetric (multi-WAN)', ok: true };
  if (r.ports.length > 1) return { txt: 'Symmetric NAT', ok: true };   // mapping changed per STUN server
  return { txt: 'Cone NAT', ok: true };                                // same external port = endpoint-independent
}

async function detectLAN() {
  const r = await probeWebRTC();
  const set = (id, dotId, text, cls, title) => {
    const el = $(id), dot = $(dotId);
    if (el) { el.textContent = text; if (title != null) el.title = title; }
    if (dot) dot.className = 'status-dot ' + cls;
  };

  // LAN IP (numeric if the browser leaked one; otherwise flag the mDNS mask).
  const lan = r.locals.find(_isPrivate) || r.locals[0] || null;
  if (lan) set('lanip', 'dotLan', r.locals.length > 1 ? `${lan} +${r.locals.length - 1}` : lan, 'success', r.locals.join(', '));
  else set('lanip', 'dotLan', 'mDNS masked', 'unknown', 'Browsers hide the LAN IP behind a random .local mDNS name for privacy.');

  // NAT type, with a WebRTC-public-IP vs HTTP-WAN cross-check (VPN/proxy leak).
  const nat = classifyNAT(r);
  const wanEl = $('ipv4');
  const wan = wanEl && /^\d{1,3}(\.\d{1,3}){3}$/.test(wanEl.textContent.trim()) ? wanEl.textContent.trim() : null;
  const rtcPub = r.publics[0] || null;
  let natTxt = nat.txt, natCls = nat.ok ? 'success' : 'unknown', natTitle;
  if (rtcPub) {
    if (wan && rtcPub !== wan) {
      natTxt += ' ⚠'; natCls = 'fail';
      natTitle = `WebRTC exposes ${rtcPub}, but the WAN address is ${wan} — VPN/proxy split-tunnel or a WebRTC leak.`;
    } else {
      natTitle = `Public via WebRTC: ${rtcPub}${wan ? ' — matches WAN' : ''}`;
    }
  } else {
    natTitle = 'No STUN reflexive candidate — UDP is blocked or WebRTC is restricted by the browser.';
  }
  set('natType', 'dotNat', natTxt, natCls, natTitle);

  // Interface / path count — a topology signal that survives mDNS masking.
  const n = r.ifaces;
  const desc = [r.locals.length && `${r.locals.length} numeric`, r.mdns && `${r.mdns} masked`].filter(Boolean).join(' + ');
  set('netPaths', 'dotPaths', n ? `${n} iface${n > 1 ? 's' : ''}` : '—', n ? 'success' : 'unknown',
      n ? `${n} local interface path(s) seen by WebRTC${desc ? ` (${desc})` : ''}. More than one usually means a VPN/virtual adapter or multi-homing.`
        : 'No interface candidates surfaced.');
}

async function runNetwork() {
  await Promise.all([detectIPs(), detectISP()]);
  await detectLAN();   // runs after detectIPs so #ipv4 is populated for the WebRTC-vs-WAN leak check
  await checkPing();
  await runSpeedTest();
}

// MODULE: REACHABILITY
// Well-known endpoints probed from the visitor's browser to tell apart "I'm
// offline", "my DNS is broken", "this site is blocked/geo-fenced by my network
// or VPN", and "Carino's own infra is down". Chosen so the FAILURE PATTERN is
// diagnostic:
//   - The four public resolvers are raw IPs, so they answer even when DNS is
//     broken: those up + the domains down => a DNS problem, not a dead link.
//   - Google / GitHub / the cloud fronts are the usual casualties of corporate
//     filters, censorship and VPN geo-fencing.
//   - carino.systems is our own infrastructure.
// no-cors fetches resolve opaquely when reachable and reject otherwise, so we
// only learn up/down + latency (never the HTTP status) — which is all we need.
// Each card shows just a status dot + name; the resolved IP + latency stay in the
// DOM for the PNG export and the hover title. IPs for hostname targets come from
// a DNS-over-HTTPS lookup (Cloudflare DoH, Google DoH fallback) so a wrong/blank
// IP flags a DNS problem or hijack independently of whether the site answers.
// The regional flagships (Baidu/Yandex/Yahoo Japan/Wikipedia/Mercado Libre) double
// as censorship canaries AND latency anchors: e.g. Baidu up while Google is down =>
// behind the Great Firewall (Yahoo Japan up + Baidu up but Google down sharpens
// that to "specifically China", not just "East Asia reachable"). From far away they
// read "slow" (white), so the colour spread reflects your routing/geography.
// For the full 50-site sweep and the extended diagnostics, see test.carino.systems.
const REACH_TARGETS = [
  { name: "Cloudflare DNS", host: "1.1.1.1",             ip: "1.1.1.1" },
  { name: "Google DNS",     host: "8.8.8.8",             ip: "8.8.8.8" },
  { name: "Quad9 DNS",      host: "9.9.9.9",             ip: "9.9.9.9" },
  { name: "OpenDNS",        host: "208.67.222.222",      ip: "208.67.222.222" },
  { name: "Google",         host: "google.com" },
  { name: "Cloudflare",     host: "cloudflare.com" },
  { name: "AWS Cloud",      host: "aws.amazon.com" },
  { name: "Azure Cloud",    host: "azure.microsoft.com" },
  { name: "Baidu",          host: "baidu.com" },           // China / Great-Firewall discriminator
  { name: "Yandex",         host: "yandex.com" },          // Russia sphere
  { name: "Yahoo Japan",    host: "yahoo.co.jp" },         // Japan flagship
  { name: "Wikipedia",      host: "wikipedia.org" },       // regime-agnostic censorship canary
  { name: "Mercado Libre",  host: "mercadolibre.com.mx" }, // Latin America anchor
  { name: "GitHub",         host: "github.com" },
  { name: "Carino.systems", host: "carino.systems" },
];
const HIGH_MS = 500;   // above this a reachable target's dot goes white ("slow") instead of gold
let reachLastRun = 0;

async function resolveIP(host, timeoutMs = 5000) {
  const pick = (j) => {
    const a = (j && j.Answer || []).find(x => x.type === 1); // A record
    return a ? a.data : null;
  };
  for (const url of [
    `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(host)}&type=A`,
    `https://dns.google/resolve?name=${encodeURIComponent(host)}&type=A`,
  ]) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const r = await fetch(url, { headers: { accept: 'application/dns-json' }, cache: 'no-store', signal: ctrl.signal });
      const ip = pick(await r.json());
      if (ip) return ip;
    } catch (e) { /* try next resolver */ } finally { clearTimeout(t); }
  }
  return null;
}

async function probeHost(host, timeoutMs = 6000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  const start = performance.now();
  try {
    await fetch(`https://${host}/favicon.ico`, { mode: "no-cors", cache: "no-store", signal: ctrl.signal });
    return Math.round(performance.now() - start);
  } finally { clearTimeout(t); }
}

function buildReachRows() {
  const list = $('reachList');
  if (!list || list.childElementCount) return;
  for (let i = 0; i < REACH_TARGETS.length; i++) {
    const tgt = REACH_TARGETS[i];
    const cell = document.createElement('div');
    cell.className = 'reach-cell';
    cell.id = `rcell-${i}`;
    cell.title = tgt.name;
    const dot = document.createElement('span');
    dot.className = 'status-dot unknown';
    dot.id = `rdot-${i}`;
    const lbl = document.createElement('span');
    lbl.className = 'lbl';
    lbl.textContent = tgt.name;
    const ms = document.createElement('span');
    ms.className = 'ms'; ms.id = `rms-${i}`; ms.textContent = '—';
    // Hidden by CSS — retained only so the PNG export can print the full IP.
    const ip = document.createElement('span');
    ip.className = 'ip'; ip.id = `rip-${i}`; ip.textContent = '—';
    cell.append(dot, lbl, ms, ip);
    list.appendChild(cell);
  }
}

async function checkReach(force = false) {
  const list = $('reachList');
  const count = $('reachCount');
  if (!list) return;
  if (!force && Date.now() - reachLastRun < 60000) return;
  reachLastRun = Date.now();
  buildReachRows();

  let up = 0, done = 0;
  const bump = () => {
    done++;
    if (count) count.textContent = done < REACH_TARGETS.length ? `${up}/${done}` : `${up}/${REACH_TARGETS.length} up`;
  };
  if (count) count.textContent = "0/" + REACH_TARGETS.length;
  await Promise.all(REACH_TARGETS.map(async (tgt, i) => {
    const cell = $(`rcell-${i}`), dot = $(`rdot-${i}`), ipEl = $(`rip-${i}`), msEl = $(`rms-${i}`);
    if (dot) dot.className = 'status-dot scanning';
    if (msEl) { msEl.textContent = '...'; msEl.classList.remove('bad'); }
    if (ipEl) ipEl.textContent = '…';

    // Literal-IP targets skip the DoH lookup; hostname targets resolve via DoH so
    // a wrong/blank IP flags a DNS problem independently of reachability.
    const ipP = tgt.ip ? Promise.resolve(tgt.ip) : resolveIP(tgt.host);
    const [ipRes, msRes] = await Promise.allSettled([ipP, probeHost(tgt.host)]);
    const ipTxt = (ipRes.status === 'fulfilled' && ipRes.value) ? ipRes.value : 'no DNS';
    if (ipEl) ipEl.textContent = ipTxt;

    if (msRes.status === 'fulfilled') {
      up++;
      const ms = msRes.value;
      // Dot encodes status: gold = reachable & responsive, white = reachable but slow.
      if (dot) dot.className = 'status-dot ' + (ms > HIGH_MS ? 'slow' : 'success');
      if (msEl) msEl.textContent = ms + ' ms';
    } else {
      // No connection → grey (not red): we only know it didn't answer, not why.
      if (dot) dot.className = 'status-dot unknown';
      if (msEl) msEl.textContent = tt('down');
    }
    // Hover reveals the full detail the compact card omits.
    if (cell) cell.title = `${tgt.name} · ${ipTxt}` + (msRes.status === 'fulfilled' ? ` · ${msRes.value} ms` : ' · ' + tt('no connection'));
    bump();
  }));
}

// MODULE: EXPORT SYS-STATUS AS IMAGE
// Renders the current dropdown contents to a canvas (no external libs) and
// downloads a PNG, stamped with carino.systems at the bottom.
function readDiagModel() {
  const box = $('diagBox');
  const out = [];
  if (!box) return out;
  for (const el of box.children) {
    if (el.classList.contains('diag-actions')) continue;
    if (el.classList.contains('diag-section')) {
      out.push({ type: 'section', text: (el.firstChild && el.firstChild.textContent || el.textContent).trim(),
                 extra: (el.querySelector('span') ? el.querySelector('span').textContent.trim() : '') });
    } else if (el.classList.contains('diag-row')) {
      const l = el.querySelector('.diag-lbl'), v = el.querySelector('.diag-val');
      out.push({ type: 'row', label: l ? l.textContent.trim() : '', value: v ? v.textContent.trim() : '',
                 dot: dotColorOf(el.querySelector('.status-dot')) });
    } else if (el.id === 'reachList') {
      for (const item of el.children) {
        const l = item.querySelector('.lbl'), ip = item.querySelector('.ip'), ms = item.querySelector('.ms');
        const parts = [ip ? ip.textContent.trim() : '', ms ? ms.textContent.trim() : ''].filter(Boolean);
        out.push({ type: 'row', label: l ? l.textContent.trim() : '',
                   value: parts.join('  ·  '), dot: dotColorOf(item.querySelector('.status-dot')) });
      }
    }
  }
  return out;
}

function dotColorOf(dot) {
  if (!dot) return null;
  if (dot.classList.contains('slow')) return '#ffffff';
  if (dot.classList.contains('success')) return '#eab308';
  if (dot.classList.contains('fail')) return '#ef4444';
  if (dot.classList.contains('scanning')) return '#a3a3a3';
  return '#666666';
}

async function exportStatusImage() {
  try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) {}
  const rows = readDiagModel();
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  const W = 460, padX = 24, padTop = 24, padBottom = 52;
  const titleH = 44, sectionH = 26, rowH = 22;
  let h = padTop + titleH;
  for (const r of rows) h += (r.type === 'section' ? sectionH : rowH);
  h += padBottom;

  const cv = document.createElement('canvas');
  cv.width = W * scale; cv.height = h * scale;
  const ctx = cv.getContext('2d');
  ctx.scale(scale, scale);
  const mono = "'IBM Plex Mono', ui-monospace, monospace";
  const disp = "'Red Hat Display', 'IBM Plex Sans', sans-serif";

  // Background + gold frame
  ctx.fillStyle = '#0b0b0b'; ctx.fillRect(0, 0, W, h);
  ctx.strokeStyle = 'rgba(234,179,8,0.3)'; ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, W - 1, h - 1);

  // Title
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#eab308'; ctx.font = '900 20px ' + disp;
  ctx.fillText('SYSTEM STATUS', padX, padTop + 20);
  ctx.fillStyle = '#a3a3a3'; ctx.font = '11px ' + mono;
  ctx.textAlign = 'right';
  ctx.fillText(new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC', W - padX, padTop + 19);
  ctx.textAlign = 'left';

  let y = padTop + titleH;
  for (const r of rows) {
    if (r.type === 'section') {
      y += 4;
      ctx.strokeStyle = '#262626'; ctx.beginPath(); ctx.moveTo(padX, y + sectionH - 8); ctx.lineTo(W - padX, y + sectionH - 8); ctx.stroke();
      ctx.fillStyle = '#666666'; ctx.font = '700 10px ' + mono;
      ctx.fillText(r.text.toUpperCase(), padX, y + 12);
      if (r.extra) { ctx.textAlign = 'right'; ctx.fillStyle = '#a3a3a3'; ctx.fillText(r.extra, W - padX, y + 12); ctx.textAlign = 'left'; }
      y += sectionH;
    } else {
      let vx = W - padX;
      if (r.dot) {
        ctx.fillStyle = r.dot; ctx.beginPath(); ctx.arc(vx - 3, y + 6, 3, 0, Math.PI * 2); ctx.fill();
        vx -= 12;
      }
      ctx.fillStyle = '#666666'; ctx.font = '11px ' + mono;
      ctx.fillText(r.label, padX, y + 10);
      ctx.fillStyle = r.value === 'blocked' ? '#ef4444' : '#ffffff'; ctx.font = '11px ' + mono;
      ctx.textAlign = 'right';
      ctx.fillText(r.value, vx, y + 10);
      ctx.textAlign = 'left';
      y += rowH;
    }
  }

  // Footer wordmark
  ctx.textAlign = 'center';
  ctx.fillStyle = '#eab308'; ctx.font = '900 15px ' + disp;
  ctx.fillText('carino.systems', W / 2, h - 22);
  ctx.textAlign = 'left';

  cv.toBlob((blob) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'carino-sysstatus-' + Math.floor(Date.now() / 1000) + '.png';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }, 'image/png');
}

// INIT
const retryBtn = $('retryNetwork');
if(retryBtn) retryBtn.addEventListener("click", () => { runNetwork(); checkReach(true); });

const exportBtn = $('exportStatus');
if(exportBtn) exportBtn.addEventListener("click", exportStatusImage);

// Probe reachability when the dropdown is opened (throttled to once a minute).
// The inline onclick=toggleDiag fires first, so the open state is current here.
const statusToggleBtn = document.querySelector('.status-toggle');
if (statusToggleBtn) statusToggleBtn.addEventListener("click", () => {
  const box = document.getElementById('diagBox');
  if (box && box.classList.contains('open')) checkReach();
});

detectSystem();
runNetwork();
checkReach();

// The hardware rows are written once, at parse time — before carino-lang.js has
// even defined window.CarinoLang — so re-detect on a language switch to pull
// their values ("N/A", "Masked", "Charging"…) into the new locale. Purely local
// detection: no network probe is repeated here.
window.addEventListener('carino:langchange', () => { detectSystem(); });