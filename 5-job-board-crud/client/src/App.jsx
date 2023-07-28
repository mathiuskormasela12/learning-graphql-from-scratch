// ========== App
// import all packages
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import all pages
import Jobs from './page/Jobs'
import JobDetail from './page/JobDetail'
import CreateJob from './page/CreateJob'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Jobs />} />
        <Route path='/job/:jobId' element={<JobDetail />} />
        <Route path='/job/create' element={<CreateJob />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
