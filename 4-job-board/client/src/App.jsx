// ========== App
// import all packages
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/job-detail/:jobId" element={<JobDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
