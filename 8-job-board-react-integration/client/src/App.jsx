// ========== App
// import all packages
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './lib/queries'

// import all pages
import Jobs from './page/Jobs'
import JobDetail from './page/JobDetail'
import CreateJob from './page/CreateJob'
import Login from './page/Login'

function App () {
  return (
   <ApolloProvider client={apolloClient}>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Jobs />} />
        <Route path='/job/:jobId' element={<JobDetail />} />
        <Route path='/job/create' element={<CreateJob />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
   </ApolloProvider>
  )
}

export default App
