const freeSoftware = [
    {
        id: 'Web Browser',
        url: 'https://www.mozilla.org/en-US/firefox/new/',
        solution: 'Firefox',
        cdeb: 'firefox',
        cfed: 'firefox',
        cwin: 'Mozilla.Firefox',
        cmac: '--cask firefox'
    },
    {
        id: 'Office Suite',
        url: 'https://www.onlyoffice.com/download-desktop.aspx',
        solution: 'Only Office',
        cdeb: '&& wget https://download.onlyoffice.com/install/desktop/editors/linux/onlyoffice-desktopeditors_amd64.deb && sudo dpkg -i onlyoffice-desktopeditors_amd64.deb && rm onlyoffice-desktopeditors_amd64.deb',
        cfed: 'https://download.onlyoffice.com/install/desktop/editors/linux/onlyoffice-desktopeditors.x86_64.rpm',
        cwin: 'ONLYOFFICE.DesktopEditors',
        cmac: '--cask onlyoffice'
    },/*
    {
        id: 'Popular Web Browser',
        url: 'https://www.chromium.org/getting-involved/download-chromium/',
        solution: 'Chromium',
        cdeb: '#',
        cfed: 'chromium',
        cwin: 'Hibbiki.Chromium',
        cmac: '--cask chromium'
    },*/
    {
        id: 'Media Player',
        url: 'https://mpv.io/installation/',
        solution: 'mpv',
        cdeb: 'mpv',
        cfed: 'mpv',
        cwin: 'tsl0922.ImPlay',
        cmac: 'mpv'
    },
    {
        id: 'PDF Reader',
        url: 'https://okular.kde.org/',
        solution: 'Okular',
        cdeb: 'okular',
        cfed: 'okular',
        cwin: 'KDE.Okular',
        cmac: 'okular'
    },
    {
        id: 'Data Compression',
        url: 'https://www.7-zip.org/download.html',
        solution: '7zip',
        cdeb: '7zip',
        cfed: 'p7zip',
        cwin: 'M2Team.NanaZip',
        cmac: 'sevenzip'
    },
    /*{
        id: 'Office Suite',
        url: 'https://www.libreoffice.org/download/download-libreoffice/',
        solution: 'Libre Office',
        cdeb: '#',
        cfed: 'libreoffice',
        cwin: 'TheDocumentFoundation.LibreOffice',
        cmac: '--cask libreoffice'
    },*/
    {
        id: 'Mail Client',
        url: 'https://www.thunderbird.net/en-US/download/',
        solution: 'Thunderbird',
        cdeb: 'thunderbird',
        cfed: 'thunderbird',
        cwin: 'Mozilla.Thunderbird',
        cmac: '--cask thunderbird'
    },
    {
        id: 'Note-Taking',
        url: 'https://joplinapp.org/',
        solution: 'Joplin',
        cdeb: 'flatpak && flatpak install flathub net.cozic.joplin_desktop',
        cfed: 'flatpak && flatpak install flathub net.cozic.joplin_desktop',
        cwin: 'Joplin.Joplin',
        cmac: '--cask joplin'
    },
    {
        id: 'Easy Password Manager',
        url: 'https://buttercup.pw/',
        solution: 'Buttercup',
        cdeb: 'sorry, not available',
        cfed: 'sorry, not available',
        cwin: 'Buttercup.Buttercup',
        cmac: '--cask buttercup'
    },
    {
        id: 'Advanced Password Manager',
        url: 'https://buttercup.pw/',
        solution: 'KeepassXC',
        cdeb: 'keepassxc',
        cfed: 'keepassxc',
        cwin: 'KeePassXCTeam.KeePassXC',
        cmac: '--cask keepassxc'
    },
    {
        id: 'Audio Editor',
        url: 'https://www.audacityteam.org/',
        solution: 'Audacity',
        cdeb: 'audacity',
        cfed: 'audacity',
        cwin: 'Audacity.Audacity',
        cmac: '--cask audacity'
    },
    {
        id: 'Code Editor',
        url: 'https://vscodium.com/',
        solution: 'VSCodium',
        cdeb: '&& wget https://github.com/VSCodium/vscodium/releases/download/1.90.1.24165/codium_1.90.1.24165_amd64.deb && sudo dpkg -i codium_1.90.1.24165_amd64.deb && rm codium_1.90.1.24165_amd64.deb',
        cfed: 'https://github.com/VSCodium/vscodium/releases/download/1.90.1.24165/codium-1.90.1.24165-el7.x86_64.rpm',
        cwin: 'VSCodium.VSCodium',
        cmac: '--cask vscodium'
    },
    {
        id: 'Time and Activity Tracker',
        url: 'https://activitywatch.net/downloads/',
        solution: 'ActivityWatch',
        cdeb: 'sorry, not available',
        cfed: 'sorry, not available',
        cwin: 'ActivityWatch.ActivityWatch',
        cmac: '--cask activitywatch'
    },
    {
        id: 'Relational Database',
        url: 'https://mariadb.org/',
        solution: 'MariaDB',
        cdeb: 'mariadb-server',
        cfed: 'mariadb',
        cwin: 'MariaDB.Server',
        cmac: 'mariadb'
    },
    {
        id: 'Object Relational Database',
        url: 'https://www.postgresql.org',
        solution: 'PostgreSQL',
        cdeb: 'postgresql-12',
        cfed: 'postgresql',
        cwin: 'PostgreSQL.PostgreSQL',
        cmac: 'postgresql@14'
    },
    {
        id: 'Digital Forensics Platform',
        url: 'https://www.autopsy.com/download/',
        solution: 'Autopsy',
        cdeb: 'sleuthkit',
        cfed: 'sleuthkit',
        cwin: 'SleuthKit.Autopsy',
        cmac: 'autopsy'
    },
    {
        id: '3D Modelling',
        url: 'https://www.blender.org/download/',
        solution: 'Blender',
        cdeb: 'blender',
        cfed: 'blender',
        cwin: 'BlenderFoundation.Blender',
        cmac: '--cask blender'
    },
    {
        id: 'Game engine',
        url: 'https://godotengine.org/',
        solution: 'Godot',
        cdeb: 'godot3',
        cfed: 'godot',
        cwin: 'GodotEngine.GodotEngine',
        cmac: '--cask godot'
    },
    {
        id: 'System Benchmarking',
        url: 'https://novabench.com/',
        solution: 'Novabench',
        cdeb: 'sorry, not available',
        cfed: 'sorry, not available',
        cwin: 'sorry, not available',
        cmac: '--cask novabench'
    },
    {
        id: 'Universal Database Tool',
        url: 'https://dbeaver.io/',
        solution: 'DBeaver',
        cdeb: '&& wget https://dbeaver.io/files/dbeaver-ce_latest_amd64.deb && sudo dpkg -i dbeaver-ce_latest_amd64.deb && rm dbeaver-ce_latest_amd64.deb',
        cfed: 'https://dbeaver.io/files/dbeaver-ce-latest-stable.x86_64.rpm',
        cwin: 'dbeaver.dbeaver',
        cmac: '--cask dbeaver-community'
    },
    {
        id: 'Offline Text-to-image generation',
        url: 'https://easydiffusion.github.io/',
        solution: 'EasyDiffusion',
        cdeb: 'sorry, not available',
        cfed: 'sorry, not available',
        cwin: 'sorry, not available',
        cmac: 'sorry, not available'
    },
    {
        id: 'Multimedia Framework',
        url: 'https://ffmpeg.org/',
        solution: 'FFmpeg',
        cdeb: 'ffmpeg',
        cfed: 'ffmpeg',
        cwin: 'Gyan.FFmpeg',
        cmac: 'ffmpeg'
    },
    {
        id: 'Graphics Editor',
        url: 'https://www.gimp.org/downloads/',
        solution: 'Gimp',
        cdeb: 'gimp',
        cfed: 'gimp',
        cwin: 'GIMP.GIMP',
        cmac: '--cask gimp'
    },
    {
        id: 'Font Editor',
        url: 'https://fontforge.org',
        solution: 'Fontforge',
        cdeb: 'fontforge',
        cfed: 'fontforge',
        cwin: 'FontForge.FontForge',
        cmac: 'fontforge'
    },
    {
        id: 'Easy Offline "gpt" Large Language Models',
        url: 'https://gpt4all.io/',
        solution: 'gpt4all',
        cdeb: 'sorry, not available',
        cfed: 'sorry, not available',
        cwin: 'sorry, not available',
        cmac: 'sorry, not available'
    },
    {
        id: 'Offline "gpt" Large Language Models',
        url: 'https://lmstudio.ai/',
        solution: 'lmstudio',
        cdeb: '#',
        cfed: '',
        cwin: '',
        cmac: ''
    },
    {
        id: 'Vector Graphics Editor',
        url: 'https://inkscape.org/',
        solution: 'Inkscape',
        cdeb: 'inkscape',
        cfed: 'inkscape',
        cwin: 'Inkscape.Inkscape',
        cmac: '--cask inkscape'
    },
    {
        id: 'Media Server',
        url: 'https://jellyfin.org/downloads/',
        solution: 'Jellyfin',
        cdeb: '&& wget https://repo.jellyfin.org/files/server/debian/latest-stable/amd64/jellyfin-server_10.9.6+deb12_amd64.deb && sudo dpkg -i jellyfin-server_10.9.6+deb12_amd64.deb && rm jellyfin-server_10.9.6+deb12_amd64.deb ',
        cfed: 'jellyfin',
        cwin: 'Jellyfin.Server',
        cmac: '--cask jellyfin'
    },
    {
        id: 'Simple Video Editor',
        url: 'https://shotcut.org/',
        solution: 'Shotcut',
        cdeb: 'shotcut',
        cfed: 'flatpak && flatpak install flathub org.shotcut.Shotcut',
        cwin: 'Meltytech.Shotcut',
        cmac: '--cask shotcut'
    },
    {
        id: 'Advanced Video Editor',
        url: 'https://kdenlive.org/en/download',
        solution: 'Kdenlive',
        cdeb: 'kdenlive',
        cfed: 'kdenlive',
        cwin: 'KDE.Kdenlive',
        cmac: '--cask kdenlive'
    },
    {
        id: 'Screen Recording and Livestreaming',
        url: 'https://obsproject.com/download',
        solution: 'OBS',
        cdeb: 'obs-studio',
        cfed: 'obs-studio',
        cwin: 'OBSProject.OBSStudio',
        cmac: '--cask obs'
    },
    {
        id: 'Remote Control Client',
        url: 'https://github.com/rustdesk/rustdesk/releases/latest',
        solution: 'RustDesk',
        cdeb: '&& wget https://github.com/rustdesk/rustdesk/releases/download/1.2.3-2/rustdesk-1.2.3-2-x86_64.deb && sudo dpkg -i rustdesk-1.2.3-2-x86_64.deb && rm rustdesk-1.2.3-2-x86_64.deb',
        cfed: 'https://github.com/rustdesk/rustdesk/releases/download/1.2.5/rustdesk-1.2.5-0.x86_64.rpm',
        cwin: 'RustDesk.RustDesk',
        cmac: '--cask rustdesk'
    },
    {
        id: 'Graphics Editor',
        url: 'https://krita.org/',
        solution: 'Krita',
        cdeb: 'krita',
        cfed: 'krita',
        cwin: 'KDE.Krita',
        cmac: '--cask krita'
    },
    {
        id: 'Torrent Client',
        url: 'https://www.qbittorrent.org/download',
        solution: 'qBitTorrent',
        cdeb: 'qbittorrent',
        cfed: 'qbittorrent',
        cwin: 'qBittorrent.qBittorrent',
        cmac: '--cask qbittorrent'
    },
    {
        id: 'Containers and Kubernetes',
        url: 'https://podman-desktop.io/',
        solution: 'Podman',
        cdeb: 'flatpak && flatpak install flathub io.podman_desktop.PodmanDesktop',
        cfed: 'flatpak && flatpak install flathub io.podman_desktop.PodmanDesktop',
        cwin: 'RedHat.Podman-Desktop',
        cmac: 'podman-desktop'
    },
    {
        id: 'Geographic information system',
        url: 'https://qgis.org',
        solution: 'QGIS',
        cdeb: 'qgis',
        cfed: 'qgis',
        cwin: 'OSGeo.QGIS',
        cmac: '--cask qgis'
    },
    {
        id: 'Collaborative platform',
        url: 'https://nextcloud.com/',
        solution: 'Nextcloud',
        cdeb: 'sorry, not available',
        cfed: 'nextcloud',
        cwin: 'Nextcloud.NextcloudDesktop',
        cmac: '--cask nextcloud'
    },
    {
        id: 'Collaborative global map',
        url: 'https://www.openstreetmap.org/',
        solution: 'Open Street Map',
        cdeb: 'gnome-maps',
        cfed: 'gnome-maps',
        cwin: 'sorry, not available',
        cmac: 'sorry, not available'
    },
    {
        id: 'Offline Web Browser',
        url: 'https://kiwix.org/',
        solution: 'Kiwix',
        cdeb: 'flatpak && flatpak install flathub org.kiwix.desktop',
        cfed: 'flatpak && flatpak install flathub org.kiwix.desktop',
        cwin: 'Kiwix.KiwixJS',
        cmac: '--cask kiwix'
    },
    {
        id: 'Planetarium (Astronomy)',
        url: 'https://stellarium.org/',
        solution: 'Stellarium',
        cdeb: 'stellarium',
        cfed: 'stellarium',
        cwin: 'Stellarium.Stellarium',
        cmac: '--cask stellarium'
    },
    {
        id: 'Continuous File Synchronization',
        url: 'https://syncthing.net/',
        solution: 'Syncthing',
        cdeb: '#',
        cfed: 'syncthing',
        cwin: 'SyncTrayzor.SyncTrayzor',
        cmac: 'syncthing'
    },
    {
        id: 'Flight Simulator',
        url: 'https://www.flightgear.org',
        solution: 'FlightGear',
        cdeb: 'flightgear',
        cfed: 'FlightGear',
        cwin: 'FlightGear.FlightGear',
        cmac: '--cask flightgear'
    },
    {
        id: 'Music Notation',
        url: 'https://musescore.org/',
        solution: 'MuseScore',
        cdeb: 'musescore',
        cfed: 'musescore',
        cwin: 'Musescore.Musescore',
        cmac: '--cask musescore'
    },
    {
        id: 'Video player for studying Japanese (with anime)',
        url: 'https://ripose-jp.github.io/Memento/',
        solution: 'Memento',
        cdeb: 'flatpak && flatpak install io.github.ripose_jp.Memento',
        cfed: 'flatpak && flatpak install io.github.ripose_jp.Memento',
        cwin: 'Ripose.Memento',
        cmac: 'sorry, not available'
    },
    {
        id: 'Microsoft Windows Recall alternative',
        url: 'https://github.com/openrecall/openrecall',
        solution: 'openrecall',
        cdeb: 'git python3 && python3 -m pip install --upgrade --no-cache-dir git+https://github.com/openrecall/openrecall.git',
        cfed: 'git python3 && python3 -m pip install --upgrade --no-cache-dir git+https://github.com/openrecall/openrecall.git',
        cwin: 'Ripose.Memento',
        cmac: 'sorry, not available'
    },
    {
        id: 'Create bootable USB for multiple ISO files',
        url: 'https://www.ventoy.net/en/download.html',
        solution: 'Ventoy',
        cdeb: 'sorry, not available',
        cfed: 'sorry, not available',
        cwin: 'ventoy.Ventoy',
        cmac: 'sorry, not available'
    },
    {
        id: 'Torrent streaming on the desktop',
        url: 'https://webtorrent.io/',
        solution: 'webtorrent',
        cdeb: 'sorry, not available',
        cfed: 'sorry, not available',
        cwin: 'sorry, not available',
        cmac: '--cask webtorrent'
    },
    {
        id: 'Setup Script for Linux and Windows Systems',
        url: 'https://carino.systems/os.html',
        solution: 'carinosetup',
        cdeb: 'wget curl && bash <(curl -s https://carino.systems/setup.sh)',
        cfed: 'wget curl && bash <(curl -s https://carino.systems/setup.sh)',
        cwin: 'upgrade --all; iwr -useb https://carino.systems/setup.ps1 | iex',
        cmac: 'sorry, not available'
    },
    {
        id: 'Offline neural machine language translation',
        url: 'https://www.argosopentech.com/',
        solution: 'Argos Translate',
        cdeb: 'python pip && pip install argostranslategui',
        cfed: 'python pip && pip install argostranslategui',
        cwin: 'sorry, not available',
        cmac: 'sorry, not available'
    },
    {
        id: 'Convert Files Easy Offline',
        url: 'https://file-converter.io/',
        solution: 'File Converter',
        cdeb: 'python pip && pip install argostranslategui',
        cfed: 'python pip && pip install argostranslategui',
        cwin: 'AdrienAllard.FileConverter',
        cmac: 'sorry, not available'
    }
];

