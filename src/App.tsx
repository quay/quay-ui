import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Main } from './routes/Main';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
