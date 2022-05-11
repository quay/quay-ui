// axios
import axios from 'axios';
import { GlobalAuthState } from 'src/resources/AuthResource';

axios.defaults.baseURL = process.env.QUAY_APP_API_URL || 'http://localhost:8080';


const axiosIns = axios.create({});
axiosIns.interceptors.request.use(async (config) => {
    console.log(config);
    console.log('auth state');
    console.log(GlobalAuthState);
    if (config.headers && GlobalAuthState.csrfToken) {
        config.headers['X-CSRF-Token'] = GlobalAuthState.csrfToken;
    }
    config.withCredentials = true;

    return config
});

axiosIns.interceptors.response.use((response) => response, (error) => {
    console.log(error)
    if (error.response.status === 401) {
        window.location.href = '/signin';
    }
});

export default axiosIns;
