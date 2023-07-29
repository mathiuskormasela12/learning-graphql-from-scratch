// ========= Card
// import all packages
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export function Card (props) {
  return (
    <div className="card">
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text} {props.company && <span className='fw-bold'>at {props.company}</span>}</p>}
        {props.detail && <Link to={`/job/${props?.id ?? ''}`} className="btn btn-primary">Detail</Link>}
      </div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  company: PropTypes.string,
  detail: PropTypes.bool
}

Card.defaultProps = {
  title: '',
  company: null,
  detail: false
}
