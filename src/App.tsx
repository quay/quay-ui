import React, {Suspense, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import 'src/App.css';

import {LoadingPage} from 'src/components/LoadingPage';
import {StandaloneMain} from 'src/routes/StandaloneMain';
import {Signin} from 'src/routes/Signin/Signin';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<LoadingPage />}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/*" element={<StandaloneMain />} />
              <Route path="/signin" element={<Signin />} />
            </Routes>
          </QueryClientProvider>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
