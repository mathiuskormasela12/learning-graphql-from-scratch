// ========= Queries
// import all packages
import { GraphQLClient, gql } from 'graphql-request'
import config from '../config/config'

const client = new GraphQLClient(`${config.API_URL}/graphql`)

export const getJobs = async () => {
  const query = gql`
    query GetJobs {
      jobs {
        id
        title
        company {
          name
        }
      }
    }
  `

  const { jobs } = await client.request(query)
  return jobs
}

export const getJob = async (jobId) => {
  const query = gql`
    query GetJob($jobId: ID!) {
      job(jobId: $jobId) {
        id
        title
        description
        company {
          name
        }
      }
    } 
  `

  const { job } = await client.request(query, { jobId })
  return job
}

export const createJob = async ({ companyId, title, description }) => {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJobWithInput(input: $input) {
        id
      }
    } 
  `

  const { job } = await client.request(mutation, { input: { companyId, title, description } })
  return job
}
