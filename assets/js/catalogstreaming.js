const apiKey = 'AIzaSyCpa3fdO-0Lf7n0Sy_kKXkWo0rFDldMZmo'; // Replace with your actual YouTube Data API key
const channels = {
    'Monitoring': [
        { name: 'Earthquake Monitoring 1', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: '', channelId: 'UCZmcd4cQ2H_ELWAuUdOMgRQ', filterKeyword: ''},
        { name: 'Earthquake Monitoring 2', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: 'MT23xDdXe8U', channelId: '', filterKeyword: ''}
        // Add more channels as needed
    ],
    '🌐 Worldwide': [
        { name: 'Worldwide Stream 1', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: 'dPOypsZP__I', channelId: 'CHANNEL_ID_3', filterKeyword: ''},
        { name: 'Worldwide Stream 2', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: 'dPOypsZP__I', channelId: 'CHANNEL_ID_4' }
        // Add more channels as needed
    ],
    '🇺🇸 United States': [
        { name: 'ABC News', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: '-E0AHOOGo24', channelId: 'UCBi2mrWuNuyYy4gbM6fU18Q', filterKeyword: 'news'},
        { name: 'NBC News', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: 'H-N6-MHn3DA', channelId: 'UCeY0bbntWzzVIaj2z3QigXg', filterKeyword: 'news'},
        { name: 'Fox News', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: '-E0AHOOGo24', channelId: 'UCJg9wBPyKMNA5sRDnvzmkdg', filterKeyword: 'news'},
        { name: 'NASA TV', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: '', channelId: 'UCLA_DiR1FfKNvjuUpBHmylQ', filterKeyword: '' },
        { name: 'NASA TV', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: '', channelId: 'UCLA_DiR1FfKNvjuUpBHmylQ', filterKeyword: 'High' }
    ],
    '🇬🇧 United Kingdom': [
        { name: 'UK Entertainment Stream', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: 'hY7m5jjJ9mM', filterKeyword: ''},
        { name: 'UK News Stream', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA', filterKeyword: ''},
        { name: 'UK Music Stream', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' }
    ],
    '🇨🇦 Canada': [
        { name: 'Canada Stream 1', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA', filterKeyword: ''},
        { name: 'Canada Stream 2', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA', filterKeyword: ''},
        { name: 'Canada Stream 3', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' }
    ],
    '🇯🇵 Japan': [
        { name: 'ABCニュース', icon: 'assets/channels/jap_abctv.webp', platform: 'youtube', videoId: '', channelId: 'UCPW-5qfYGNR8XYrvESrqJKA', filterKeyword: ''},
        { name: 'テレ朝ニュース', icon: 'assets/channels/jap_ann.webp', platform: 'youtube', videoId: '', channelId: 'UCGCZAYq5Xxojl_tSXcVJhiQ', filterKeyword: ''},
        { name: 'HBCニュース', icon: 'assets/channels/jap_hbc.webp', platform: 'youtube', videoId: '', channelId: 'UCCTpf5c_9HDo_OSu3aX8uFQ', filterKeyword: ''},
        { name: 'HTB北海道ニュース', icon: 'assets/channels/jap_htb.webp', platform: 'youtube', videoId: '', channelId: 'UCSWOnDD1KIriGmyQ7SgNA4A', filterKeyword: ''},
        { name: 'サンテレビニュース', icon: 'assets/channels/jap_suntv.webp', platform: 'youtube', videoId: '', channelId: 'UCtf-aWCCwZPep5woQd9lAIQ', filterKeyword: ''},
        { name: 'STVニュース北海道', icon: 'assets/channels/jap_stv.webp', platform: 'youtube', videoId: '', channelId: 'UCOZv-6MiXqJdLpmYtR431Ow' }
    ],
    '🇲🇽 Mexico': [
        { name: 'Nmas', icon: 'assets/channels/mx_nmas.webp', platform: 'youtube', videoId: '', channelId: 'UCqfCJBfrFSO4tZM1LNZTBFQ', filterKeyword: ''},
        { name: 'TelediarioMX', icon: 'assets/channels/mx_telediario.webp', platform: 'youtube', videoId: '', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA', filterKeyword: ''},
        { name: 'Milenio', icon: 'assets/channels/mx_milenio.webp', platform: 'youtube', videoId: '', channelId: 'UCFxHplbcoJK9m70c4VyTIxg' }
    ],
    '🇦🇺 Australia': [
        { name: 'ABC News (Australia)', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: 'vOTiJkg1voo', channelId: 'UCVgO39Bk5sMo66-6o6Spn6Q' }
    ],
    '🌳 Nature': [
        { name: 'Nature Stream', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: 'd1YoGAxmZtE', channelId: '' }
    ],
    'Testing': [
        //{ name: 'NASA TV', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: '', channelId: 'UCLA_DiR1FfKNvjuUpBHmylQ', filterKeyword: 'High' },
        { name: 'Alternative NASA TV', icon: 'https://via.placeholder.com/20', platform: 'utube', relativeUrl: 'UCLA_DiR1FfKNvjuUpBHmylQ' },
        { name: 'Alternative Fox News', icon: 'https://via.placeholder.com/20', platform: 'utube', relativeUrl: 'UCJg9wBPyKMNA5sRDnvzmkdg' },
        { name: 'Alternative ABC News', icon: 'https://via.placeholder.com/20', platform: 'utube', relativeUrl: 'UCBi2mrWuNuyYy4gbM6fU18Q' },
        { name: '01', icon: 'https://via.placeholder.com/20', platform: 'odysee', relativeUrl: '@RT:fd/livestream_RT:d' },
        { name: 'Rutube Live 2', platform: 'rutube', relativeUrl: '9ae8e8a6dc58bdad66190475f9872ecd' },
        { name: 'Zvezda', platform: 'rutube', relativeUrl: '5ab908fccfac5bb43ef2b1e4182256b0' },
        { name: 'Azteca Noticias', icon: 'https://via.placeholder.com/20', platform: 'utube', relativeUrl: 'UCUP6qv-_EIL0hwTsJaKYnvw' },
        //{ name: 'Hiroshima Noticias', icon: 'https://via.placeholder.com/20', platform: 'youtube', videoId: '', channelId: 'UCRnFGOp_mjaCYEhMzsE2iHA', filterKeyword: '' },
        { name: 'Hiroshima Noticias ALT', icon: 'https://via.placeholder.com/20', platform: 'utube', relativeUrl: 'UCRnFGOp_mjaCYEhMzsE2iHA' },
        { name: 'News Max', icon: 'assets/channels/us_newsmax.webp', platform: 'rumble', relativeUrl: 'v5xwnen/?pub=4' }
    ]
    // Add more categories and channels as needed
};

// Export the catalog data
export { apiKey, channels };
