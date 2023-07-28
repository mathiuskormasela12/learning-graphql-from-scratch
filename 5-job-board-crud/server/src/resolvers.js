// ========== Resolvers
// import all packages
import { notFoundError, serverError } from './helpers/error.js'
import { parseDate } from './helpers/date.js'
import { createJob, deleteJob, getCompanyById, getJobById, getJobs, updateJob } from './db/operations.js'

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
        console.log('LOVE')
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
    company: (__root, { companyId }) => getCompanyById(companyId),
    date: (data) => parseDate(data.createdAt)
  },

  // Mutation is used to implement the Mutation schema.
  // The fields name should be match with its schema.
  Mutation: {
    // Create Jobs
    createJob: (__root, { title, description, companyId }) => {
      return createJob({ title, description, companyId })
    },
    createJobWithInput: (__root, { input: { companyId, title, description } }) => {
      return createJob({ title, description, companyId })
    },

    // Remove Job
    removeJob: async (__root, { jobId }) => {
      try {
        const job = await getJobById(jobId)

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
    updateJob: async (__root, { input: { jobId, title, description } }) => {
      try {
        const job = await getJobById(jobId)

        if (job) {
          return await updateJob({ jobId, title, description })
        }

        return notFoundError(`Job with id ${jobId} is not found`)
      } catch (err) {
        throw serverError(err?.message ?? '')
      }
    }
  }
}
