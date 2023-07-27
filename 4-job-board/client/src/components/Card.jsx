// ========= Card
// import all packages
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Card(props) {
  const {
    title, description, date, jobId, noDetail,
  } = props;

  return (
    <div className="card mb-5">
      <header className="card-header">
        <p className="card-header-title">
          {title}
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          {description}
        </div>
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
          Posted at :
          {' '}
          {date}
        </p>
        {!noDetail && <Link to={`/job-detail/${jobId}`} className="card-footer-item">Detail</Link>}
      </footer>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  jobId: PropTypes.string,
  noDetail: PropTypes.bool,
};

Card.defaultProps = {
  jobId: null,
  noDetail: false,
};

export default Card;
