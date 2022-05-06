// axios
import axios from 'axios';

axios.defaults.baseURL = process.env.QUAY_APP_API_URL || 'http://localhost:8080';

const axiosIns = axios.create({
  // TODO: ADD AUTH HEADERS
  // headers: { Authorization: `Bearer ${token}` },
});

axiosIns.interceptors.request.use(async (config) => config);

export default axiosIns;
