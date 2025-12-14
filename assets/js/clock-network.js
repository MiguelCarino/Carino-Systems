// ==========================================
// CONFIGURATION: SPEED TEST FILES
// ==========================================
const TEST_FILE_SMALL = "https://raw.githubusercontent.com/MiguelCarino/Carino-Systems/refs/heads/main/assets/files/sample_1mb";
const TEST_FILE_LARGE = "https://raw.githubusercontent.com/MiguelCarino/Carino-Systems/refs/heads/main/assets/files/sample_25mb";


// ==========================================
// MODULE: TIME & GREETING
// ==========================================
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
setInterval(updateTime, 1000);
updateTime();


// ==========================================
// MODULE: SYSTEM & HARDWARE DETECTION
// ==========================================
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
    elCPU.textContent = cores ? `${cores} Logical Cores` : "Unknown (Masked)";
  }

  // 5. DISPLAY
  const elScreen = $('sysScreen');
  if(elScreen) {
    const w = window.screen.width;
    const h = window.screen.height;
    const dpr = window.devicePixelRatio || 1;
    elScreen.textContent = `${w}x${h} (${dpr.toFixed(1)}x)`;
  }

  // 6. GPU
  const elGPU = $('sysGPU');
  if (elGPU) {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      
      if (gl) {
        const renderer = gl.getParameter(gl.RENDERER);
        const maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE); 
        let cleanName = renderer;
        let angleBackend = "";
        let gpuType = "Unknown";

        if (renderer.includes("AMD") || renderer.includes("NVIDIA") || renderer.includes("GeForce") || renderer.includes("Radeon") || renderer.includes("RTX") || renderer.includes("GTX")) {
            gpuType = "Discrete";
        } else if (renderer.includes("Intel") || renderer.includes("Iris") || renderer.includes("Mali") || renderer.includes("Adreno") || renderer.includes("Apple")) {
            gpuType = "Integrated";
        } else if (renderer.includes("SwiftShader") || renderer.includes("LLVM") || renderer.includes("Software")) {
            gpuType = "Software";
        }

        if (renderer.includes("ANGLE (")) {
          const content = renderer.match(/ANGLE \((.*)\)/);
          if (content && content[1]) {
            const parts = content[1].split(', ');
            cleanName = parts[1] ? parts[1].trim() : parts[0]; 
            if (renderer.includes("Direct3D11")) angleBackend = "ANGLE (D3D11)";
            else if (renderer.includes("Direct3D9")) angleBackend = "ANGLE (D3D9)";
            else if (renderer.includes("OpenGL")) angleBackend = "ANGLE (OpenGL)";
            else if (renderer.includes("Metal")) angleBackend = "ANGLE (Metal)";
            else if (renderer.includes("Vulkan")) angleBackend = "ANGLE (Vulkan)";
          }
        }
        
        cleanName = cleanName.replace(/\s(vs|ps|gs|ds|es|cs)_\d_\d/g, "");

        const subline = `<span style="font-size:0.75em; opacity:0.7; display:block; margin-top:2px;">[${gpuType}] ${angleBackend} | Tex: ${maxTex}</span>`;
        elGPU.innerHTML = `${cleanName}${subline}`;
        elGPU.style.lineHeight = "1.2"; 
        elGPU.style.textAlign = "right"; 
        elGPU.title = renderer;
      } else {
        elGPU.textContent = "WebGL Disabled";
      }
    } catch(e) { elGPU.textContent = "Error"; }
  }
}


// ==========================================
// MODULE: NETWORK, PING & SPEED
// ==========================================

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

  if (v6.status === "fulfilled" && v6.value.includes(":")) {
    if(ipv6) ipv6.textContent = v6.value;
    if(dot6) dot6.className = "status-dot success";
  } else {
    if(ipv6) ipv6.textContent = "Not detected";
    if(dot6) dot6.className = "status-dot unknown";
  }

  if (v4.status === "fulfilled" && v4.value.includes(".")) {
    if(ipv4) ipv4.textContent = v4.value;
    if(dot4) dot4.className = "status-dot success";
  } else {
    if(ipv4) ipv4.textContent = "Unavailable";
    if(dot4) dot4.className = "status-dot fail";
  }
}

// === SIMPLE PING (Back to Basic) ===
async function checkPing() {
  const start = performance.now();
  const el = $('pingVal');
  try {
    // Ping current page (reliable)
    await fetch(window.location.href, { method: 'HEAD', cache: 'no-store' }); 
    const duration = Math.round(performance.now() - start);
    if(el) el.textContent = duration + " ms";
  } catch (e) { 
    if(el) el.textContent = "Timeout"; 
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
    
    elSpeed.textContent = "Testing...";
    
    try {
        let result = await performDownload(TEST_FILE_SMALL);
        
        if (result.duration < 0.5) {
            elSpeed.textContent = "Boost Test...";
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
           elSpeed.textContent = "Error";
        }
    }
}

async function runNetwork() {
  await detectIPs();
  await checkPing();
  await runSpeedTest();
}

// ==========================================
// INIT
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const heroHud = document.getElementById('heroHud');
  if (heroHud) {
    heroHud.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      heroHud.classList.toggle('expanded');
    });
  }
});

const retryBtn = $('retryNetwork');
if(retryBtn) retryBtn.addEventListener("click", runNetwork);

detectSystem(); 
runNetwork();