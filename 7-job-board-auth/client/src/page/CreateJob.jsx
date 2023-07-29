// ========== Create Job
// import all packages
import React, { Fragment, useState } from 'react'

// import all components
import { Navbar } from '../components'
import { useValidation } from '../hooks/useValidation'
import { createJob } from '../lib/queries'
import { useNavigate } from 'react-router-dom'

function CreateJob () {
  const navigate = useNavigate()
  const [state, setState] = useState({
    loading: false,
    error: false
  })

  const { register, errors, handleSubmit } = useValidation({
    title: '',
    description: ''
  })

  const onSubmit = async (data) => {
    try {
      const { id } = await createJob({
        title: data.title,
        description: data.description
      })
      navigate(`/job/${id}`)
    } catch (err) {
      setState((currentState) => ({
        ...currentState,
        loading: false,
        error: true
      }))
    }
  }

  const { loading, error } = state

  return (
    <Fragment>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <h1>Create Job</h1>
          </div>
          <div className="col-md-12 mt-4">
            {error && (
              <div className="alert alert-danger" role="alert">
               Failed to create job
              </div>
            )}
           <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className={`form-control ${errors?.title?.message?.length > 0 && 'is-invalid'}`}
                id="title"
                placeholder="Job Title"
                {...register('title', { required: 'Title is required' })}
              />
              <div id="title" className="invalid-feedback">
               {errors?.title?.message ?? ''}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Jobs Description</label>
              <textarea
                className={`form-control ${errors?.description?.message?.length > 0 && 'is-invalid'}`}
                id="description"
                placeholder="Job Description"
                rows="3"
                {...register('description', {
                  maxLength: {
                    value: 100,
                    message: 'Description is too long, max(100 character)'
                  }
                })}
              >
              </textarea>
              <div id="description" className="invalid-feedback">
               {errors?.description?.message ?? ''}
              </div>
            </div>
            <button type="submit" className="btn btn-primary mb-3" disabled={loading}>
              {loading ? 'Please Wait...' : 'Create Job'}
            </button>
           </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default CreateJob