const documents = [
    {
        id: 'Technical Documentation',
        url1: 'https://bing.com/',
        url2: 'https://google.com/',
        url3: 'https://yandex.com/',
        solution: '',
    },
    {
        id: 'Quote',
        url1: 'https://bing.com/',
        url2: 'https://google.com/',
        url3: 'https://yandex.com/',
        solution: '',
    },
    {
        id: 'Inventory',
        url1: 'https://bing.com/',
        url2: 'https://google.com/',
        url3: 'https://yandex.com/',
        solution: '',
    },
    {
        id: 'Client list',
        url1: 'https://bing.com/',
        url2: 'https://google.com/',
        url3: 'https://yandex.com/',
        solution: '',
    },
    {
        id: 'Quote',
        url1: 'https://bing.com/',
        url2: 'https://google.com/',
        url3: 'https://yandex.com/',
        solution: '',
    }
];

const commercialSoftware = [
{
        id: 'Photo Editor',
        url: 'https://www.adobe.com/products/photoshop.html',
        solution: 'Adobe Photoshop',
        cdeb: 'Sorry, not available',
        cfed: 'Sorry, not available',
        cwin: 'Sorry, not available',
        cmac: '--cask adobe-photoshop'
    },
    {
        id: 'Video Editor',
        url: 'https://www.adobe.com/products/premiere.html',
        solution: 'Adobe Premiere Pro',
        cdeb: 'Sorry, not available',
        cfed: 'Sorry, not available',
        cwin: 'Sorry, not available',
        cmac: '--cask adobe-premiere-pro'
    },
    {
        id: 'PDF Reader',
        url: 'https://www.adobe.com/products/acrobat-pro-cc.html',
        solution: 'Adobe Acrobat Pro',
        cdeb: 'Sorry, not available',
        cfed: 'Sorry, not available',
        cwin: 'Adobe.Acrobat.Reader.64-bit',
        cmac: '--cask adobe-acrobat-pro'
    },
    {
        id: 'Video Frame Interpolation',
        url: 'https://www.svp-team.com/',
        solution: 'SmoothVideo Project',
        cdeb: 'Sorry, not available',
        cfed: 'Sorry, not available',
        cwin: 'Adobe.Acrobat.Reader.64-bit',
        cmac: '--cask adobe-acrobat-pro'
    },
    {
        id: 'Remote Control Client',
        url: 'https://anydesk.com/',
        solution: 'AnyDesk',
        cdeb: '&& wget https://download.anydesk.com/linux/anydesk_6.3.2-1_amd64.deb && sudo dpkg -i anydesk_6.3.2-1_amd64.deb && rm anydesk_6.3.2-1_amd64.deb',
        cfed: 'https://download.anydesk.com/linux/anydesk-6.3.2-1.el8.x86_64.rpm',
        cwin: 'AnyDeskSoftwareGmbH.AnyDesk',
        cmac: '--cask anydesk'
    },
    {
        id: 'Containers and Kubernetes',
        url: 'https://www.docker.com/',
        solution: 'Docker',
        cdeb: 'docker',
        cfed: 'dnf-plugins-core && sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo && sudo dnf install docker-ce docker-ce-cli containerd.io',
        cwin: 'Docker.DockerDesktop',
        cmac: 'docker'
    },
    {
        id: 'Video game digital distribution service',
        url: 'https://store.steampowered.com/about/',
        solution: 'Steam',
        cdeb: 'steam',
        cfed: 'steam',
        cwin: 'Valve.Steam',
        cmac: '--cask steam'
    },
    {
        id: 'Add USB boot support to computers with no BIOS support',
        url: 'https://www.plop.at/en/bootmanager/download.html',
        solution: 'Plop Boot',
        cdeb: 'Sorry, not available',
        cfed: 'Sorry, not available',
        cwin: 'Sorry, not available',
        cmac: 'Sorry, not available'
    }
];

