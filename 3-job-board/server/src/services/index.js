// ========= Services
// import all packages
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

class Services {
  static async getJobs() {
    return prismaClient.job.findMany({
      include: {
        company: true,
      },
    });
  }
}

export default Services;
