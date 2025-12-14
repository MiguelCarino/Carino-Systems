// === TIME & GREETING ===
function updateTime() {
  const now = new Date();
  
  const elLocal = document.getElementById('clockLocal');
  const elDate = document.getElementById('dateStr');
  const elUTC = document.getElementById('clockUTC');
  const elEpoch = document.getElementById('clockEpoch');
  const elTZ = document.getElementById('tzName');
  const elGreet = document.getElementById('greeting');
  const elLastCheck = document.getElementById('lastCheck');

  if(elLocal) elLocal.textContent = now.toLocaleTimeString('en-US', { hour12: false });
  if(elDate) elDate.textContent = now.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' });
  if(elUTC) elUTC.textContent = now.toISOString().substring(11, 19) + 'Z';
  if(elEpoch) elEpoch.textContent = Math.floor(now.getTime() / 1000);
  if(elLastCheck) elLastCheck.textContent = now.toLocaleTimeString('en-US', { hour12: false, second: 'numeric' });
  
  if(elTZ) {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      elTZ.textContent = tz.split('/')[1] || tz;
    } catch(e) { elTZ.textContent = "Timezone"; }
  }

  // AI Greeting
  if(elGreet) {
    const hrs = now.getHours();
    let greet = "System Ready.";
    if (hrs >= 5 && hrs < 12) greet = "Good Morning, Operator.";
    else if (hrs >= 12 && hrs < 18) greet = "Good Afternoon, Operator.";
    else if (hrs >= 18 && hrs < 22) greet = "Good Evening, Operator.";
    else greet = "Good Night, Operator.";
    if (elGreet.textContent !== greet) elGreet.textContent = greet;
  }
}

// === REAL-TIME SYSTEM STATS (Memory) ===
function updateRealtimeStats() {
  const elMem = document.getElementById('sysMem');
  if (elMem) {
    // performance.memory is Chrome/Edge/Chromium only
    if (performance && performance.memory) {
      const used = Math.round(performance.memory.usedJSHeapSize / 1048576);
      const limit = Math.round(performance.memory.jsHeapSizeLimit / 1048576);
      elMem.textContent = `${used} / ${limit} MB`;
    } else {
      // Clear message for Safari/Firefox
      elMem.textContent = "Restricted (Privacy)"; 
      elMem.style.opacity = "0.6"; // Visual hint
    }
  }
}

setInterval(() => {
  updateTime();
  updateRealtimeStats();
}, 1000);
updateTime();
updateRealtimeStats();


// === STATIC SYSTEM INFO ===
const $ = (id) => document.getElementById(id);

function detectSystem() {
  const ua = navigator.userAgent;
  let os = "Linux";
  let browser = "Browser";
  let browserVersion = "";

  // 1. OS DETECTION
  if (ua.includes("Win")) os = "Windows";
  else if (ua.includes("Mac") || ua.includes("PPC")) os = "macOS";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Linux")) {
    if (ua.includes("Fedora")) os = "Fedora";
    else if (ua.includes("Ubuntu")) os = "Ubuntu";
    else if (ua.includes("Debian")) os = "Debian";
    else if (ua.includes("Arch")) os = "Arch Linux";
    else if (ua.includes("Gentoo")) os = "Gentoo";
    else if (ua.includes("NixOS")) os = "NixOS";
    else os = "Linux";
  }

  // 2. BROWSER DETECTION
  if (ua.includes("Edg")) {
    browser = "Edge";
    const match = ua.match(/Edg\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes("Chromium")) {
    browser = "Chromium";
    const match = ua.match(/Chromium\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes("CriOS") || ua.includes("Chrome")) {
    browser = "Chrome";
    const match = ua.match(/Chrome\/(\d+\.\d+)/);
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

  const versionText = browserVersion ? ` v${browserVersion}` : '';
  const el = $('sysClient');
  if(el) el.textContent = `${browser}${versionText} on ${os}`;

  // 3. GPU DETECTION & ANGLE BACKEND
  const elGPU = $('sysGPU');
  if (elGPU) {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      
      if (gl) {
        // Use RENDERER as requested to avoid deprecation warning
        const renderer = gl.getParameter(gl.RENDERER);
        
        let cleanName = renderer;
        let angleBackend = "";

        // Parse ANGLE info if present
        if (renderer.includes("ANGLE (")) {
          const content = renderer.match(/ANGLE \((.*)\)/);
          if (content && content[1]) {
            const parts = content[1].split(', ');
            // part[1] is usually the nice name (e.g. NVIDIA RTX 3080)
            // part[2] often contains the backend info (e.g. Direct3D11)
            cleanName = parts[1] ? parts[1].trim() : parts[0]; 

            if (renderer.includes("Direct3D11")) angleBackend = "ANGLE (Direct3D 11)";
            else if (renderer.includes("Direct3D9")) angleBackend = "ANGLE (Direct3D 9)";
            else if (renderer.includes("OpenGL")) angleBackend = "ANGLE (OpenGL)";
            else if (renderer.includes("Metal")) angleBackend = "ANGLE (Metal)";
            else if (renderer.includes("Vulkan")) angleBackend = "ANGLE (Vulkan)";
          }
        }
        
        // Cleanup extra shader version noise if present
        cleanName = cleanName.replace(/\s(vs|ps|gs|ds|es|cs)_\d_\d/g, "");

        // SET HTML: GPU Name + Backend below
        if (angleBackend) {
          elGPU.innerHTML = `${cleanName}<br><span style="font-size:0.75em; opacity:0.7; display:block; margin-top:2px;">${angleBackend}</span>`;
          // Ensure parent container aligns top so the break looks good
          elGPU.style.lineHeight = "1.2"; 
          elGPU.style.textAlign = "right"; 
        } else {
          elGPU.textContent = cleanName;
        }
        
        elGPU.title = renderer; // Full raw info on hover

      } else {
        elGPU.textContent = "WebGL Disabled";
      }
    } catch(e) {
      elGPU.textContent = "Error";
    }
  }

  // 4. CONNECTION TYPE
  const elConn = $('sysConn');
  if (elConn) {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn && conn.effectiveType) {
      const type = conn.effectiveType.toUpperCase(); 
      const down = conn.downlink ? ` (${conn.downlink}Mbps)` : '';
      elConn.textContent = type + down;
      
      conn.addEventListener('change', () => {
         elConn.textContent = (conn.effectiveType || "Unknown").toUpperCase() + (conn.downlink ? ` (${conn.downlink}Mbps)` : '');
      });
    } else {
      elConn.textContent = "Restricted (Privacy)";
      elConn.style.opacity = "0.6";
    }
  }
}


