// ========= Navbar
// import all packages
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export function Navbar () {
  const location = useLocation()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">Job Board</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${location?.pathname === '/' && 'active'}`} to="/">Jobs</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location?.pathname === '/job/create' && 'active'}`} to="/job/create">Create Job</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
