import axios from 'src/libs/axios';

const signinApiUrl = '/api/v1/signin';
const signoutApiUrl = '/api/v1/signout';
const csrfTokenUrl = '/csrf_token';

interface AuthResource {
  isLoggedIn: boolean;
  csrfToken: string | null;
}

export const GlobalAuthState: AuthResource = {
  isLoggedIn: false,
  csrfToken: null,
};

export async function loginUser(username: string, password: string) {
  try {
    const response = await axios.post(signinApiUrl, {
      username: username,
      password: password,
    });
    if (response.data == 'success') {
      GlobalAuthState.isLoggedIn = true;
      // reset csrf token
      GlobalAuthState.csrfToken = undefined;
    }
    return response.data;
  } catch (error: any) {
    throw new Error(`API error login user ${error.message}`);
  }
}

export async function logoutUser() {
  try {
    const response = await axios.post(signoutApiUrl);
    GlobalAuthState.isLoggedIn = false;
    GlobalAuthState.csrfToken = undefined;
    return response.data;
  } catch (error: any) {
    throw new Error(`API error login user ${error.message}`);
  }
}

export async function getCsrfToken() {
  try {
    const response = await axios.get(csrfTokenUrl);
    GlobalAuthState.csrfToken = response.data.csrf_token;
    return response.data;
  } catch (error: any) {
    throw new Error(`API error login user ${error.message}`);
  }
}