// === ROBUST NETWORK DETECTION (From your snippet) ===

async function fetchJSON(url, { timeoutMs = 4000 } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    // Using mode: 'cors' and cache: 'no-store' as requested
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

async function detectIPv6() {
  const ip = await tryProviders([
    async () => (await fetchJSON("https://api6.ipify.org?format=json")).ip,
    async () => (await fetchJSON("https://api64.ipify.org?format=json")).ip,
    async () => (await fetchJSON("https://ipapi.co/json/")).ip,
  ]);
  return ip && ip.includes(":") ? ip : null;
}

async function detectIPv4() {
  const ip = await tryProviders([
    async () => (await fetchJSON("https://api4.ipify.org?format=json")).ip,
    async () => (await fetchJSON("https://api.ipify.org?format=json")).ip,
    async () => (await fetchJSON("https://ipapi.co/json/")).ip,
  ]);
  return ip && ip.includes(".") ? ip : null;
}

async function checkPing() {
  const start = performance.now();
  try {
    // Ping current page (reliable, avoids 404s on favicons)
    await fetch(window.location.href, { method: 'HEAD', cache: 'no-store' }); 
    const duration = Math.round(performance.now() - start);
    const el = $('pingVal');
    if(el) el.textContent = duration + " ms";
  } catch (e) { 
    const el = $('pingVal');
    if(el) el.textContent = "Err"; 
  }
}

async function runNetwork() {
  const ipv4 = $('ipv4'); const ipv6 = $('ipv6');
  const dot4 = $('dot4'); const dot6 = $('dot6');

  if(ipv4) ipv4.textContent = "..."; 
  if(ipv6) ipv6.textContent = "...";
  if(dot4) dot4.className = "status-dot scanning"; 
  if(dot6) dot6.className = "status-dot scanning";

  const [v6, v4] = await Promise.allSettled([detectIPv6(), detectIPv4()]);

  // Update IPv6 UI
  if (v6.status === "fulfilled" && v6.value) {
    if(ipv6) ipv6.textContent = v6.value;
    if(dot6) dot6.className = "status-dot success";
  } else {
    if(ipv6) ipv6.textContent = "Not detected";
    if(dot6) dot6.className = "status-dot unknown";
  }

  // Update IPv4 UI
  if (v4.status === "fulfilled" && v4.value) {
    if(ipv4) ipv4.textContent = v4.value;
    if(dot4) dot4.className = "status-dot success";
  } else {
    if(ipv4) ipv4.textContent = "Unavailable";
    if(dot4) dot4.className = "status-dot fail";
  }
  
  await checkPing();
}

// === HUD INTERACTION ===
document.addEventListener("DOMContentLoaded", () => {
  const heroHud = document.getElementById('heroHud');
  if (heroHud) {
    heroHud.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      heroHud.classList.toggle('expanded');
    });
  }
});

// Init
const retryBtn = $('retryNetwork');
if(retryBtn) retryBtn.addEventListener("click", runNetwork);

detectSystem(); 
runNetwork();