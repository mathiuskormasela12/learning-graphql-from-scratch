// ========== Job Detail
// import all packages
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import { getJobDetail } from '../lib/queries';

function JobDetail() {
  const params = useParams();

  const [state, setState] = useState({
    job: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    const handleGetJob = async () => {
      setState({ error: false, loading: true, job: null });

      try {
        const result = await getJobDetail(params.jobId);
        setState({ error: false, loading: false, job: result });
      } catch {
        setState({ error: true, loading: false, job: null });
      }
    };

    handleGetJob();
  }, []);

  const { job, loading, error } = state;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !job) {
    return <p>Data unavilable</p>;
  }

  return (
    <div className="container">
      <h1 className="title is-2 mt-6 mb-4">{job?.company?.name ?? 'Company Name'}</h1>
      <Card
        title={job?.title ?? 'Job Title'}
        description={job?.description ?? 'Jobs Descripton'}
        date={job?.date ?? 'yyyy-mm-dd'}
        jobId={params?.jobId ?? ''}
        noDetail
      />

      {job?.company?.jobs?.length && (
      <>
        <h3 className="title is-4 mb-4">Existing Job</h3>
          {
            job.company.jobs.map((item) => (
              <Card
                key={item.id}
                title={item?.title ?? 'Job Title'}
                description={item?.description ?? 'Jobs Descripton'}
                date={item?.date ?? 'yyyy-mm-dd'}
                jobId={item?.id ?? ''}
                noDetail
              />
            ))
          }
      </>
      )}

    </div>
  );
}

export default JobDetail;
