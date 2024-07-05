document.addEventListener("DOMContentLoaded", function() {
    // Navigation content
    const navContent = `
        <div class="logo"><a href="#home"><b style="color: #ffffff">Carino</b> <b style="color: #000000">Systems™</b></a></div>
        <ul>
            <li><a href="https://github.com/MiguelCarino" class="icon brands alt fa-github"><span class="label">Github</span></a></li>
            <li><a href="https://www.linkedin.com/in/miguelcarino94" class="icon brands alt fa-linkedin"><span class="label">LinkedIn</span></a></li>
            <li><a href="https://mastodon.social/@miguelcarino" class="icon brands alt fa-mastodon"><span class="label">Mastodon</span></a></li>
        </ul>
    `;
    document.getElementById('navbar').innerHTML = navContent;

    // Footer content
    const footerContent = `
         <p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://carino.systems">Carino Systems™</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/MiguelCarino">Miguel Carino</a> is marked with <a href="https://creativecommons.org/publicdomain/zero/1.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC0 1.0 Universal<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/zero.svg?ref=chooser-v1" alt=""></a></p> 
    `;
    document.getElementById('footer').innerHTML = footerContent;
});
