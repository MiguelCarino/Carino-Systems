// Manages the visual themes and ensures state persistence

const THEMES = [
  'cyberpunk',       
  'cyberpunk-red',   
  'cyberpunk-green',
  'moe',             
  'moe-blue',        
  'moe-green',
  'black'            
];

function applyTheme(name) {
  document.body.setAttribute('data-theme', name);
  localStorage.setItem('cs-theme', name);
}

// === Theme Initialization Logic ===
const path = window.location.pathname;
// Detect if we are on the landing page (handling root "/" and explicit "index.html")
const isIndex = path.endsWith('/') || path.endsWith('index.html');
const savedTheme = localStorage.getItem('cs-theme');

if (isIndex) {
  // RULE 1: On Index, ALWAYS pick a new random theme to keep it fresh.
  // This automatically saves it to localStorage for the sub-pages to pick up.
  const randomStart = THEMES[Math.floor(Math.random() * THEMES.length)];
  applyTheme(randomStart);
} else {
  // RULE 2: On sub-pages, try to load the theme stored by Index.
  if (savedTheme && THEMES.includes(savedTheme)) {
    applyTheme(savedTheme);
  } else {
    // Fallback: If user links directly to a sub-page with no storage history, randomize.
    const randomStart = THEMES[Math.floor(Math.random() * THEMES.length)];
    applyTheme(randomStart);
  }
}

// Button Listener
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    let nextIndex = THEMES.indexOf(current) + 1;
    if (nextIndex >= THEMES.length) nextIndex = 0;
    applyTheme(THEMES[nextIndex]);
  });
}