import React, {useState} from 'react';
import {
  LoginForm,
  LoginMainFooterBandItem,
  LoginPage,
} from '@patternfly/react-core';
import logo from 'src/assets/RH_QuayIO2.svg';
import {ExclamationCircleIcon} from '@patternfly/react-icons';
import {GlobalAuthState, loginUser} from 'src/resources/AuthResource';
import {useNavigate} from 'react-router-dom';
import {getUser} from 'src/resources/UserResource';
import {useRecoilState} from 'recoil';
import {UserState} from 'src/atoms/UserState';
import {AuthState} from 'src/atoms/AuthState';

export function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [, setUserState] = useRecoilState(UserState);
  const [, setAuthState] = useRecoilState(AuthState);

  const navigate = useNavigate();

  const onLoginButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      if (response.success) {
        const user = await getUser();
        setUserState(user);
        setAuthState((old) => {
          return {...old, isSignedIn: true};
        });

        GlobalAuthState.isLoggedIn = true;
        navigate('/');
      }
    } catch (err) {
      // TODO: handle login error
      console.error(err);
    }
  };

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
      isRememberMeChecked={rememberMe}
      onChangeRememberMe={(v) => setRememberMe(v)}
      onLoginButtonClick={(e) => onLoginButtonClick(e)}
      loginButtonLabel="Log in"
    />
  );

  return (
    <LoginPage
      className={'pdf-u-background-color-100'}
      brandImgSrc={logo}
      brandImgAlt="Red Hat Quay"
      backgroundImgSrc="assets/images/rh_login.jpeg"
      backgroundImgAlt="Red Hat Quay"
      textContent="Quay.io builds, analyzes and distributes your container images. Store your containers with added security. Easily build and deploy new containers. Scan containers to provide security."
      loginTitle="Log in to your account"
    >
      {loginForm}
    </LoginPage>
  );
}
