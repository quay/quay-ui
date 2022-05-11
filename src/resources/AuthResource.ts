import axios from "src/libs/axios";


const loginApiUrl  = "/api/v1/signin"
const csrfTokenUrl = "/csrf_token"

interface AuthResource {
    isLoggedIn: boolean,
    csrfToken: string | null,
}

export const GlobalAuthState: AuthResource = {
   isLoggedIn: false,
   csrfToken: null,
}

export async function loginUser(username: string, password: string) {
    try {
        const response = await axios.post(loginApiUrl, {username: username, password: password});
        console.log(response)
        return response.data;
    } catch (error: any) {
        throw new Error(`API error login user ${error.message}`);
    }
}

export async function getCsrfToken() {
    try {
        const response = await axios.get(csrfTokenUrl);
        console.log('setting csrf token');
        console.log(response.data);
        GlobalAuthState.csrfToken = response.data.csrf_token;
        return response.data;
    } catch (error: any) {
        throw new Error(`API error login user ${error.message}`);
    }
}
