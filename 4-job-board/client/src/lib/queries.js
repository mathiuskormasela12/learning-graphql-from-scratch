// ========= GraphQL Request
import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('http://localhost:8080/graphql');

export const getJobs = async () => {
  const query = gql`
    query GetJobs {
      jobs {
        id
        title
        description
        date
      }
    }
  `;

  const { jobs } = await client.request(query);
  return jobs;
};

export const getJobDetail = async (jobId) => {
  const query = gql`
    query GetJobDetail($jobId: ID!) {
      job(jobId: $jobId) {
        id
        title
        description
        date
        company {
          name
          jobs {
            id
            title
            description
            date
          }
        }
      }
    }
  `;

  const { job } = await client.request(query, { jobId });
  return job;
};
