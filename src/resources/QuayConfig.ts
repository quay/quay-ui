// import { getBackendUrl } from '../utils/httputils';

import {AxiosResponse} from 'axios';
import axios from '../libs/axios';

export async function fetchQuayConfig() {
  const configUrl = '/config';
  try {
    const response: AxiosResponse = await axios.get(configUrl);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
