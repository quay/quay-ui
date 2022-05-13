import React, {useState} from 'react';
import {LoginForm, LoginMainFooterBandItem, LoginPage} from "@patternfly/react-core";
import logo from 'src/assets/RH_QuayIO2.svg';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import {GlobalAuthState, loginUser} from "../../resources/AuthResource";
import {useNavigate} from "react-router-dom";
import {getUser} from "../../resources/UserResource";
import {useRecoilState} from "recoil";
import {UserState} from "../../atoms/UserState";
import {AuthState} from "../../atoms/AuthState";

export function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [, setUserState] = useRecoilState(UserState);
    const [, setAuthState] = useRecoilState(AuthState);

    const navigate = useNavigate();

    const onLoginButtonClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log(`login submit ${username}, ${password}`);
        try {
            const response = await loginUser(username, password)
            console.log(response);
            if (response.success) {
                const user = await getUser();
                setUserState(user);
                setAuthState((old) => {
                    return { ...old, isSignedIn: true }
                });

                GlobalAuthState.isLoggedIn = true;
                navigate("/")
            }
        } catch (err) {
            // TODO: handle login error
            console.error(err);
        }

    }

    const signUpForAccountMessage = (
        <LoginMainFooterBandItem>
            Need an account? <a href="src/routes/Login/Signin#">Sign up.</a>
        </LoginMainFooterBandItem>
    );

    const forgotCredentials = (
        <LoginMainFooterBandItem>
            <a href="src/routes/Login/Signin#">Forgot username or password?</a>
        </LoginMainFooterBandItem>
    );

    const helperText = (
        <React.Fragment>
            <ExclamationCircleIcon />
            &nbsp;Invalid login credentials.
        </React.Fragment>
    );


    const loginForm = (
        <LoginForm
            showHelperText={false}
            helperText={helperText}
            helperTextIcon={<ExclamationCircleIcon />}
            usernameLabel="Username"
            usernameValue={username}
            onChangeUsername={(v) => setUsername(v)}
            isValidUsername={true}
            passwordLabel="Password"
            passwordValue={password}
            onChangePassword={(v) => setPassword(v)}
            isValidPassword={true}
            rememberMeLabel="Keep me logged in for 30 days."
            isRememberMeChecked={rememberMe}
            onChangeRememberMe={(v) => setRememberMe(v)}
            onLoginButtonClick={(e) => onLoginButtonClick(e)}
            loginButtonLabel="Log in"
        />
    );

    return (
        <LoginPage
            className={"pdf-u-background-color-100"}
            brandImgSrc={logo}
            brandImgAlt="Red Hat Quay"
            backgroundImgSrc="assets/images/rh_login.jpeg"
            backgroundImgAlt="Red Hat Quay"
            textContent="Quay.io builds, analyzes and distributes your container images. Store your containers with added security. Easily build and deploy new containers. Scan containers to provide security."
            loginTitle="Log in to your account"
            signUpForAccountMessage={signUpForAccountMessage}
            forgotCredentials={forgotCredentials}
        >
            {loginForm}
        </LoginPage>
    );
}
