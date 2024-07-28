const apiKey = 'AIzaSyCxJJiioJa44xJ8OA9jrLNKqmTBblZlArc'; // Replace with your actual YouTube Data API key
const channels = {
    'Monitoring': [
        { name: 'Earthquake Monitoring 1', icon: 'https://via.placeholder.com/20', videoId: '', channelId: 'UCZmcd4cQ2H_ELWAuUdOMgRQ' },
        { name: 'Earthquake Monitoring 2', icon: 'https://via.placeholder.com/20', videoId: 'MT23xDdXe8U', channelId: '' },
        { name: 'Olympics Medal count', icon: 'https://via.placeholder.com/20', videoId: '4KHId1aqJwo', channelId: '' }
        // Add more channels as needed
    ],
    '🌐 Worldwide': [
        { name: 'Worldwide Stream 1', icon: 'https://via.placeholder.com/20', videoId: 'dPOypsZP__I', channelId: 'CHANNEL_ID_3' },
        { name: 'Worldwide Stream 2', icon: 'https://via.placeholder.com/20', videoId: 'dPOypsZP__I', channelId: 'CHANNEL_ID_4' }
        // Add more channels as needed
    ],
    '🇺🇸 United States': [
        { name: 'US News Stream', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' },
        { name: 'US Music Stream', icon: 'https://via.placeholder.com/20', videoId: 'H-N6-MHn3DA', channelId: 'UCef1-8eOpJgud7szVPlZQAQ' },
        { name: 'US Sports Stream', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' },
        { name: 'NASA TV', icon: 'https://via.placeholder.com/20', videoId: '', channelId: 'UCLA_DiR1FfKNvjuUpBHmylQ' }
    ],
    '🇬🇧 United Kingdom': [
        { name: 'UK Entertainment Stream', icon: 'https://via.placeholder.com/20', videoId: 'hY7m5jjJ9mM' },
        { name: 'UK News Stream', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' },
        { name: 'UK Music Stream', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' }
    ],
    '🇨🇦 Canada': [
        { name: 'Canada Stream 1', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' },
        { name: 'Canada Stream 2', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' },
        { name: 'Canada Stream 3', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' }
    ],
    '🇯🇵 Japan': [
        { name: 'ABCニュース', icon: 'assets/channels/jap_abctv.webp', videoId: '', channelId: 'UCPW-5qfYGNR8XYrvESrqJKA' },
        { name: 'テレ朝ニュース', icon: 'assets/channels/jap_ann.webp', videoId: '', channelId: 'UCGCZAYq5Xxojl_tSXcVJhiQ' },
        { name: 'HBCニュース', icon: 'assets/channels/jap_hbc.webp', videoId: '', channelId: 'UCCTpf5c_9HDo_OSu3aX8uFQ' },
        { name: 'HTB北海道ニュース', icon: 'assets/channels/jap_htb.webp', videoId: '', channelId: 'UCSWOnDD1KIriGmyQ7SgNA4A' },
        { name: 'サンテレビニュース', icon: 'assets/channels/jap_suntv.webp', videoId: '', channelId: 'UCtf-aWCCwZPep5woQd9lAIQ' },
        { name: 'STVニュース北海道', icon: 'assets/channels/jap_stv.webp', videoId: '', channelId: 'UCOZv-6MiXqJdLpmYtR431Ow' }
    ],
    '🇲🇽 Mexico': [
        { name: 'Claro Sports 1', icon: 'https://via.placeholder.com/20', videoId: '', channelId: 'UCqfCJBfrFSO4tZM1LNZTBFQ' },
        { name: 'Mexico Stream 2', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' },
        { name: 'Mexico Stream 3', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' }
    ],
    '🇦🇺 Australia': [
        { name: 'ABC News (Australia)', icon: 'https://via.placeholder.com/20', videoId: 'vOTiJkg1voo', channelId: 'UCVgO39Bk5sMo66-6o6Spn6Q' }
    ],
    '🌳 Nature': [
        { name: 'Nature Stream', icon: 'https://via.placeholder.com/20', videoId: 'd1YoGAxmZtE', channelId: '' }
    ]
    // Add more categories and channels as needed
};

// Export the catalog data
export { apiKey, channels };
