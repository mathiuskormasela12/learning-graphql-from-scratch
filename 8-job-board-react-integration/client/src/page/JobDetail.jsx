// ========== Job Detail
// import all packages
import React, { Fragment } from 'react'
import { useJob } from '../lib/hooks'

// import all components
import { Card, Navbar } from '../components'
import { useParams } from 'react-router-dom'

function JobDetail () {
  const { jobId } = useParams()

  const { job, loading, error } = useJob(jobId)

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
