# with arguments for passing data, similar like request body on REST
# arguments can't escaping string, if you want to escape string, you have to use
# argument instead
query MyJob {
  job(jobId: "84ac232f-99dd-4a69-bc2b-4e66c631e3a9") {
    id
    title
    description
    date
    company {
      id
      name
      description
    }
  }
}

# with Variables for escaping string, simialar like request body on REST
# variable will escape string as well
query MyJob($jobId: String!){
  job(jobId: $jobId) {
    id
    title
    description
    date
    company {
      id
      name
      description
    }
  }
}

