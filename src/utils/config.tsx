const API_URL = import.meta.env.PROD ? 'https://te3004-api.onrender.com' : 'http://localhost';
const API_WS_URL = import.meta.env.PROD ? 'ws://te3004-api.onrender.com' : 'ws://localhost';

export { API_URL, API_WS_URL };