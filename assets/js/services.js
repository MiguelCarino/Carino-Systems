!function () {
  const services = {
    instagram: () => createService("Messages", "https://static.cdninstagram.com/rsrc.php/v4/yI/r/VsNE-OHk_8a.png", true),
    gmail: () => createService("Inbox", "https://workspace.google.com/lp/static/images/logo-gmail.png", true),
    ubuntu: () => createService("How to remove Ubuntu", "https://assets.ubuntu.com/v1/be7e4cc6-COF-favicon-32x32.png"),
    debian: () => createService("Debian for life", "https://www.debian.org/favicon.ico"),
    arch: () => createService("I don't use Arch btw", "https://archlinux.org/static/favicon.png"),
    fedora: () => createService("Install Fedora", "https://fedoraproject.org/favicon.ico"),
    opensuse: () => createService("Install openSUSE", "https://www.opensuse.org/assets/img/favicon-for-dark-192.png"),
    redhat: () => createService("Red Hat, Inc.", "https://www.redhat.com/favicon.ico"),
    gentoo: () => createService("Install Gentoo", "https://www.gentoo.org/favicon.ico"),
    guix: () => createService("Install Guix", "https://guix.gnu.org/themes/initial/img/icon.png"),
    kernel: () => createService("Linux Kernel", "https://www.kernel.org/theme/images/logos/favicon.png"),
    fourchan: () => createService("4chan - Replies", "https://s.4cdn.org/image/favicon.ico", true),
    outlook: () => createService("Inbox", "https://res-h3.public.cdn.office.net/owamail/20230414002.05/resources/images/favicons/mail-unseen.ico", true),
    steamps2: () => createService("PlanetSide 2 on Steam", "https://store.steampowered.com/favicon.ico")
  };

  // Safari with "Block all cookies" and Firefox with site cookies disabled do
  // not return null from sessionStorage — merely touching the object throws a
  // SecurityError. An unguarded throw at top level would abort the rest of this
  // IIFE and the visibilitychange listener would never bind, killing the gag
  // silently. Every access goes through this shim instead.
  const store = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* storage blocked */ } },
    del: function (k) { try { sessionStorage.removeItem(k); } catch (e) { /* storage blocked */ } }
  };

  function createService(baseTitle, favicon, isDynamic = false) {
    let title = baseTitle;
    if (isDynamic) {
      const count = Math.floor(Math.random() * 13);
      const display = count === 10 ? "50+" : count === 12 ? "100+" : count;
      title = `${baseTitle} (${display})`;
    }
    return { title, favicon };
  }

  function updateFaviconAndTitle({ title, favicon }) {
    // 1. Force a cache-bust with a timestamp
    const cacheBuster = "?v=" + Date.now();
    const fullPath = favicon + cacheBuster;

    // 2. Safari is picky: Remove ALL existing icon-related tags first
    const existingIcons = document.querySelectorAll("link[rel*='icon']");
    existingIcons.forEach(el => el.parentNode.removeChild(el));

    // 3. Create the standard 'icon' link
    const newLink = document.createElement("link");
    newLink.rel = "icon";
    // No `type` hint: eleven of the fourteen icons below are PNGs, and Firefox
    // treats `type` as a selection hint — declaring image/x-icon on a PNG makes
    // it skip the link. Let the browser sniff the bytes.
    newLink.href = fullPath;

    // 4. Create the 'shortcut icon' link (Legacy/Safari favorite)
    const shortcutLink = document.createElement("link");
    shortcutLink.rel = "shortcut icon";
    shortcutLink.href = fullPath;

    // 5. Create the 'apple-touch-icon' for Safari "Top Sites" or Bookmarks
    const appleLink = document.createElement("link");
    appleLink.rel = "apple-touch-icon";
    appleLink.href = fullPath;

    // Append all to head
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(newLink);
    head.appendChild(shortcutLink);
    head.appendChild(appleLink);

    // Update title
    document.title = title;
  }

  function getRandomService() {
    const keys = Object.keys(services);
    const key = keys[Math.floor(Math.random() * keys.length)];
    return services[key]();
  }

  let updateTimeout;
  function queueUpdate(data, delay = 150) {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => updateFaviconAndTitle(data), delay);
  }

  // Initial Grab of current state
  const currentIconTag = document.querySelector("link[rel*='icon']");
  const originalFavicon = currentIconTag ? currentIconTag.href : "/favicon.ico";
  const originalTitle = document.title;

  function handleVisibilityChange() {
    if (document.hidden) {
      queueUpdate(getRandomService());
    } else {
      queueUpdate({ title: originalTitle, favicon: originalFavicon });
    }
  }

  // Handle initial page load state
  if (!store.get("isRefreshed")) {
    if (document.hidden) {
      queueUpdate(getRandomService());
    }
  }

  store.del("isRefreshed");
  // Not beforeunload: registering one disqualifies the page from the
  // back/forward cache in Gecko and WebKit, and iOS Safari never fires it at
  // all, so the flag it wrote was dead there. pagehide fires on every engine
  // including iOS and leaves the bfcache intact.
  window.addEventListener("pagehide", () => {
    store.set("isRefreshed", "true");
  });

  document.addEventListener("visibilitychange", handleVisibilityChange);
}();