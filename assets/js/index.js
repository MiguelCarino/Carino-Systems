document.addEventListener("DOMContentLoaded", function () {
    const phrases = [
        "「 In doubt, reboot. 」",
        "「 Viruses are often inadvertently accepted by thee. 」",
        "「 Never trust blindly. Question first. 」",
        "「 Copy your files instead of cutting them. 」",
        "「 Update when you have time; otherwise, it will update when you don't. 」",
        "「 You can't download RAM. 」",
        "「 The Cloud is mostly on land and underwater. 」",
        "「 Clean your keyboard thoroughly at least once a year. 」",
        "「 Antivirus software is useless against bad digital practices. 」",
        "「 All software is licensed, even if it's offered for free. 」",
        "「 Being 100% anonymous on the internet is virtually impossible. 」",
        "「 A reliable backup consists of three copies: two on different storage types, and one offsite. 」",
        "「 Data redundancy is not a backup. 」",
        "「 Social engineering is often more effective than hacking. 」",
        "「 Your digital footprint is permanent; think before you post. 」",
        "「 Your device is only as secure as your habits. 」",
        "「 Remembering your passwords is a flaw; use a password manager instead. 」",
        "「 AI is often a misleading commercial term, just like 'High Definition.' 」",
        "「 Automation doesn't guarantee optimization. 」"
    ];

    const randomPhraseElement = document.getElementById("random-phrase");
    if (randomPhraseElement) {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        randomPhraseElement.textContent = phrases[randomIndex];
    }

    const tilesData = [
        { type: 'small-tile', color: 'ultramarine', text: 'Operating Systems', link: 'os.html', bgVideo: 'https://github.com/MiguelCarino/AssetsAndData/raw/refs/heads/main/As/MDEud2VibTQwODE1.webm' },
        { type: 'small-tile', color: 'emerald', text: 'Software', link: 'software.html', bgVideo: 'https://github.com/MiguelCarino/AssetsAndData/raw/refs/heads/main/As/MDUud2VibTI2NjUz.webm' },
        { type: 'small-tile', color: 'crimson', text: 'Hardware', link: 'hardware.html', bgVideo: 'https://github.com/MiguelCarino/AssetsAndData/raw/refs/heads/main/As/MDMud2VibTYxMzQw.webm' },
        //{ type: 'small-tile', color: 'scarlet', text: 'Topics', link: 'topics.html', bgVideo: 'https://github.com/MiguelCarino/AssetsAndData/raw/refs/heads/main/As/MDUud2VibTI2NjUz.webm' },
        { type: 'small-tile', color: 'indigo', text: 'Streaming', link: 'streaming.html', bgVideo: 'https://github.com/MiguelCarino/AssetsAndData/raw/refs/heads/main/As/MDQud2VibTYxNzY0.webm' },
        { type: 'small-tile', color: 'coral', text: 'Music', link: 'music.html', bgVideo: 'https://github.com/MiguelCarino/AssetsAndData/raw/refs/heads/main/As/MDUud2VibTI2NjUz.webm' },
        { type: 'small-tile', color: 'plum', text: 'Graphy', link: 'graphy.html', bgVideo: 'https://github.com/MiguelCarino/AssetsAndData/raw/refs/heads/main/As/MDEud2VibTQwODE1.webm' },
        { type: 'small-tile', color: 'sapphire', text: 'Customer Support', link: 'https://support.carino.systems', bgVideo: 'https://github.com/MiguelCarino/AssetsAndData/raw/refs/heads/main/As/MDEud2VibTQwODE1.webm' },
        { type: 'small-tile', color: 'coral', text: 'Speedtest', link: 'https://speed.carino.systems', bgVideo: 'https://github.com/MiguelCarino/AssetsAndData/raw/refs/heads/main/As/MDEud2VibTQwODE1.webm' },
        { type: 'small-tile', color: 'black', text: 'Teleprompter', link: 'https://teleprompter.carino.systems', bgVideo: 'https://github.com/MiguelCarino/AssetsAndData/raw/refs/heads/main/As/MDEud2VibTQwODE1.webm' },
        { type: 'small-tile', color: 'navy', text: 'Netplan Editor', link: 'https://netplan.carino.systems', bgVideo: 'https://github.com/MiguelCarino/AssetsAndData/raw/refs/heads/main/As/MDEud2VibTQwODE1.webm' },
        // Add more tiles as needed
    ];

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