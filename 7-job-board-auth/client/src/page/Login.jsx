// ========== Login
// import all packages
import React, { Fragment, useState } from 'react'

// import all components
import { Navbar } from '../components'
import { useValidation } from '../hooks/useValidation'
import { login } from '../lib/queries'
import { useNavigate } from 'react-router-dom'

function Login () {
  const navigate = useNavigate()
  const [state, setState] = useState({
    loading: false,
    error: false,
    message: null
  })

  const { register, errors, handleSubmit } = useValidation({
    email: '',
    password: ''
  })

  const onSubmit = async (data) => {
    try {
      const { token } = await login({
        email: data.email,
        password: data.password
      })
      localStorage.setItem('ACCESS_TOKEN', token)
      navigate('/')
    } catch (err) {
      console.log()
      setState((currentState) => ({
        ...currentState,
        loading: false,
        error: true,
        message: err?.response?.errors[0]?.message ?? 'Failed to login'
      }))
    }
  }

  const { loading, error, message } = state

  return (
    <Fragment>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <h1>Login</h1>
          </div>
          <div className="col-md-12 mt-4">
            {error && (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            )}
           <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors?.email?.message?.length > 0 && 'is-invalid'}`}
                id="title"
                placeholder="Email"
                {...register('email', { required: 'email is required' })}
              />
              <div id="email" className="invalid-feedback">
               {errors?.email?.message ?? ''}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${errors?.password?.message?.length > 0 && 'is-invalid'}`}
                id="password"
                placeholder="Password"
                {...register('password', { required: 'password is required' })}
              />
              <div id="description" className="invalid-feedback">
               {errors?.password?.message ?? ''}
              </div>
            </div>
            <button type="submit" className="btn btn-primary mb-3" disabled={loading}>
              {loading ? 'Please Wait...' : 'Login'}
            </button>
           </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Login