const websites = [
    {
        id: 'Windows "winget" package browser',
        url: 'https://winget.run/',
        solution: 'Winget.run'
    },
    {
        id: 'macOS "brew" package browser',
        url: 'https://formulae.brew.sh/',
        solution: 'formulae.brew.sh'
    },
    {
        id: 'Internet Speed Test',
        url: 'https://openspeedtest.com/',
        solution: 'openspeedtest.com'
    },
    {
        id: 'Hardware Database',
        url: 'https://www.techpowerup.com/',
        solution: 'techpowerup.com'
    },
    {
        id: 'Japanese dictionary',
        url: 'https://jisho.org/',
        solution: 'jisho.org'
    },
    {
        id: 'Live Airplane Traffic Map Monitor',
        url: 'https://www.flightradar24.com',
        solution: 'flightradar24.com'
    },
    {
        id: 'Live Marine Traffic Map Monitor',
        url: 'https://www.marinetraffic.com',
        solution: 'marinetraffic.com'
    },
    {
        id: 'Global Railway Infrastructure Map',
        url: 'https://www.openrailwaymap.org/',
        solution: 'openrailwaymap.org'
    },
    {
        id: 'Live Global Radio Monitor',
        url: 'https://radio.garden/',
        solution: 'radio.garden'
    },
    {
        id: 'Chat GPT',
        url: 'https://chatgpt.com/',
        solution: 'chatGPT'
    },
    {
        id: 'Ad-blocking YouTube front-end',
        url: 'https://invidious.io/',
        solution: 'invidious'
    },
    {
        id: 'Unicode Character Catalog',
        url: 'https://www.compart.com/en/unicode/',
        solution: 'compart.com'
    },
    {
        id: 'Microsoft Update Catalog',
        url: 'https://www.catalog.update.microsoft.com/',
        solution: 'Microsoft Update'
    },
    {
        id: 'Google Font Catalog',
        url: 'https://fonts.google.com/',
        solution: 'Google Font'
    },
    {
        id: 'ASCII Art Catalog and Tools',
        url: 'https://www.asciiart.eu/',
        solution: 'Ascii Art'
    },
    {
        id: 'Random Linux Distro',
        url: 'https://distro.moe/',
        solution: 'Distro.moe'
    },
    {
        id: 'ASCII-based Movie Theater',
        url: 'https://ascii.theater/',
        solution: 'Ascii Theater'
    },
    {
        id: 'Redeem Microsoft Product Keys',
        url: 'https://signup.microsoft.com/get-started/setupKey',
        solution: 'Microsoft Product Keys'
    },
    {
        id: 'Global DNS Propagation Checker',
        url: 'https://www.whatsmydns.net/',
        solution: 'whatsmydns.net'
    },
    {
        id: 'Summarized Terms of Service',
        url: 'https://tosdr.org/',
        solution: 'tosdr.org'
    },
    {
        id: 'SSL Configuration Generator',
        url: 'https://ssl-config.mozilla.org/',
        solution: 'ssl-config.mozilla.org'
    },
    {
        id: 'SSH Audit and Hardening',
        url: 'https://www.ssh-audit.com/',
        solution: 'ssh-audit.com'
    },
    {
        id: 'Typing practice with literature',
        url: 'https://www.typelit.io/',
        solution: 'typelit.io'
    },
    {
        id: 'Largest truly open library',
        url: 'https://annas-archive.org/',
        solution: 'annas-archive.org'
    },
    {
        id: 'Muscle and Workout Wiki',
        url: 'https://musclewiki.com/',
        solution: 'musclewiki.com'
    },
    {
        id: 'Scan files, domains and links for virus/malware',
        url: 'https://www.virustotal.com/',
        solution: 'virustotal.com'
    },
    {
        id: 'Watch online videos together',
        url: 'https://w2g.tv/',
        solution: 'w2g.tv'
    },
    {
        id: 'NVIDIA Drivers',
        url: 'https://www.nvidia.com/Download/index.aspx',
        solution: 'nvidia.com'
    },
    {
        id: 'Website Privacy Inspector/Scanner',
        url: 'https://themarkup.org/blacklight',
        solution: 'blacklight'
    },
    {
        id: 'Scatter-plot of the musical genre-space',
        url: 'https://everynoise.com/',
        solution: 'everynoise.com'
    },
    {
        id: 'Global Network of Discovery for Music, Art, Movies and Literature',
        url: 'https://www.gnod.com/',
        solution: 'music-map.com'
    },
    {
        id: 'Lyric Hyphenator',
        url: 'https://juiciobrennan.com/hyphenator/',
        solution: 'Hyphenator'
    },
    {
        id: 'Turns spreadsheet data into maps',
        url: 'https://mapinseconds.com/',
        solution: 'mapinseconds.com'
    },
    {
        id: 'True generated random numbers',
        url: 'https://qrng.anu.edu.au/',
        solution: 'qrng.anu.edu.au'
    },
    {
        id: 'Hardware Benchmarks',
        url: 'https://www.cpubenchmark.net/',
        solution: 'cpubenchmark.net'
    },
    {
        id: 'Barcode Generator',
        url: 'https://barcode.tec-it.com/en/UPCA',
        solution: 'TEC-IT'
    },
    {
        id: 'Map of stereotypical neighborhoods in cities all over the world',
        url: 'https://hoodmaps.com/',
        solution: 'hoodmaps.com'
    },
    {
        id: 'Nature sounds mixer',
        url: 'https://naturemixer.com',
        solution: 'naturemixer.com'
    },
    {
        id: 'Reverse dictionary to find words by description',
        url: 'https://reverse-dictionary.virock.org/',
        solution: 'reverse-dictionary'
    },
    {
        id: 'Printable Calendar',
        url: 'https://yearmonth.day/',
        solution: 'yearmonth.day'
    },
    {
        id: 'Temporal email address',
        url: 'https://temp-mail.org/',
        solution: 'temp-mail.org'
    },
    {
        id: 'Check if your email or password are in a data breach',
        url: 'https://haveibeenpwned.com/',
        solution: 'haveibeenpwned.com'
    },
    {
        id: 'Remove paywalls',
        url: 'https://www.archivebuttons.com/',
        solution: 'archivebuttons.com'
    },
    {
        id: 'Call your phone number in case you lost your phone',
        url: 'https://www.callmylostphone.com/',
        solution: 'callmylostphone.com'
    },
    {
        id: 'Easy recipes using what you have',
        url: 'https://www.myfridgefood.com/',
        solution: 'myfridgefood.com'
    },
    {
        id: 'Dictionary for slang words and phrases',
        url: 'https://www.urbandictionary.com/',
        solution: 'urbandictionary.com'
    },
    {
        id: 'Lighting Maps',
        url: 'https://www.lightningmaps.org/',
        solution: 'lightningmaps.org'
    },
    {
        id: 'Corrupt a file on purpose',
        url: 'https://corrupt-a-file.net/',
        solution: 'corrupt-a-file.net'
    },
    {
        id: 'Transcribe audio/video files or YouTube videos',
        url: 'https://otranscribe.com/',
        solution: 'otranscribe.com'
    },
    {
        id: 'Random Generated Fake Identity',
        url: 'https://www.fakenamegenerator.com/',
        solution: 'fakenamegenerator.com'
    },
    {
        id: 'Customizable Startpage for your web browser',
        url: 'https://online.bonjourr.fr/',
        solution: 'online.bonjourr.fr'
    },
    {
        id: 'Search engine for anime screenshots',
        url: 'https://trace.moe/',
        solution: 'trace.moe'
    },
    {
        id: 'Find public Google Drive files',
        url: 'https://www.dedigger.com',
        solution: 'dedigger.com'
    },
    {
        id: 'Fills your disk with cats',
        url: 'http://www.filldisk.com/',
        solution: 'filldisk.com'
    },
    {
        id: 'The first ever website',
        url: 'http://info.cern.ch/hypertext/WWW/TheProject.html',
        solution: 'info.cern.ch'
    },
    {
        id: 'Package Catalog for Linux and Unix',
        url: 'https://pkgs.org/',
        solution: 'pkgs.org'
    },
    {
        id: 'Linux Kernel World ocurrences',
        url: 'https://www.vidarholen.net/contents/wordcount/',
        solution: 'vidarholen.net'
    },
    {
        id: 'Linux Kernel Archive',
        url: 'https://kernel.org/',
        solution: 'kernel.org'
    },
    {
        id: 'Old Computer Font Catalog',
        url: 'https://int10h.org/oldschool-pc-fonts/',
        solution: 'int10h.org'
    },
    {
        id: 'Create an unscanable letter',
        url: 'https://binfalse.de/2016/02/08/create-an-unscanable-letter/',
        solution: 'binfalse.de'
    },
    {
        id: 'Real life locations from scenes found in anime',
        url: 'https://furaba-animeseichi.blog.jp/',
        solution: 'furaba-animeseichi'
    },
    {
        id: 'The true size of countries',
        url: 'https://www.thetruesize.com/',
        solution: 'thetruesize.com'
    },
    {
        id: 'Web gradients',
        url: 'https://webgradients.com/',
        solution: 'webgradients.com'
    },
    {
        id: 'Miscellaneous Monitor Testing',
        url: 'http://www.lagom.nl/lcd-test/clock_phase.php',
        solution: 'lagom.nl'
    },
    {
        id: ' Symbol finder for LaTeX.',
        url: 'http://detexify.kirelabs.org/classify.html',
        solution: 'Detexify'
    },
    {
        id: 'Proxy provider',
        url: 'https://openproxy.space/',
        solution: 'openproxy.space'
    },
    {
        id: 'Portable Free Software',
        url: 'https://www.portablefreeware.com/',
        solution: 'portablefreeware.com'
    },
    {
        id: 'Live Earthquake Map Monitor',
        url: 'https://earthquake.usgs.gov/earthquakes/map/',
        solution: 'earthquake.usgs.gov'
    },
    {
        id: 'Light Pollution Map',
        url: 'https://darksitefinder.com/map/',
        solution: 'darksitefinder.com'
    },
    {
        id: 'Live Wind Map Monitor',
        url: 'https://www.windy.com',
        solution: 'windy.com'
    },
    {
        id: 'Frequency Receivers Catalog',
        url: 'https://websdr.org/',
        solution: 'websdr.org'
    },
    {
        id: 'Calculator Catalog',
        url: 'https://www.omnicalculator.com/',
        solution: 'omnicalculator.com'
    },
    {
        id: 'High Frequency Receivers Map',
        url: 'http://rx.linkfanel.net/',
        solution: 'rx.linkfanel.net'
    },
    {
        id: 'Microsoft Windows binaries that can be exploited',
        url: 'https://lolbas-project.github.io/',
        solution: 'lolbas'
    },
    {
        id: 'Unix binaries that can be exploited',
        url: 'https://gtfobins.github.io/',
        solution: 'gtfobins'
    },
    {
        id: 'Frequency Tone Generator',
        url: 'https://www.szynalski.com/tone-generator',
        solution: 'szynalski.com'
    },
    {
        id: 'Identify songs',
        url: 'https://www.aha-music.com/identify-songs-music-recognition-online',
        solution: 'aha-music.com'
    },
    {
        id: 'Subtitles for Anime Shows',
        url: 'https://www.kitsunekko.net/',
        solution: 'kitsunekko.net'
    },
    {
        id: 'Free SSL Certificates',
        url: 'https://certbot.eff.org/',
        solution: 'certbot'
    },
    {
        id: 'File hosting and URL shortening service',
        url: 'http://0x0.st/',
        solution: '0x0.st'
    },
    {
        id: 'Data Encryption, encoding, compression',
        url: 'https://gchq.github.io/CyberChef/',
        solution: 'CyberChef'
    },
    {
        id: 'Choose an open source license',
        url: 'https://choosealicense.com/',
        solution: 'choosealicense.com'
    },
    {
        id: 'Programming language documentation written as code',
        url: 'https://learnxinyminutes.com/',
        solution: 'learnxinyminutes.com'
    },
    {
        id: 'Learn vim with a game',
        url: 'https://vim-adventures.com/',
        solution: 'vim-adventures.com'
    },
    {
        id: 'Buy Domains',
        url: 'https://porkbun.com/',
        solution: 'porkbun.com'
    },
    {
        id: 'Stable Difussion Model Catalog',
        url: 'https://civitai.com/',
        solution: 'civitai.com'
    },
    {
        id: 'AI models and datasets',
        url: 'https://huggingface.co/',
        solution: 'huggingface.co'
    },
    {
        id: 'Seasonal anime charts',
        url: 'https://www.senpai.moe',
        solution: 'senpai.moe'
    },
    {
        id: 'Kiwix Offline Catalog, wikipedia offline files',
        url: 'https://library.kiwix.org/#lang=eng',
        solution: 'kiwix.org'
    },
    {
        id: 'Collaborative global map data extracts',
        url: 'https://download.geofabrik.de/',
        solution: 'OpenStreetMap Extracts'
    },
    {
        id: 'Optimize web pages on all devices',
        url: 'https://pagespeed.web.dev/',
        solution: 'pagespeed.web.dev'
    },
    {
        id: 'All-in-one OSINT tool, for checking a websites data',
        url: 'https://web-check.xyz/',
        solution: 'web-check.xyz'
    },
    {
        id: 'cli/terminal Tools Catalog',
        url: 'https://terminaltrove.com/',
        solution: 'terminaltrove.com'
    }
];

