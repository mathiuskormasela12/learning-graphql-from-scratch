// ========== Jobs
// import all packages
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { getJobs } from '../lib/queries';

function Jobs() {
  const [state, setState] = useState({
    jobs: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    const handleGetJobs = async () => {
      setState({ error: false, loading: true, jobs: [] });

      try {
        const result = await getJobs();
        setState({ error: false, loading: false, jobs: [...result] });
      } catch {
        setState({ error: true, loading: false, jobs: [] });
      }
    };

    handleGetJobs();
  }, []);

  const { jobs, loading, error } = state;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Data unavilable</p>;
  }

  return (
    <div className="container">
      <h1 className="title is-2 mt-6 mb-4">Job Lists</h1>
      {
      jobs.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          description={item.description}
          date={item.date}
          jobId={item.id}
        />
      ))
     }
    </div>
  );
}

export default Jobs;
