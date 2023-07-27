// ========== Resolvers
// import all packages
import Service from './services/Service.js';
import { toIsoDate } from './helpers/toIsoDate.js';
import { notFound } from './helpers/notFound.js';

export const resolvers = {
  Query: {
    jobs: () => Service.getJobs(),
    job: (_data, { jobId }) => Service.getJob(jobId),
    company: async (__data, { companyId }) => {
      const result = await Service.getCompanyById(companyId);

      if (result) {
        return result;
      }

      throw notFound('Company not found');
    },
  },
  Job: {
    // company: (data) => data.company2,
    company: (data) => Service.getCompanyById(data.companyId),
    date: (data) => toIsoDate(data.createdAt),
  },
};
