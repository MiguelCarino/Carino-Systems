const apiKey = 'YOUR_YOUTUBE_API_KEY'; // Replace with your actual YouTube Data API key

const channels = {
    'Monitoring': [
        { name: 'Monitoring Stream 1', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' },
        { name: 'Monitoring Stream 2', icon: 'https://via.placeholder.com/20', videoId: 'YDfiTGGPYCk', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' }
        // Add more channels as needed
    ],
    'Worldwide': [
        { name: 'Worldwide Stream 1', icon: 'https://via.placeholder.com/20', videoId: 'dPOypsZP__I', channelId: 'CHANNEL_ID_3' },
        { name: 'Worldwide Stream 2', icon: 'https://via.placeholder.com/20', videoId: 'dPOypsZP__I', channelId: 'CHANNEL_ID_4' }
        // Add more channels as needed
    ],
    'United States': [
        { name: 'US News Stream', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' },
        { name: 'US Music Stream', icon: 'https://via.placeholder.com/20', videoId: 'H-N6-MHn3DA', channelId: 'UCef1-8eOpJgud7szVPlZQAQ' },
        { name: 'US Sports Stream', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' }
    ],
    'United Kingdom': [
        { name: 'UK Entertainment Stream', icon: 'https://via.placeholder.com/20', videoId: 'hY7m5jjJ9mM' },
        { name: 'UK News Stream', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' },
        { name: 'UK Music Stream', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' }
    ],
    'Canada': [
        { name: 'Canada Stream 1', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' },
        { name: 'Canada Stream 2', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' },
        { name: 'Canada Stream 3', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' }
    ],
    'Japan': [
        { name: 'Japan Stream 1', icon: 'https://via.placeholder.com/20', videoId: 'TB-_Q2boqCE', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' },
        { name: 'Japan Stream 2', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' },
        { name: 'Japan Stream 3', icon: 'https://via.placeholder.com/20', videoId: '6n54sAragz0', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' }
    ],
    'Mexico': [
        { name: 'Mexico Stream 1', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' },
        { name: 'Mexico Stream 2', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' },
        { name: 'Mexico Stream 3', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' }
    ],
    'Australia': [
        { name: 'ABC News (Australia)', icon: 'https://via.placeholder.com/20', videoId: 'vOTiJkg1voo', channelId: 'UCVgO39Bk5sMo66-6o6Spn6Q' }
    ],
    'Nature': [
        { name: 'Nature Stream', icon: 'https://via.placeholder.com/20', videoId: 'd1YoGAxmZtE', channelId: '' }
    ]
    // Add more categories and channels as needed
};

// Export the catalog data
export { apiKey, channels };
