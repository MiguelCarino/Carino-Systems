document.addEventListener("DOMContentLoaded", function () {
  fetch('https://carino.systems/assets/json/environment.json')
    .then(response => response.json())
    .then(env => {
      const faUrl = env.fontAwesomeUrl;

      // Inject Font Awesome CSS
      const faLink = document.createElement('link');
      faLink.rel = 'stylesheet';
      faLink.href = faUrl;
      document.head.appendChild(faLink);

      // Inject custom styles
      const style = document.createElement('style');
      /*style.textContent = `
        .icon-link {
            text-decoration: none;
            color: #333;
            transition: color 0.3s;
        }
        .icon-link:hover {
            color: #120a8f;
            text-decoration: none;
        }
        .icon-link i {
            font-size: 20px;
        }
      `;*//*Declared in the theme*/
      document.head.appendChild(style);

      // Current page title
      const currentTitle = document.title;

      // Populate navbar and footer if content is defined
      if (typeof navContent !== 'undefined') {
        document.getElementById('navbar').innerHTML = navContent(currentTitle);
      }

      if (typeof footerContent !== 'undefined') {
        document.getElementById('footer').innerHTML = footerContent;
      }

      console.log('environment.js loaded with FA:', faUrl);
    })
    .catch(err => {
      console.error('Failed to load environment.json:', err);
    });
});
