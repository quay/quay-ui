import {AxiosRequestConfig} from 'axios';
import MockAxios from '../../MockAxios';

const response = {
  success: true,
};

MockAxios.onPost('/signin').reply((request: AxiosRequestConfig) => {
  const {username, password} = JSON.parse(request.data);

  // eslint-disable-next-line no-console
  console.log(`login request ${username}: ${password}`);

  return [200, response];
});
