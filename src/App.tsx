import React, {Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import 'src/App.css';

import {LoadingPage} from 'src/components/LoadingPage';
import {StandaloneMain} from 'src/routes/StandaloneMain';
import {Signin} from 'src/routes/Signin/Signin';
import {useAnalytics} from 'src/hooks/UseAnalytics';

const queryClient = new QueryClient();

export default function App() {
  useAnalytics();

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<LoadingPage />}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/*" element={<StandaloneMain />} />
              <Route path="/signin" element={<Signin />} />
            </Routes>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
