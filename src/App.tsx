import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import 'src/App.css';
import { RecoilRoot } from 'recoil';
import { StandaloneMain } from 'src/routes/StandaloneMain';


function App() {
    return (
    <div className="App">
      <RecoilRoot>
          <StandaloneMain />
     </RecoilRoot>
    </div>
  );
}

export default App;
