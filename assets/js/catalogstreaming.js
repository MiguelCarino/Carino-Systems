const apiKey = 'AIzaSyCmtV8QIecdM2A-5YCGRPanLqIsOIjoV74'; // Replace with your actual YouTube Data API key
const channels = {
    'New Year Eve': [
        { name: 'EarthTV', icon: 'https://via.placeholder.com/20', videoId: '', channelId: 'UCRuyAVeVd7oUwh0LWmxxBBQ', filterKeyword: 'The world live'},
        { name: 'New York', icon: 'https://via.placeholder.com/20', videoId: '', channelId: 'UCl0skuFDwMqmo67HcS-ULnA', filterKeyword: 'LIVE NEW YORK NEW YEARS 2025 COUNTDOWN'},
        { name: 'London', icon: 'https://via.placeholder.com/20', videoId: '', channelId: 'UCl0skuFDwMqmo67HcS-ULnA', filterKeyword: 'LIVE LONDON NEW YEARS 2025 COUNTDOWN'},
        { name: 'Seoul', icon: 'https://via.placeholder.com/20', videoId: '', channelId: 'UCl0skuFDwMqmo67HcS-ULnA', filterKeyword: 'LIVE 서울 2025년 새해 카운트다운'},
        { name: 'Central Standard Time', icon: 'https://via.placeholder.com/20', videoId: '', channelId: 'UCKm6ufPsvELiPzpa4V6IY2w', filterKeyword: 'cst'},
        // Add more channels as needed
    ],
    'Monitoring': [
        { name: 'Earthquake Monitoring 1', icon: 'https://via.placeholder.com/20', videoId: '', channelId: 'UCZmcd4cQ2H_ELWAuUdOMgRQ', filterKeyword: ''},
        { name: 'Earthquake Monitoring 2', icon: 'https://via.placeholder.com/20', videoId: 'MT23xDdXe8U', channelId: '', filterKeyword: ''},
        { name: 'Olympics Medal count', icon: 'https://via.placeholder.com/20', videoId: '', channelId: 'UCU4Diuu_J3KRX2Rkj40ZZnA' }
        // Add more channels as needed
    ],
    '🌐 Worldwide': [
        { name: 'Worldwide Stream 1', icon: 'https://via.placeholder.com/20', videoId: 'dPOypsZP__I', channelId: 'CHANNEL_ID_3', filterKeyword: ''},
        { name: 'Worldwide Stream 2', icon: 'https://via.placeholder.com/20', videoId: 'dPOypsZP__I', channelId: 'CHANNEL_ID_4' }
        // Add more channels as needed
    ],
    '🇺🇸 United States': [
        { name: 'US News Stream', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA', filterKeyword: ''},
        { name: 'US Music Stream', icon: 'https://via.placeholder.com/20', videoId: 'H-N6-MHn3DA', channelId: 'UCef1-8eOpJgud7szVPlZQAQ', filterKeyword: ''},
        { name: 'US Sports Stream', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA', filterKeyword: ''},
        { name: 'NASA TV', icon: 'https://via.placeholder.com/20', videoId: '', channelId: 'UCLA_DiR1FfKNvjuUpBHmylQ' }
    ],
    '🇬🇧 United Kingdom': [
        { name: 'UK Entertainment Stream', icon: 'https://via.placeholder.com/20', videoId: 'hY7m5jjJ9mM', filterKeyword: ''},
        { name: 'UK News Stream', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA', filterKeyword: ''},
        { name: 'UK Music Stream', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' }
    ],
    '🇨🇦 Canada': [
        { name: 'Canada Stream 1', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA', filterKeyword: ''},
        { name: 'Canada Stream 2', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA', filterKeyword: ''},
        { name: 'Canada Stream 3', icon: 'https://via.placeholder.com/20', videoId: '-E0AHOOGo24', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA' }
    ],
    '🇯🇵 Japan': [
        { name: 'ABCニュース', icon: 'assets/channels/jap_abctv.webp', videoId: '', channelId: 'UCPW-5qfYGNR8XYrvESrqJKA', filterKeyword: ''},
        { name: 'テレ朝ニュース', icon: 'assets/channels/jap_ann.webp', videoId: '', channelId: 'UCGCZAYq5Xxojl_tSXcVJhiQ', filterKeyword: ''},
        { name: 'HBCニュース', icon: 'assets/channels/jap_hbc.webp', videoId: '', channelId: 'UCCTpf5c_9HDo_OSu3aX8uFQ', filterKeyword: ''},
        { name: 'HTB北海道ニュース', icon: 'assets/channels/jap_htb.webp', videoId: '', channelId: 'UCSWOnDD1KIriGmyQ7SgNA4A', filterKeyword: ''},
        { name: 'サンテレビニュース', icon: 'assets/channels/jap_suntv.webp', videoId: '', channelId: 'UCtf-aWCCwZPep5woQd9lAIQ', filterKeyword: ''},
        { name: 'STVニュース北海道', icon: 'assets/channels/jap_stv.webp', videoId: '', channelId: 'UCOZv-6MiXqJdLpmYtR431Ow' }
    ],
    '🇲🇽 Mexico': [
        { name: 'Nmas', icon: 'assets/channels/mx_nmas.webp', videoId: '', channelId: 'UCqfCJBfrFSO4tZM1LNZTBFQ', filterKeyword: ''},
        { name: 'TelediarioMX', icon: 'assets/channels/mx_telediario.webp', videoId: '', channelId: 'UCfSvKJAIiyWqNU5rhNtp1UA', filterKeyword: ''},
        { name: 'Milenio', icon: 'assets/channels/mx_milenio.webp', videoId: '', channelId: 'UCFxHplbcoJK9m70c4VyTIxg' }
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
