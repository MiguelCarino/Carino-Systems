export async function initTheme({
  defaultTheme = 'carino',
  themes = [],
  dropdownId = 'theme-select',
  toggleButtonId = 'toggle-theme'
} = {}) {
  const themeSelect = document.getElementById(dropdownId);
  const toggleBtn = document.getElementById(toggleButtonId);
  const themeList = [...new Set(themes.length ? themes : await detectThemes())];
  const currentTheme =
    getThemeFromUrl() ||
    getThemeFromCookie() ||
    localStorage.getItem('theme') ||
    defaultTheme;

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

  function setTheme(theme, updateUrl = true) {
    if (!themeList.includes(theme)) theme = defaultTheme;

    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    setCrossDomainThemeCookie(theme);

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

  function getThemeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('theme')) return urlParams.get('theme');
    if (window.location.hash.startsWith('#')) return window.location.hash.slice(1);
    return null;
  }

  function setCrossDomainThemeCookie(theme) {
    const baseDomain = getBaseDomain(location.hostname);
    document.cookie = `theme=${theme};path=/;domain=.${baseDomain};max-age=31536000`;
  }

  function getThemeFromCookie() {
    const match = document.cookie.match(/(?:^|;\s*)theme=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  function getBaseDomain(hostname) {
    const parts = hostname.split('.');
    if (parts.length <= 2) return hostname;
    const tlds = ['co.uk', 'com.mx', 'org.mx'];
    const lastTwo = parts.slice(-2).join('.');
    const lastThree = parts.slice(-3).join('.');
    return tlds.includes(lastTwo) ? lastThree : lastTwo;
  }

  function propagateThemeToLinks(theme) {
    const devFallbackDomain = 'carino.systems';
    const allowedRootDomain =
      location.hostname === '127.0.0.1' || location.hostname === 'localhost'
        ? devFallbackDomain
        : getBaseDomain(location.hostname);

    document.querySelectorAll('a[href]').forEach(link => {
      try {
        const url = new URL(link.href, location.origin);
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

  async function detectThemes() {
    console.warn('Theme detection is static fallback.');
    return [defaultTheme, 'carino', 'retro', 'moe'];
  }
}
