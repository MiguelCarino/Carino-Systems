import { apiKey, channels } from './catalogstreaming.js';

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const notification = document.getElementById('notification');
    
    // Generate sidebar categories and submenus
    for (const category in channels) {
        const button = document.createElement('button');
        button.dataset.category = category;
        button.textContent = category;
        
        if (category === '🖧 Monitoring') {
            button.classList.add('active');
        }
        
        sidebar.appendChild(button);
        
        const submenu = document.createElement('ul');
        submenu.classList.add('submenu');
        if (category === '🖧 Monitoring') {
            submenu.style.display = 'block';
        }
        
        channels[category].forEach(stream => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<img src="${stream.icon}" alt="${stream.name}"><span>${stream.name}</span>`;
            listItem.dataset.videoId = stream.videoId;
            listItem.dataset.channelId = stream.channelId;
            listItem.addEventListener('click', (event) => {
                event.stopPropagation();
                if (stream.videoId) {
                    checkEmbeddableAndToggleStream(stream.videoId);
                } else {
                    loadAndToggleStreamByChannelId(stream.channelId);
                }
            });
            submenu.appendChild(listItem);
        });
        
        sidebar.appendChild(submenu);
    }

    const categoryButtons = document.querySelectorAll('.sidebar button');
    const livestreamsDiv = document.getElementById('livestreams');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const activeButton = document.querySelector('.sidebar button.active');
            if (activeButton) {
                activeButton.classList.remove('active');
                activeButton.nextElementSibling.style.display = 'none';
            }
            
            button.classList.add('active');

            const subMenu = button.nextElementSibling;
            subMenu.style.display = 'block';
            subMenu.style.maxHeight = subMenu.scrollHeight + 'px';

            const category = button.getAttribute('data-category');
            loadStreams(category);
        });
    });

    async function fetchLiveVideoId(channelId) {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            return data.items[0].id.videoId;
        }
        return null;
    }

    async function checkEmbeddableAndToggleStream(videoId) {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=status&id=${videoId}&key=${apiKey}`);
        const data = await response.json();
        if (data.items && data.items.length > 0 && data.items[0].status.embeddable) {
            toggleStream(videoId);
        } else {
            showNotification('This video cannot be embedded.');
        }
    }

    async function loadAndToggleStreamByChannelId(channelId) {
        const videoId = await fetchLiveVideoId(channelId);
        if (videoId) {
            checkEmbeddableAndToggleStream(videoId);
        }
    }

    async function loadStreams(category) {
        const subMenu = document.querySelector(`button[data-category="${category}"]`).nextElementSibling;
        subMenu.innerHTML = '';

        const streams = await Promise.all(channels[category].map(async stream => {
            if (stream.videoId) {
                return stream;
            } else {
                const videoId = await fetchLiveVideoId(stream.channelId);
                return { ...stream, videoId };
            }
        }));

        streams.forEach(stream => {
            if (stream.videoId) {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<img src="${stream.icon}" alt="${stream.name}"><span>${stream.name}</span>`;
                listItem.dataset.videoId = stream.videoId;
                listItem.addEventListener('click', (event) => {
                    event.stopPropagation();
                    checkEmbeddableAndToggleStream(stream.videoId);
                });
                subMenu.appendChild(listItem);
            }
        });

        if (category === '🖧 Monitoring' || subMenu.style.display === 'block') {
            subMenu.style.display = 'block';
            subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
        }
    }

    function toggleStream(videoId) {
        let streamDiv = document.querySelector(`.stream[data-video-id="${videoId}"]`);

        if (streamDiv) {
            livestreamsDiv.removeChild(streamDiv);
        } else {
            streamDiv = document.createElement('div');
            streamDiv.className = 'stream';
            streamDiv.dataset.videoId = videoId;
            streamDiv.innerHTML = `
                <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            `;

            streamDiv.querySelector('iframe').addEventListener('error', () => {
                livestreamsDiv.removeChild(streamDiv);
                updateUrl();
            });

            livestreamsDiv.appendChild(streamDiv);
        }

        resizeStreams();
        updateUrl();
    }

    function resizeStreams() {
        const streams = document.querySelectorAll('.stream');
        const count = streams.length;

        if (count > 0) {
            const columns = Math.ceil(Math.sqrt(count));
            livestreamsDiv.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        }
    }

    function updateUrl() {
        const streams = document.querySelectorAll('.stream');
        const videoIds = Array.from(streams).map(stream => stream.dataset.videoId).join(',');
        const newUrl = `${window.location.origin}${window.location.pathname}?videos=${videoIds}`;
        history.pushState(null, '', newUrl);
    }

    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    window.addEventListener('resize', resizeStreams);

    async function loadInitialCategory(category) {
        const button = document.querySelector(`button[data-category="${category}"]`);
        button.classList.add('active');
        button.nextElementSibling.style.display = 'block';
        button.nextElementSibling.style.maxHeight = button.nextElementSibling.scrollHeight + 'px';

        const streams = await Promise.all(channels[category].map(async stream => {
            if (stream.videoId) {
                return stream;
            } else {
                const videoId = await fetchLiveVideoId(stream.channelId);
                return { ...stream, videoId };
            }
        }));

        streams.forEach(stream => {
            if (stream.videoId) {
                checkEmbeddableAndToggleStream(stream.videoId);
            }
        });
    }

    async function loadVideosFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const videosParam = urlParams.get('videos');

        if (videosParam) {
            const videoIds = videosParam.split(',');
            videoIds.forEach(videoId => {
                checkEmbeddableAndToggleStream(videoId);
            });
        } else {
            await loadInitialCategory('🖧 Monitoring');
        }
    }

    loadVideosFromUrl();
});