const restricted = [
    {
        id: 'Russian Torrent Index',
        url: 'https://rutracker.org',
        solution: ''
    },
    {
        id: 'East Asian Media and Anime Torrent Index',
        url: 'https://nyaa.si',
        solution: ''
    },
    {
        id: 'Game launcher with repacks via torrent',
        url: 'https://github.com/hydralauncher/hydra?tab=readme-ov-file#installation',
        solution: ''
    },
    {
        id: 'Activate Microsoft Office for macOS',
        url: 'https://massgrave.dev/office_for_mac',
        solution: ''
    },
    {
        id: 'Activate Microsoft Office/Windows',
        url: 'https://massgrave.dev/',
        solution: ''
    },
    {
        id: 'Worldwide Movie Torrent Index',
        url: 'https://yts.mx/',
        solution: ''
    }
];

const allSoftware = [...freeSoftware, ...documents, ...commercialSoftware, ...websites, ...restricted];


// Shuffle function to randomize the array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Randomize the allSoftware array
shuffle(allSoftware);

function addCell(software, type) {
    // Create the cell as an anchor element
    const softcell = document.createElement('a');
    softcell.target = '_blank';
    softcell.className = 'softcell';

    // Apply different styles based on type
    if (type === 'documents') {
    softcell.classList.add('documents-cell');
    } else if (type === 'commercialSoftware') {
    softcell.classList.add('commercial-software-cell');
    } else if (type === 'websites') {
    softcell.classList.add('websites-cell');
    } else if (type === 'restricted') {
    softcell.classList.add('restricted-cell'); // Ensure the correct class is added
    }

    // Create the three sections within the cell
    const section1 = document.createElement('div');
    section1.className = 'section section1';
    section1.textContent = `${software.id}`; // Content for the first section
    softcell.appendChild(section1);

    const section2 = document.createElement('div');
    section2.className = 'section section2';
    const linksec2 = document.createElement('a');
    linksec2.href = software.url;
    linksec2.textContent = `${software.solution}`;
    linksec2.target = '_blank'; // Open link in a new tab
    section2.appendChild(linksec2);
    softcell.appendChild(section2);

    const section3 = document.createElement('div');
    section3.className = 'section section3';

    // Function to copy text to clipboard
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }
    
     // Create and append the buttons
     if (type === 'restricted') {
        ['dont'].forEach(os => {
        const button = document.createElement('span');
        const command = `${software.url}`;
        button.className = `dont-button span-space`;
        button.setAttribute('data-text', command);
        button.title = 'Click to copy command';
        button.addEventListener('click', () => {
            copyToClipboard(command);
            const message = `BEWARE\nUnlicensed or low-quality software. Block these sources. Use reliable alternatives. Test only on non-essential systems.\n
            "${command}" has been copied to clipboard.`;
            alert(message);
        });
        section3.appendChild(button);
    });
} else if (type === 'commercialSoftware') {
    // Free software-specific buttons
    ['fedora', 'debian', 'windows', 'macos'].forEach(os => {
        const button = document.createElement('span');
        const command = os === 'fedora' ? `sudo dnf install ${software.cfed}` :
                        os === 'debian' ? `sudo apt install ${software.cdeb}` :
                        os === 'windows' ? `winget install -e --id ${software.cwin}` :
                        `brew install ${software.cmac}`;
        button.className = `${os}-button span-space`;
        button.setAttribute('data-text', command);
        button.title = 'Click to copy command';
        button.addEventListener('click', () => {
            copyToClipboard(command);
            const message = `Command "${command}" has been copied to clipboard.`;
            alert(message);
        });
        section3.appendChild(button);
    });
} else if (type === 'documents') {
    // Free software-specific buttons
    ['pdflin', 'librelin', 'mslin'].forEach(os => {
        const button = document.createElement('span');
        const command = os === 'fedora' ? `sudo dnf install ${software.cfed}` :
                        os === 'windows' ? `winget install -e --id ${software.cwin}` :
                        `brew install ${software.cmac}`;
        button.className = `${os}-button span-space`;
        button.setAttribute('data-text', command);
         // Set the button title based on the button
    if (os === 'pdflin') {
        button.title = `${software.url1}`;
        button.addEventListener('click', () => {
        window.open(software.url1, '_blank');
    });
    } else if (os === 'librelin') {
        button.title = `${software.url2}`;
        button.addEventListener('click', () => {
        window.open(software.url2, '_blank');
    });
    } else {
        button.title = `${software.id}`;
        button.addEventListener('click', () => {
        window.open(software.url3, '_blank');
    });
    }
        section3.appendChild(button);
    });
} else if (type === 'default') {
    // Free software-specific buttons
    ['fedora', 'debian', 'windows', 'macos'].forEach(os => {
        const button = document.createElement('span');
        const command = os === 'fedora' ? `sudo dnf install ${software.cfed}` :
                        os === 'debian' ? `sudo apt install ${software.cdeb}` :
                        os === 'windows' ? `winget install -e --id ${software.cwin}` :
                        `brew install ${software.cmac}`;
        button.className = `${os}-button span-space`;
        button.setAttribute('data-text', command);
        button.title = 'Click to copy command';
        button.addEventListener('click', () => {
            copyToClipboard(command);
            const message = `Command "${command}" has been copied to clipboard.`;
            alert(message);
        });
        section3.appendChild(button);
    });
}

softcell.appendChild(section3);

// Append the cell to the grid
softwareid.appendChild(softcell);
}

function searchFunction() {
    softwareid.innerHTML = "";
    const filter = searchInput.value.trim().toLowerCase();
    const filteredSoftware = allSoftware.filter(software => software.id.toLowerCase().includes(filter));
    filteredSoftware.forEach(software => {
        const type = documents.includes(software) ? 'documents' :
                     commercialSoftware.includes(software) ? 'commercialSoftware' :
                     websites.includes(software) ? 'websites' :
                     restricted.includes(software) ? 'restricted' : 'default';
        addCell(software, type);
    });
}

searchInput.addEventListener('input', searchFunction);

// Populate the grid with cells for each type of software
allSoftware.forEach(software => {
    const type = documents.includes(software) ? 'documents' :
                 commercialSoftware.includes(software) ? 'commercialSoftware' :
                 websites.includes(software) ? 'websites' :
                 restricted.includes(software) ? 'restricted' : 'default';
    addCell(software, type);
});