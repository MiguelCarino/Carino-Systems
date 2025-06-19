!function() {
  // Services with title and favicon
  const services = {
    instagram: function() { return createService("Instagram", "https://static.cdninstagram.com/rsrc.php/v4/yI/r/VsNE-OHk_8a.png", true, "Messages"); },
    gmail: function() { return createService("Inbox", "https://workspace.google.com/lp/static/images/logo-gmail.png", true, "Inbox"); },
    ubuntu: function() { return createService("Ubuntu - Linux for human beings", 'https://assets.ubuntu.com/v1/be7e4cc6-COF-favicon-32x32.png', false, "Ubuntu"); },
    popos: function() { return createService("Pop_OS!", 'https://cdn11.bigcommerce.com/s-pywjnxrcr2/product_images/system76_logo-fav-32x32.png', false, "Pop_OS!"); },
    debian: function() { return createService("Debian - The Universal Operating System", 'https://www.debian.org/favicon.ico', false, "Debian"); },
    arch: function() { return createService("Arch Linux", 'https://archlinux.org/static/favicon.png', false, "Arch Linux"); },
    fedora: function() { return createService("Fedora", 'https://fedoraproject.org/favicon.ico', false, "Fedora"); },
    opensuse: function() { return createService("openSUSE", 'https://www.opensuse.org/build/images/favicon.png', false, "openSUSE"); },
    redhat: function() { return createService("Red Hat", 'https://www.redhat.com/favicon.ico', false, "Red Hat"); },
    gentoo: function() { return createService("Gentoo", 'https://www.gentoo.org/favicon.ico', false, "Gentoo"); },
    guix: function() { return createService("Guix", 'https://guix.gnu.org/themes/initial/img/icon.png', false, "Guix"); },
    kernel: function() { return createService("The Linux Kernel Archives", 'https://www.kernel.org/theme/images/logos/favicon.png', false, "Linux Kernel"); },
    fourchan: function() { return createService("4chan", "https://s.4cdn.org/image/favicon.ico", true, "4chan - Replies"); },
    outlook: function() { return createService("Outlook", "https://res-h3.public.cdn.office.net/owamail/20230414002.05/resources/images/favicons/mail-unseen.ico", true, "Inbox"); },
    tinder: function() { return createService("Tinder", "https://tinder.com/favicon-32x32.png", true, "Messages"); }
  };

  // Create a service object with title, favicon, and custom text, and an optional dynamic count
  function createService(title, favicon, isDynamic = false, customText = "Inbox") {
    console.log(`Creating service: ${customText}`); // Debugging: Log service creation
    if (isDynamic) {
      const count = Math.round(Math.random() * 13); // Random count for services like Gmail
      const emailCount = count === 10 ? '50+' : (count === 12 ? '100+' : count);
      title = `${customText} (${emailCount})`;  // Set custom text with dynamic count
    } else {
      title = `${customText}`;  // Use the custom text if not dynamic
    }
    return { title, favicon };
  }

  // Update favicon and title dynamically
  function updateFaviconAndTitle(data) {
    console.log("Updating favicon and title with data:", data); // Debugging: Log data being updated
    const out = `?v=${Math.random().toString(36).substr(2, 9)}`; // Cache-busting query
    const link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = `${data.favicon}${out}`;

    // Log to check if we're adding the new favicon link
    console.log("Adding new favicon with URL:", link.href);

    // Remove old favicon
    const oldFavicon = document.querySelector("link[rel='icon']");
    if (oldFavicon) oldFavicon.remove();

    document.head.appendChild(link);
    document.title = data.title;
  }

  // Handle tab visibility change
  function handleVisibilityChange() {
    console.log("Visibility change triggered. Document hidden:", document.hidden); // Debugging: Log visibility state
    if (document.hidden) {
      console.log("Tab is now hidden, setting random service.");
      setRandomService();
    } else {
      console.log("Tab is now active, restoring original state.");
      restoreOriginalState();
    }
  }

  // Set a random service from the list
  function setRandomService() {
    console.log("Setting random service..."); // Debugging: Log when random service is set
    // Dynamically get the service names from the keys of the `services` object
    const serviceNames = Object.keys(services);
    const randomServiceName = serviceNames[Math.floor(Math.random() * serviceNames.length)];
    console.log("Random service selected:", randomServiceName); // Debugging: Log selected service name
    updateFaviconAndTitle(services[randomServiceName]());
  }

  // Restore original favicon and title
  function restoreOriginalState() {
    console.log("Restoring original favicon and title..."); // Debugging: Log restoration process
    updateFaviconAndTitle({ title: originalTitle, favicon: originalFavicon });
  }

  // Initialize the favicon manager
  let originalFavicon = document.querySelector("[rel='shortcut icon']") ? 
                        document.querySelector("[rel='shortcut icon']").href : 
                        'https://carino.systems/assets/images/logo.webp';
  let originalTitle = document.title;

  console.log("Initial title:", originalTitle); // Debugging: Log initial title
  console.log("Initial favicon:", originalFavicon); // Debugging: Log initial favicon

  // Listen for visibility change event
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Prevent favicon changes if the page is refreshed
  if (!sessionStorage.getItem('isRefreshed')) {
    console.log('Page loaded normally');
  } else {
    console.log('Page was refreshed, skipping favicon/title change');
    sessionStorage.removeItem('isRefreshed');
  }

  // Mark page as refreshed on reload
  window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('isRefreshed', 'true');
  });

  // Initialize the favicon manager
  console.log("Initial random service will be set.");
  setRandomService(); // Optionally call this to set an initial random service

  // Additional debugging to show what's happening with the visibility state:
  setInterval(() => {
    console.log("Current document visibility state:", document.hidden ? "Hidden" : "Visible");
  }, 5000); // Log visibility state every 5 seconds
}();
