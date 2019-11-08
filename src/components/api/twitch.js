import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.twitch.tv/helix/',
    headers: {
        'Client-ID': 'ew5y8dnvd35deca2cqe9ap0ol4hgjy'
    }
});