import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.twitch.tv/helix/',
    headers: {
        'Client-ID': '' // Your twitch client id
    }
});
