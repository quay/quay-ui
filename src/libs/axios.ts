// axios
import axios from 'axios';
import {GlobalAuthState} from 'src/resources/AuthResource';

axios.defaults.baseURL =
  process.env.QUAY_APP_API_URL || 'http://localhost:8080';
axios.defaults.withCredentials = true;

export async function getCsrfToken() {
  try {
    const response = await axios.get('/csrf_token');
    GlobalAuthState.csrfToken = response.data.csrf_token;
    return response.data;
  } catch (error) {
    throw new Error(`API error login user ${error.message}`);
  }
}

const axiosIns = axios.create();
axiosIns.interceptors.request.use(async (config) => {
  // TODO: Handle error if we can't get a CSRF token
  if (!GlobalAuthState.csrfToken) {
    const r = await getCsrfToken();
    GlobalAuthState.csrfToken = r.csrf_token;
  }

  if (config.headers && GlobalAuthState.csrfToken) {
    config.headers['X-CSRF-Token'] = GlobalAuthState.csrfToken;
    config.headers['X-XSRF-Token'] = GlobalAuthState.csrfToken;
  }

  return config;
});

axiosIns.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.error(error)
    if (error.response.status === 401) {
      window.location.href = '/signin';
    }
  },
);

export default axiosIns;
