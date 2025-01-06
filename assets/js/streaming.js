import { apiKey, channels } from './catalogstreaming.js';

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const notification = document.getElementById('notification');

    // Utility function to clean category names and remove invisible characters
    function cleanCategoryName(name) {
        return name.replace(/[^\x20-\x7E\xA0-\xFF\u00A0-\uFFFF]/g, '').replace(/\s+/g, ' ').trim();
    }    

    // Utility function to log character codes
    function logCharCodes(str) {
        return str.split('').map(char => char.charCodeAt(0)).join(' ');
    }

    // Log the keys in the channels object
    console.log('Keys in channels object:', Object.keys(channels));

    // Generate sidebar categories and submenus
    for (const rawCategory in channels) {
        const category = cleanCategoryName(rawCategory);
        console.log(`Creating button for category: ${category}`); // Debug log
        console.log(`Character codes for category: ${logCharCodes(category)}`); // Log character codes
        const button = document.createElement('button');
        button.dataset.category = category;
        button.textContent = category;

        if (category === 'Testing') {
            console.log('Setting Monitoring button as active'); // Debug log
            button.classList.add('active');
        }

        sidebar.appendChild(button);

        const submenu = document.createElement('ul');
        submenu.classList.add('submenu');
        if (category === 'Testing') {
            submenu.style.display = 'block';
        }

        if (category === 'Testing') {
            channels[rawCategory].forEach(stream => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<img src="${stream.icon}" alt="${stream.name}"><span>${stream.name}</span>`;
                listItem.dataset.platform = stream.platform;
                listItem.dataset.videoId = stream.videoId || '';
                listItem.dataset.channelId = stream.channelId || '';
                listItem.dataset.url = stream.relativeUrl || '';
        
                listItem.addEventListener('click', (event) => {
                    event.stopPropagation();
        
                    switch (stream.platform) {
                        case 'youtube':
                            if (stream.videoId) {
                                checkEmbeddableAndToggleStream(stream.videoId);
                            } else if (stream.channelId) {
                                loadAndToggleStreamByChannelId(stream.channelId);
                            } else {
                                console.warn(`YouTube stream '${stream.name}' is missing both videoId and channelId.`);
                            }
                            break;
        
                        case 'odysee':
                            if (stream.relativeUrl) {
                                const baseUrl = PLATFORM_BASE_URLS[stream.platform];
                                const fullUrl = baseUrl ? `${baseUrl}${stream.relativeUrl}` : stream.relativeUrl;
                                toggleExternalStream(fullUrl);
                            } else {
                                console.warn(`External stream '${stream.name}' is missing a relativeUrl.`);
                            }
                            break;
                        case 'rumble':
                            if (stream.relativeUrl) {
                                const baseUrl = PLATFORM_BASE_URLS[stream.platform];
                                const fullUrl = baseUrl ? `${baseUrl}${stream.relativeUrl}` : stream.relativeUrl;
                                toggleExternalStream(fullUrl);
                            } else {
                                console.warn(`External stream '${stream.name}' is missing a relativeUrl.`);
                            }
                            break;
                        case 'utube': {
                            const baseUrl = PLATFORM_BASE_URLS[stream.platform];
                            if (baseUrl) {
                                // Replace placeholder ${relativeUrl} with the actual value from the stream
                                const fullUrl = baseUrl.replace('${relativeUrl}', stream.relativeUrl || '');
                                toggleExternalStream(fullUrl);
                                console.log(`Generated URL for ${stream.platform}: ${fullUrl}`);
                                return { ...stream, url: fullUrl };
                            } else {
                                console.warn(`Base URL not defined for platform '${stream.platform}'.`);
                                return null;
                            }
                        }
                            break;
                        case 'rutube':
                            if (stream.relativeUrl) {
                                const baseUrl = PLATFORM_BASE_URLS[stream.platform];
                                const fullUrl = baseUrl ? `${baseUrl}${stream.relativeUrl}` : stream.relativeUrl;
                                toggleExternalStream(fullUrl);
                            } else {
                                console.warn(`External stream '${stream.name}' is missing a relativeUrl.`);
                            }
                            break;
        
                        default:
                            console.warn(`Unsupported platform '${stream.platform}' for stream '${stream.name}'.`);
                            break;
                    }
                });
        
                submenu.appendChild(listItem);
            });
        }
        
        

        sidebar.appendChild(submenu);
    }

    const categoryButtons = document.querySelectorAll('.sidebar button');
    const livestreamsDiv = document.getElementById('livestreams');
    const PLATFORM_BASE_URLS = {
        odysee: 'https://odysee.com/$/embed/',
        rutube: 'https://rutube.ru/play/embed/live/video/',
        utube: 'https://www.youtube.com/embed/live_stream?channel=${relativeUrl}&mute=1&autoplay=1',
        rumble: 'https://rumble.com/embed/'
    };

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

    async function fetchLiveVideoId(channelId, filterKeyword = null) {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`);
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            if (filterKeyword) {
                // Filter based on the keyword in the title
                const filteredItem = data.items.find(item => item.snippet.title.toLowerCase().includes(filterKeyword.toLowerCase()));
                if (filteredItem) {
                    return filteredItem.id.videoId;
                }
            } else {
                // Return the first livestream if no filter keyword is provided
                return data.items[0].id.videoId;
            }
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
        } else {
            showNotification('No live stream available for this channel.');
        }
    }

    async function loadStreams(category) {
        const cleanedCategory = cleanCategoryName(category);
        if (!channels.hasOwnProperty(cleanedCategory)) {
            console.error(`channels does not contain the key: ${cleanedCategory}`);
            return;
        }
    
        const subMenu = document.querySelector(`button[data-category="${cleanedCategory}"]`).nextElementSibling;
        subMenu.innerHTML = ''; // Clear the submenu for this category
    
        const streams = await Promise.all(
            channels[cleanedCategory].map(async (stream) => {
                if (stream.platform === 'youtube') {
                    console.log(`Processing YouTube stream: ${stream.name}`);
                    if (stream.videoId) {
                        return stream; // Use predefined videoId
                    } else {
                        try {
                            const videoId = await fetchLiveVideoId(stream.channelId, stream.filterKeyword);
                            return { ...stream, videoId }; // Add fetched videoId
                        } catch (error) {
                            console.error(`Failed to fetch YouTube video ID for ${stream.name}:`, error);
                            return null; // Skip this stream
                        }
                    }
                } else {
                    console.log(`Processing external stream (${stream.platform}): ${stream.name}`);
                    // Construct the full URL for non-YouTube platforms
                    const baseUrl = PLATFORM_BASE_URLS[stream.platform];
                    const fullUrl = baseUrl ? `${baseUrl}${stream.relativeUrl}` : stream.relativeUrl;
        
                    console.log(`Generated URL for platform ${stream.platform}: ${fullUrl}`); // Debug log
        
                    return { ...stream, url: fullUrl };
                }
            })
        );
        
    
        streams.forEach((stream) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<img src="${stream.icon}" alt="${stream.name}"><span>${stream.name}</span>`;
            listItem.dataset.platform = stream.platform;
            listItem.dataset.url = stream.url || '';
            listItem.dataset.videoId = stream.videoId || '';
    
            listItem.addEventListener('click', (event) => {
                event.stopPropagation();
                if (stream.platform === 'youtube' && stream.videoId) {
                    toggleStream(stream.videoId); // Load YouTube stream
                } else if (stream.platform !== 'youtube') {
                    toggleExternalStream(stream.url); // Load other platform stream
                }
            });
    
            subMenu.appendChild(listItem);
        });
    
        // Handle submenu visibility and default category logic
        if (category === 'Testing' || subMenu.style.display === 'block') {
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
    function toggleExternalStream(url) {
        const livestreamsDiv = document.getElementById('livestreams'); // Ensure this is properly referenced
    
        let streamDiv = document.querySelector(`.stream[data-url="${url}"]`);
    
        if (streamDiv) {
            // If the stream is already loaded, remove it
            livestreamsDiv.removeChild(streamDiv);
        } else {
            // Otherwise, add a new stream iframe
            streamDiv = document.createElement('div');
            streamDiv.className = 'stream';
            streamDiv.dataset.url = url;
            streamDiv.innerHTML = `
                <iframe src="${url}" frameborder="0" allowfullscreen></iframe>
            `;
    
            // Add error handling for iframe load issues
            streamDiv.querySelector('iframe').addEventListener('error', () => {
                livestreamsDiv.removeChild(streamDiv);
                showNotification('Unable to load the stream.');
            });
    
            livestreamsDiv.appendChild(streamDiv);
        }
    
        // Resize streams dynamically
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
        console.log(`Attempting to load initial category: ${category}`); // Debug log
        const cleanedCategory = cleanCategoryName(category);
        console.log(`Cleaned category: ${cleanedCategory}`); // Log cleaned category
        if (!channels.hasOwnProperty(cleanedCategory)) {
            console.error(`channels does not contain the key: ${cleanedCategory}`);
            return;
        }

        const button = document.querySelector(`button[data-category="${cleanedCategory}"]`);
        if (button) {
            button.classList.add('active');
            button.nextElementSibling.style.display = 'block';
            button.nextElementSibling.style.maxHeight = button.nextElementSibling.scrollHeight + 'px';

            const streams = await Promise.all(channels[cleanedCategory].map(async stream => {
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
        } else {
            console.error(`Button for category "${cleanedCategory}" not found.`);
        }
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
            await loadInitialCategory('Testing');
        }
    }

    loadVideosFromUrl();
});
