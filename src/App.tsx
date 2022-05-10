import React, { Suspense } from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { LoadingPage } from 'src/components/LoadingPage';
import {StandaloneMain} from "./routes/StandaloneMain";
import {Signin} from "./routes/Signin";

export default function App() {
      return (
          <div className="App">
                <BrowserRouter>
                      <Suspense fallback={<LoadingPage/>}>
                            <Routes>
                                  <Route path="/signin" element={<Signin/>}/>
                                  <Route path="/*" element={<StandaloneMain/>} />
                            </Routes>
                      </Suspense>
                </BrowserRouter>
          </div>
      );
}
