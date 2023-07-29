// ========= Queries
// import all packages
import { GraphQLClient, gql } from 'graphql-request'
import config from '../config/config'

const client = new GraphQLClient(`${config.API_URL}/graphql`, {
  // Define header. We're able to define header at a specific request as well, but if we define header on GraphQLCLient, it will affect to all request
  // Headers should be define as a function, if we define header as an object
  // The header will be rendered once, when the graphql client is defined
  // I mean when browser load the web.
  // So if you change the token, it will not updated on the headers
  headers: () => {
    return {
      'X-ACCESS-TOKEN': localStorage.getItem('ACCESS_TOKEN')
    }
  }
})

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

export const login = async ({ email, password }) => {
  const mutation = gql`
    mutation Login($input: LoginUser!) {
      user: login(input: $input) {
        token
      }
    }
  `

  const { user } = await client.request(mutation, { input: { email, password } })
  return user
}
