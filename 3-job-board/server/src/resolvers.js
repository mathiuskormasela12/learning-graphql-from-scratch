// ========== Resolvers
// import all packages
import { toIsoDate } from './helpers/toIsoDate.js';
import Services from './services/index.js';

export const resolvers = {
  Query: {
    jobs: async () => Services.getJobs(),
  },

  Job: {
    date: (job) => toIsoDate(job.createdAt),
  },
};
