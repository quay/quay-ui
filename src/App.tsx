import React, {Suspense, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import 'src/App.css';

import {LoadingPage} from 'src/components/LoadingPage';
import {StandaloneMain} from 'src/routes/StandaloneMain';
import {Signin} from 'src/routes/Signin/Signin';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/*" element={<StandaloneMain />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
