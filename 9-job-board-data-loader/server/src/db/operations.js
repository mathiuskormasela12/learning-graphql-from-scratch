// ========= Database Oprations
// import all packages
import { PrismaClient } from '@prisma/client'
import DataLoader from 'dataloader'

export const prisma = new PrismaClient({
  log: ['query']
})

export const getJobs = () => {
  return prisma.job.findMany()
}

export const getJobById = (jobId) => {
  return prisma.job.findUnique({
    where: {
      id: jobId
    }
  })
}

export const getJobByIdAndCompanyId = ({ jobId, companyId }) => {
  return prisma.job.findUnique({
    where: {
      id: jobId,
      companyId
    }
  })
}

// DataLoader is used to improve performance
// getCompanyByIdLoader will be run after the jobs query has been finished loading data from db
// and then the getCompanyByIdLoader will be run once.
// But DataLoader will cache our data permanently.
// If the company data is updated, the client can't see the updated data.
// To fix this problem, we can implement the data loader at Context instead
export const getCompanyByIdLoader = new DataLoader(async (ids) => {
  console.log('[companyLoader]', ids)
  const companies = await prisma.company.findMany({
    where: {
      id: {
        in: ids
      }
    }
  })
  return ids.map(id => companies.find(company => company.id === id))
})

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

export const getUserByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } })
}

export const getUserByid = (id) => {
  return prisma.user.findUnique({ where: { id } })
}
