// ========== Job Detail
// import all packages
import React, { Fragment, useState, useEffect } from 'react'
import { getJob } from '../lib/queries'

// import all components
import { Card, Navbar } from '../components'
import { useParams } from 'react-router-dom'

function JobDetail () {
  const params = useParams()

  const [state, setState] = useState({
    job: null,
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
        const result = await getJob(params.jobId)
        setState((currentState) => ({
          ...currentState,
          loading: false,
          error: false,
          job: result
        }))
      } catch (err) {
        console.log(err.message)
        setState((currentState) => ({
          ...currentState,
          loading: false,
          error: true,
          job: null
        }))
      }
    }

    handleGetJob()
  }, [])

  const { loading, error, job } = state

  return (
    <Fragment>
      <Navbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <h1>Job Detail</h1>
          </div>

          {loading && <h4>Please wait...</h4>}

          {error && <h4>Job is unvailable</h4>}

          {
            !loading && !error && job && (
              <div className="col-md-12">
                <div className="row mt-3">
                  <div className="col-md-12" key={job.id}>
                    <Card
                      title={job.title}
                      text={job.description}
                      company={job.company.name}
                      id={job.id}
                    />
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </Fragment>
  )
}

export default JobDetail
