// ========= Service
// import all packages
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

class Service {
  static getJobs() {
    return prismaClient.job.findMany({
      // include: {
      //   company2: true,
      // },
    });
  }

  static getJob(jobId) {
    return prismaClient.job.findFirst({
      include: {
        company2: true,
      },
      where: {
        id: jobId,
      },
    });
  }

  static getCompanyById(companyId) {
    return prismaClient.company.findFirst({
      where: {
        id: companyId,
      },
      include: {
        jobs: true,
      },
    });
  }
}

export default Service;
