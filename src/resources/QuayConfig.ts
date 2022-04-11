import { getBackendUrl } from '../utils/httputils';

const testConfig = {
  AUTHENTICATION_TYPE: 'Database',
};

export function fetchQuayConfig() {
  /* const configUrl = `${getBackendUrl()}/config`
    return this.fetch(configUrl) */
  return new Promise((resolve) => {
    setTimeout(() => resolve(testConfig), 5000);
  });
}
