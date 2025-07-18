// theme.js
export async function initTheme({
  defaultTheme = 'carino',
  themes = [],
  themeFolder = 'assets/',
  dropdownId = 'theme-select',
  toggleButtonId = 'toggle-theme',
  linkId = 'theme-style'
} = {}) {
  const styleLink = document.getElementById(linkId);
  const themeSelect = document.getElementById(dropdownId);
  const toggleBtn = document.getElementById(toggleButtonId);

  const themeList = themes.length ? themes : await detectThemes(themeFolder);
  const currentTheme = getThemeFromUrl() || localStorage.getItem('theme') || defaultTheme;

  setTheme(currentTheme, false);

  if (themeSelect) {
    themeSelect.innerHTML = themeList.map(t => `<option value="${t}">${t}</option>`).join('');
    themeSelect.value = currentTheme;
    themeSelect.addEventListener('change', () => {
      const selected = themeSelect.value;
      console.log(`[Theme] Selected via dropdown: ${selected}`);
      setTheme(selected);
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = localStorage.getItem('theme') || defaultTheme;
      const next = themeList[(themeList.indexOf(current) + 1) % themeList.length];
      console.log(`[Theme] Toggled: ${current} → ${next}`);
      setTheme(next);
    });
  }

  function getThemeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('theme')) return urlParams.get('theme');
    if (window.location.hash.startsWith('#')) return window.location.hash.slice(1);
    return null;
  }

  function setTheme(theme, updateUrl = true) {
    if (!themeList.includes(theme)) theme = defaultTheme;

    styleLink.href = `${themeFolder}${theme}.css`;
    localStorage.setItem('theme', theme);

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (theme === defaultTheme) {
        url.searchParams.delete('theme');
      } else {
        url.searchParams.set('theme', theme);
      }
      history.replaceState(null, '', url.pathname + url.search);
    }

    propagateThemeToLinks(theme);
    if (themeSelect) themeSelect.value = theme;
  }

  function propagateThemeToLinks(theme) {
    const allowedRootDomain = 'carino.systems'; // customize this
    const links = document.querySelectorAll('a[href]');
    console.log(`[Theme] Propagating ?theme=${theme} to internal/subdomain links...`);
    
    links.forEach(link => {
      try {
        const url = new URL(link.href, location.origin);
      
        // Check if it's the same root domain or subdomain
        if (!url.hostname.endsWith(`.${allowedRootDomain}`) && url.hostname !== allowedRootDomain) {
          console.log(`→ External link skipped: ${link.href}`);
          return;
        }
      
        if (theme === defaultTheme) {
          url.searchParams.delete('theme');
        } else {
          url.searchParams.set('theme', theme);
        }
      
        link.href = url.origin + url.pathname + url.search;
        console.log(`→ Updated internal/subdomain link: ${link.href}`);
      } catch (e) {
        console.warn('Skipping malformed link:', link.href);
      }
    });
  }

  async function detectThemes(folder) {
    // Only works in development or with a server-side endpoint
    console.warn('Automatic theme detection requires server support.');
    return [defaultTheme, 'carino', 'moe']; // fallback
  }
}
