document.addEventListener("DOMContentLoaded", function () {
    const phrases = [
        "「 In doubt, reboot. 」",
        "「 Viruses are often inadvertently accepted, but you may not have noticed. 」",
        "「 Never trust brands, only reviews. 」",
        "「 Always copy your files, never cut them. 」",
        "「 Update your system when you can; otherwise, it will update when you don't. 」",
        "「 You can't download RAM. 」",
        "「 The Cloud is mostly on land and underwater. 」",
        "「 Clean your keyboard thoroughly at least once a year; don't ask. 」",
        "「 Antivirus software is malware that hates competition. 」",
        "「 All software is licensed, even if it's free. 」",
        "「 There's no way you can be 100% anonymous on the internet. 」",
        "「 A real backup is made by three copies, on two different types of storage, with one copy offsite. 」",
        "「 Data redundancy is not a backup. 」",
        "「 Remembering your passwords is a flaw; use a password manager instead. 」",
        "「 AI is a misleading commercial term, just like 'High Definition.' 」",
        "「 Automation doesn't imply optimization. 」"
    ];

    const randomPhraseElement = document.getElementById("random-phrase");
    if (randomPhraseElement) {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        randomPhraseElement.textContent = phrases[randomIndex];
    }

    const tilesData = [
        { type: 'small-tile', color: 'ultramarine', text: "RPA", link: '#', bgVideo: 'https://samplelib.com/lib/preview/webm/sample-5s.webm' },
        { type: 'small-tile', color: 'emerald', text: "Cybersecurity", link: '#', bgVideo: 'https://samplelib.com/lib/preview/webm/sample-5s.webm' },
        { type: 'small-tile', color: 'scarlet', text: "Containers", link: '#', bgVideo: 'https://samplelib.com/lib/preview/webm/sample-5s.webm' },
        { type: 'small-tile', color: 'crimson', text: "Red Hat Enterprise Linux (RHEL)", link: '#', bgVideo: 'https://samplelib.com/lib/preview/webm/sample-5s.webm' },
        { type: 'small-tile', color: 'indigo', text: "Fedora Project", link: '#', bgVideo: 'https://samplelib.com/lib/preview/webm/sample-5s.webm' },
    ];
    /*{ type: 'small-tile', color: 'indigo', text: "Git Version Control", link: 'https://git-scm.com/', bgVideo: 'https://samplelib.com/lib/preview/webm/sample-5s.webm' },
        { type: 'small-tile', color: 'scarlet', text: "Ansible Automation", link: 'https://www.ansible.com/', bgVideo: 'https://samplelib.com/lib/preview/webm/sample-5s.webm' },
        { type: 'small-tile', color: 'ultramarine', text: "Linux Command Line Basics", link: 'https://linuxcommand.org/', bgVideo: 'https://samplelib.com/lib/preview/webm/sample-5s.webm' },
        { type: 'small-tile', color: 'emerald', text: "Nginx Web Server", link: 'https://www.nginx.com/', bgVideo: 'https://samplelib.com/lib/preview/webm/sample-5s.webm' },
        { type: 'small-tile', color: 'indigo', text: "Bash Scripting", link: 'https://www.gnu.org/software/bash/', bgVideo: 'https://samplelib.com/lib/preview/webm/sample-5s.webm' },
        { type: 'small-tile', color: 'scarlet', text: "SELinux Security", link: 'https://selinuxproject.org/', bgVideo: 'https://samplelib.com/lib/preview/webm/sample-5s.webm' },
        { type: 'small-tile', color: 'ultramarine', text: "Systemd", link: 'https://www.freedesktop.org/wiki/Software/systemd/', bgVideo: 'https://samplelib.com/lib/preview/webm/sample-5s.webm' },
        { type: 'small-tile', color: 'scarlet', text: "CentOS Stream", link: 'https://www.centos.org/centos-stream/', bgVideo: 'https://samplelib.com/lib/preview/webm/sample-5s.webm' },
        { type: 'small-tile', color: 'indigo', text: "LibreOffice Suite", link: 'https://www.libreoffice.org/', bgVideo: 'https://samplelib.com/lib/preview/webm/sample-5s.webm' },
        { type: 'small-tile', color: 'scarlet', text: "Virtualization with KVM", link: 'https://www.linux-kvm.org/', bgVideo: 'https://samplelib.com/lib/preview/webm/sample-5s.webm' },
        { type: 'small-tile', color: 'indigo', text: "Nextcloud for Self-hosting", link: 'https://nextcloud.com/', bgVideo: 'https://samplelib.com/lib/preview/webm/sample-5s.webm' },*/
    

    const tilesContainer = document.querySelector('.tiles');

    tilesData.forEach((tile, index) => {
        const tileElement = document.createElement('a');
        tileElement.href = tile.link;
        tileElement.className = `tile ${tile.type} ${tile.color}`;
        tileElement.textContent = tile.text;
        tileElement.style.animationDelay = `${index * 0.1}s`; // Delay each tile's animation

        // Create a video element for the background
        const videoElement = document.createElement('video');
        videoElement.src = tile.bgVideo;
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.muted = true; // Mute to allow autoplay in most browsers
        videoElement.className = 'tile-bg-video';

        // Append the video element to the tile
        tileElement.appendChild(videoElement);

        // Append the tile to the container
        tilesContainer.appendChild(tileElement);
    });
    
    /*const contrastButton = document.getElementById('contrastToggle');
    let contrastMode = 0;
    contrastButton.addEventListener('click', () => {
        contrastMode = (contrastMode + 1) % 3;
        if (contrastMode === 0) {
            document.body.className = '';
        } else if (contrastMode === 1) {
            document.body.className = 'white-mode';
        } else {
            document.body.className = 'high-contrast, high-contrast-tile';
        }
    });*/
});