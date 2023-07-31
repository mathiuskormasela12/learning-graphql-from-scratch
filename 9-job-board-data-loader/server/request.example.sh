# Get Existing Jobs
query GetJobs {
  jobs {
    id
    title
    company {
      name
    }
  }
}

# Get a Job by its id
query GetJobById($jobId: ID!) {
  job(jobId: $jobId) {
    id
    title
    description
    date
    company {
      name
    }
  }
}

# Create Job Standard
mutation {
  createJob(companyId: "89ef91e6-fac1-4d74-91a3-42210d7f2981", title: "Viviz Member", description: "We need a 25 years old woman to be a leader of Viviz") {
    id
    title
  }
}

# Create Job with Variable and add an aliases
mutation CreateJob($companyId: String!, $title: String!, $description: String) {
  job: createJob(companyId: $companyId, title: $title, description: $description) {
    id
    title
  }
}

# Create job with Input
mutation CreateJobWithInput($input: CreateJobInput) {
  job: createJobWithInput(input: $input) {
    id
  }
}

# Delete Job
mutation DeleteSingleJob($jobId: ID!) {
  job: removeJob(jobId: $jobId) {
    id
  }
} 

# Update Job
mutation UpdateSingleJob($input: UpdateJobInput) {
  job: updateJob(input: $input) {
    id
    title
    description
  }
}

