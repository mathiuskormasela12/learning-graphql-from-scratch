// ========== Resolvers
// import all packages
import jwt from 'jsonwebtoken'
import { badRequestError, notFoundError, serverError, unauthorizedError } from './helpers/error.js'
import { parseDate } from './helpers/date.js'
import { createJob, deleteJob, getCompanyById, getJobById, getJobByIdAndCompanyId, getJobs, getUserByEmail, updateJob } from './db/operations.js'
import config from './config/config.js'

/*
  If we want to implement authentication
  better we implement it by RESTful API instead. Because
  authentication will be done at the HTTP
  layer. So better we implement that at RESTful API, and for checking
  if the user has logged in already, we can use Context in GraphQL.
*/

export const resolvers = {
  // Query is used to implement the Query schema.
  // Query only used for reading actions.
  // The fields name should be match with its schema.
  Query: {
    // Get all existing jobs
    jobs: async () => {
      try {
        const jobs = await getJobs()

        if (jobs.length > 0) {
          return jobs
        }

        return notFoundError('Jobs are unavailable yet')
      } catch (err) {
        throw serverError(err?.message ?? '')
      }
    },

    // Get a single job by its id
    job: async (__root, { jobId }) => {
      try {
        const job = await getJobById(jobId)

        if (job) {
          return job
        }

        return notFoundError(`Job with id ${jobId} is not found`)
      } catch (err) {
        throw serverError(err?.message ?? '')
      }
    }
  },

  // This one is used to modify the Job schema
  // If we want to modify an atributes of a schma, we can define the schema name
  // and then map the data.
  // jobs query by default will not return the associated company,
  // then we map the company below, by defining the Job Schema
  Job: {
    company: (data) => getCompanyById(data.companyId),
    date: (data) => parseDate(data.createdAt)
  },

  // Mutation is used to implement the Mutation schema.
  // The fields name should be match with its schema.
  Mutation: {
    // Create Jobs
    createJob: (__root, { title, description, companyId }) => {
      return createJob({ title, description, companyId })
    },
    createJobWithInput: async (__root, { input: { title, description } }, { auth, companyId }) => {
      if (auth?.message === null) {
        return createJob({ title, description, companyId })
      }

      throw unauthorizedError(auth.message)
    },

    // Remove Job
    removeJob: async (__root, { jobId }, { companyId }) => {
      try {
        const job = await getJobByIdAndCompanyId({ jobId, companyId })

        if (job) {
          await deleteJob(jobId)

          return job
        }

        return notFoundError(`Job with id ${jobId} is not found`)
      } catch (err) {
        throw serverError(err?.message ?? '')
      }
    },

    // Update Job
    updateJob: async (__root, { input: { jobId, title, description } }, { companyId }) => {
      try {
        const job = await getJobByIdAndCompanyId({ jobId, companyId })

        if (job) {
          return await updateJob({ jobId, title, description })
        }

        return notFoundError(`Job with id ${jobId} is not found`)
      } catch (err) {
        throw serverError(err?.message ?? '')
      }
    },

    // Login
    login: async (__root, { input: { email, password } }) => {
      try {
        const user = await getUserByEmail(email)

        if (user && user.password === password) {
          const token = jwt.sign({ id: user.id }, config.SECRET_KEY, { expiresIn: 60 * 10 })
          return {
            token
          }
        }

        return badRequestError('Email or password is wrong')
      } catch (err) {
        throw serverError(err?.message ?? '')
      }
    }
  }
}
