// === TIME & GREETING ===
function updateTime() {
  const now = new Date();
  
  // Clock DOM
  const elLocal = document.getElementById('clockLocal');
  const elDate = document.getElementById('dateStr');
  const elUTC = document.getElementById('clockUTC');
  const elEpoch = document.getElementById('clockEpoch');
  const elTZ = document.getElementById('tzName');
  const elGreet = document.getElementById('greeting');

  if(elLocal) elLocal.textContent = now.toLocaleTimeString('en-US', { hour12: false });
  if(elDate) elDate.textContent = now.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' });
  if(elUTC) elUTC.textContent = now.toISOString().substring(11, 19) + 'Z';
  if(elEpoch) elEpoch.textContent = Math.floor(now.getTime() / 1000);
  
  if(elTZ) {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      elTZ.textContent = tz.split('/')[1] || tz;
    } catch(e) {}
  }

  // AI Greeting
  if(elGreet) {
    const hrs = now.getHours();
    let greet = "System Ready.";
    if (hrs >= 5 && hrs < 12) greet = "Good Morning, Operator.";
    else if (hrs >= 12 && hrs < 18) greet = "Good Afternoon, Operator.";
    else if (hrs >= 18 && hrs < 22) greet = "Good Evening, Operator.";
    else greet = "Good Night, Operator.";
    
    // Only update if changed to prevent flickering
    if (elGreet.textContent !== greet) elGreet.textContent = greet;
  }
}

setInterval(updateTime, 1000);
updateTime();

// === NETWORK & SYSTEM INFO ===
const $ = (id) => document.getElementById(id);

function detectSystem() {
  const ua = navigator.userAgent;
  let os = "Unknown";
  if (ua.includes("Win")) os = "Windows";
  else if (ua.includes("Mac")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iOS")) os = "iOS";
  
  let browser = "Browser";
  if(ua.includes("Chrome")) browser = "Chrome"; 
  else if(ua.includes("Firefox")) browser = "Firefox";
  else if(ua.includes("Safari")) browser = "Safari";
  
  const el = $('sysClient');
  if(el) el.textContent = `${browser} on ${os}`;
}

async function fetchJSON(url, { timeoutMs = 3000 } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error("HTTP error");
    return await res.json();
  } finally { clearTimeout(t); }
}

async function checkPing() {
  const start = performance.now();
  try {
    // Fetch favicon to test RTT
    await fetch("https://www.google.com/favicon.ico", { mode: 'no-cors', cache: 'no-store' });
    const duration = Math.round(performance.now() - start);
    const el = $('pingVal');
    if(el) el.textContent = duration + " ms";
  } catch (e) { 
    const el = $('pingVal');
    if(el) el.textContent = "Timeout"; 
  }
}

async function detectNetwork() {
  const ipv4 = $('ipv4'); const ipv6 = $('ipv6');
  const dot4 = $('dot4'); const dot6 = $('dot6');
  const elLastCheck = $('lastCheck'); // NEW

  if(ipv4) ipv4.textContent = "..."; 
  if(ipv6) ipv6.textContent = "...";
  if(dot4) dot4.className = "status-dot scanning"; 
  if(dot6) dot6.className = "status-dot scanning";

  const p4 = fetchJSON("https://api.ipify.org?format=json").then(data => {
        if(ipv4) ipv4.textContent = data.ip; 
        if(dot4) dot4.className = "status-dot success";
    }).catch(() => { 
        if(ipv4) ipv4.textContent = "N/A"; 
        if(dot4) dot4.className = "status-dot fail"; 
    });
    
  // Added IPv6 check promise
  const p6 = fetchJSON("https://api64.ipify.org?format=json").then(data => {
        if(data.ip.includes(":")) { 
          if(ipv6) ipv6.textContent = data.ip; 
          if(dot6) dot6.className = "status-dot success"; 
        } else { 
          if(ipv6) ipv6.textContent = "N/A"; 
          if(dot6) dot6.className = "status-dot unknown"; 
        }
    }).catch(() => { 
      if(ipv6) ipv6.textContent = "N/A"; 
      if(dot6) dot6.className = "status-dot fail"; 
    });

  await Promise.allSettled([p4, p6, checkPing()]);
  
  // Update last check time after all network operations complete
  if(elLastCheck) {
    const now = new Date();
    elLastCheck.textContent = now.toLocaleTimeString('en-US', { hour12: false, second: 'numeric' });
  }
}
// === HUD INTERACTION ===
document.addEventListener("DOMContentLoaded", () => {
  const heroHud = document.getElementById('heroHud');
  
  if (heroHud) {
    heroHud.addEventListener('click', (e) => {
      // Prevent toggling if the user clicks a link (social buttons)
      if (e.target.closest('a')) return;
      
      // Toggle the expanded class
      heroHud.classList.toggle('expanded');
    });
  }
});
// Init
const retryBtn = $('retryNetwork');
if(retryBtn) retryBtn.addEventListener("click", detectNetwork);

detectSystem(); 
detectNetwork();