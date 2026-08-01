/* ============================================================
   carino-lang.js — fleet-wide language preference + switcher.
   ------------------------------------------------------------
   Drop this file into any Carino project and add it AFTER the
   header exists (TV's native header) or after carino-navbar.js
   (every other site):

     <script src="carino-lang.js" defer></script>

   It injects a compact language button (current code: EN / ES /
   PT / 日本語 / RU) into the header's right cluster, left of the
   Sys. Status control, with a dropdown of the five languages.

   AUTOMATIC: the language resolves without any user action —
     ?lang= in the URL  >  fleet-wide choice  >  browser language
     >  English.
   The fleet-wide choice is a cookie on .carino.systems, so one
   pick on any subdomain applies to every site in the fleet
   (subdomains do NOT share localStorage — the cookie is the only
   thing that makes the preference travel). Off-domain (local
   dev, forks) it falls back to per-site localStorage.

   The file owns only the preference. Each app owns its own
   dictionary and reacts via:
     window.CarinoLang.current            // 'en' | 'es' | 'pt-BR' | 'ja' | 'ru'
     window.CarinoLang.set(code)          // programmatic switch
     window.addEventListener('carino:langchange', (e) => e.detail.lang)
   An app with no dictionary simply stays English — the choice
   still persists for the sites that do translate.

   Self-contained: styles are inlined and scoped under #cnLangBtn /
   #cnLangBox with hard-coded colours, so it is safe on light-themed
   or Tailwind pages and needs no CDN.
   ============================================================ */
