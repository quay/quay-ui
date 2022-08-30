import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from 'recoil';
import '@patternfly/patternfly/patternfly.css';
import '@patternfly/patternfly/patternfly-addons.css';
import App from './App';

// Load App after patternfly so custom CSS that overrides patternfly doesn't require !important
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
