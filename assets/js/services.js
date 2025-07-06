!function () {
  const services = {
    instagram: () => createService("Messages", "https://static.cdninstagram.com/rsrc.php/v4/yI/r/VsNE-OHk_8a.png", true),
    gmail: () => createService("Inbox", "https://workspace.google.com/lp/static/images/logo-gmail.png", true),
    ubuntu: () => createService("Ubuntu", "https://assets.ubuntu.com/v1/be7e4cc6-COF-favicon-32x32.png"),
    popos: () => createService("Pop_OS!", "https://cdn11.bigcommerce.com/s-pywjnxrcr2/product_images/system76_logo-fav-32x32.png"),
    debian: () => createService("Debian", "https://www.debian.org/favicon.ico"),
    arch: () => createService("Arch Linux", "https://archlinux.org/static/favicon.png"),
    fedora: () => createService("Fedora", "https://fedoraproject.org/favicon.ico"),
    opensuse: () => createService("openSUSE", "https://www.opensuse.org/build/images/favicon.png"),
    redhat: () => createService("Red Hat", "https://www.redhat.com/favicon.ico"),
    gentoo: () => createService("Gentoo", "https://www.gentoo.org/favicon.ico"),
    guix: () => createService("Guix", "https://guix.gnu.org/themes/initial/img/icon.png"),
    kernel: () => createService("Linux Kernel", "https://www.kernel.org/theme/images/logos/favicon.png"),
    fourchan: () => createService("4chan - Replies", "https://s.4cdn.org/image/favicon.ico", true),
    outlook: () => createService("Inbox", "https://res-h3.public.cdn.office.net/owamail/20230414002.05/resources/images/favicons/mail-unseen.ico", true),
    steamps2: () => createService("PlanetSide 2", "https://store.steampowered.com/favicon.ico")
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
    const out = "?v=" + Math.random().toString(36).substr(2, 9);
    const newLink = document.createElement("link");
    newLink.rel = "icon";
    newLink.type = "image/x-icon";
    newLink.href = favicon + out;

    const old = document.querySelector("link[rel='icon']");
    if (old) old.remove();
    document.head.appendChild(newLink);
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

  const shortcut = document.querySelector("link[rel='shortcut icon']");
  const icon = document.querySelector("link[rel='icon']");
  const originalFavicon = shortcut?.href || icon?.href || "/favicon.ico";
  const originalTitle = document.title;

  function handleVisibilityChange() {
    if (document.hidden) {
      queueUpdate(getRandomService());
    } else {
      queueUpdate({ title: originalTitle, favicon: originalFavicon });
    }
  }

  if (!sessionStorage.getItem("isRefreshed")) {
    // First load
    if (document.hidden) {
      queueUpdate(getRandomService());
    } else {
      queueUpdate({ title: originalTitle, favicon: originalFavicon }, 200);
    }
  }

  sessionStorage.removeItem("isRefreshed");
  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("isRefreshed", "true");
  });

  document.addEventListener("visibilitychange", handleVisibilityChange);
}();