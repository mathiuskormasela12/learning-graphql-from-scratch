// ========= Database Oprations
// import all packages
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getJobs = () => {
  return prisma.job.findMany()
}

export const getJobById = (jobId) => {
  return prisma.job.findFirst({
    where: {
      id: jobId
    }
  })
}

export const getCompanyById = (companyId) => {
  return prisma.company.findFirst({
    where: {
      id: companyId
    }
  })
}

export const createJob = ({ companyId, title, description }) => {
  return prisma.job.create({
    data: {
      title,
      description,
      companyId
    }
  })
}

export const deleteJob = (jobId) => prisma.job.delete({ where: { id: jobId } })

export const updateJob = ({ jobId, title, description }) => prisma.job.update({ where: { id: jobId }, data: { title, description } })
