// ========== Jobs
// import all packages
import React, { Fragment, useState, useEffect } from 'react'
import { getJobs } from '../lib/queries'

// import all components
import { Card, Navbar } from '../components'

function Jobs () {
  const [state, setState] = useState({
    jobs: [],
    loading: true,
    error: false
  })
  useEffect(() => {
    const handleGetJob = async () => {
      setState((currentState) => ({
        ...currentState,
        loading: true,
        error: false
      }))

      try {
        const result = await getJobs()
        setState((currentState) => ({
          ...currentState,
          loading: false,
          error: false,
          jobs: result
        }))
      } catch (err) {
        console.log(err.message)
        setState((currentState) => ({
          ...currentState,
          loading: false,
          error: true,
          jobs: []
        }))
      }
    }

    handleGetJob()
  }, [])

  const { loading, error, jobs } = state

  return (
    <Fragment>
      <Navbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <h1>Job Lists</h1>
          </div>

          {loading && <h4>Please wait...</h4>}

          {error && <h4>Jobs are unvailable</h4>}

          {
            !loading && !error && jobs.length > 0 && (
              <div className="col-md-12">
                <div className="row mt-3">
                 {jobs.map(job => (
                   <div className="col-md-12" key={job.id}>
                    <Card
                      text={job.title}
                      company={job.company.name}
                      id={job.id}
                      detail
                    />
                  </div>
                 ))}
                </div>
              </div>
            )
          }
        </div>
      </div>
    </Fragment>
  )
}

export default Jobs