(function () {
  'use strict';

  var A = '#eab308', BG = '#0f0f0f', BORDER = '#262626', MUTED = '#8a8a8a', TEXT = '#fff';
  var MONO = '"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace';

  // [code, button label, native name]
  var LANGS = [
    ['en', 'EN', 'English'],
    ['es', 'ES', 'Español'],
    ['pt-BR', 'PT', 'Português'],
    ['ja', '日本語', '日本語'],
    ['ru', 'RU', 'Русский'],
  ];

  var CSS = ''
    + '#cnLangBtn{display:flex;align-items:center;background:transparent;border:1px solid ' + BORDER + ';'
    + 'color:' + MUTED + ';font-family:' + MONO + ';font-size:.72rem;text-transform:uppercase;letter-spacing:.1em;'
    + 'padding:0 10px;height:32px;border-radius:4px;cursor:pointer;transition:.2s;white-space:nowrap;}'
    + '#cnLangBtn:hover{border-color:' + A + ';color:' + A + ';background:rgba(234,179,8,.08);}'
    + '#cnLangBox{position:fixed;top:56px;right:12px;width:180px;background:' + BG + ';'
    + 'border:1px solid ' + BORDER + ';border-radius:8px;padding:6px;box-shadow:0 18px 40px rgba(0,0,0,.6);'
    + 'opacity:0;visibility:hidden;transform:translateY(-8px);transition:.18s;z-index:400;}'
    + '#cnLangBox.open{opacity:1;visibility:visible;transform:translateY(0);}'
    + '#cnLangBox button{display:flex;justify-content:space-between;align-items:center;width:100%;'
    + 'background:transparent;border:0;border-radius:5px;padding:7px 10px;cursor:pointer;text-align:left;'
    + 'color:' + TEXT + ';font-size:.8rem;}'
    + '#cnLangBox button:hover{background:rgba(234,179,8,.08);color:' + A + ';}'
    + '#cnLangBox button .code{font-family:' + MONO + ';font-size:.62rem;letter-spacing:.1em;color:' + MUTED + ';}'
    + '#cnLangBox button.active{color:' + A + ';}'
    + '#cnLangBox button.active .code{color:' + A + ';}';

  /* ---- resolution ---- */

  function resolve(tag) {
    if (!tag) return null;
    var l = String(tag).toLowerCase();
    if (l.indexOf('es') === 0) return 'es';
    if (l.indexOf('pt') === 0) return 'pt-BR';
    if (l.indexOf('ja') === 0) return 'ja';
    if (l.indexOf('ru') === 0) return 'ru';
    if (l.indexOf('en') === 0) return 'en';
    return null;
  }

  var onFleet = /(^|\.)carino\.systems$/.test(location.hostname);

  function readStored() {
    if (onFleet) {
      var m = document.cookie.match(/(?:^|;\s*)carino_lang=([^;]+)/);
      return m ? resolve(decodeURIComponent(m[1])) : null;
    }
    try { return resolve(localStorage.getItem('carino_lang')); } catch (e) { return null; }
  }

  function store(code) {
    if (onFleet) {
      // The parent-domain cookie is what makes the choice fleet-wide.
      document.cookie = 'carino_lang=' + encodeURIComponent(code)
        + '; Domain=.carino.systems; Path=/; Max-Age=31536000; SameSite=Lax';
    } else {
      try { localStorage.setItem('carino_lang', code); } catch (e) { /* private mode */ }
    }
  }

  var urlLang = resolve(new URLSearchParams(location.search).get('lang'));
  if (urlLang) store(urlLang);
  var current = urlLang || readStored() || resolve(navigator.language) || 'en';
  document.documentElement.lang = current;

  function set(code) {
    code = resolve(code) || 'en';
    if (code === current) return;
    current = code;
    store(code);
    document.documentElement.lang = code;
    var btn = document.getElementById('cnLangBtn');
    if (btn) btn.textContent = label(code);
    renderRows();
    window.dispatchEvent(new CustomEvent('carino:langchange', { detail: { lang: code } }));
  }

  function label(code) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i][0] === code) return LANGS[i][1];
    return 'EN';
  }

  window.CarinoLang = { get current() { return current; }, set: set, resolve: resolve };

  /* ---- UI ---- */

  function renderRows() {
    var box = document.getElementById('cnLangBox');
    if (!box) return;
    box.innerHTML = '';
    LANGS.forEach(function (l) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = l[0] === current ? 'active' : '';
      b.innerHTML = '<span>' + l[2] + '</span><span class="code">' + l[1] + '</span>';
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        set(l[0]);
        box.classList.remove('open');
      });
      box.appendChild(b);
    });
  }

  function build(right, beforeEl) {
    if (document.getElementById('cnLangBtn')) return;

    var style = document.createElement('style');
    style.id = 'carino-lang-style';
    style.textContent = CSS;
    document.head.appendChild(style);

    var btn = document.createElement('button');
    btn.id = 'cnLangBtn';
    btn.type = 'button';
    btn.title = 'Language';
    btn.setAttribute('aria-haspopup', 'true');
    btn.textContent = label(current);

    if (beforeEl) right.insertBefore(btn, beforeEl); else right.appendChild(btn);

    var box = document.createElement('div');
    box.id = 'cnLangBox';
    document.body.appendChild(box);
    renderRows();

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      box.classList.toggle('open');
    });
    box.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('click', function () { box.classList.remove('open'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') box.classList.remove('open');
    });
  }

  // Attach to whichever header exists: TV's native .header-right, or the
  // injected navbar's .cn-right (carino-navbar.js). Sit LEFT of Sys. Status.
  function tryAttach() {
    var nav = document.getElementById('carinoNav');
    if (nav) {
      var right = nav.querySelector('.cn-right');
      if (right) { build(right, document.getElementById('cnDiagBtn') || right.querySelector('.social-row')); return true; }
    }
    var hr = document.querySelector('.header-right');
    if (hr) { build(hr, document.getElementById('diagToggle') || hr.querySelector('.social-row')); return true; }
    return false;
  }

  function start() {
    if (tryAttach()) return;
    // The navbar self-injects on DOMContentLoaded; both scripts are deferred
    // so order is not guaranteed — watch for it instead of assuming.
    var obs = new MutationObserver(function () {
      if (tryAttach()) obs.disconnect();
    });
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { obs.disconnect(); }, 10000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
