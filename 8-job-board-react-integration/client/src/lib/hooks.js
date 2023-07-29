// ========= Query Hooks
// import all packages
import { useQuery, useMutation, gql } from '@apollo/client'

export const useJobs = () => {
  const query = gql`
    query GetJobs {
      jobs {
        id
        title
        company {
          name
        }
      }
    }
`

  const { data, loading, error } = useQuery(query, {
    fetchPolicy: 'network-only'
  })

  return {
    jobs: data?.jobs ?? [],
    loading,
    error: Boolean(error)
  }
}

const jobIdFieldsFragment = gql`
  fragment JobIdFields on Job {
    id
    title
    description
    company {
      name
    }
  }
`

export const useJob = (id) => {
  const getJobByIdQuery = gql`
    query GetJob($jobId: ID!) {
      job(jobId: $jobId) {
        ...JobIdFields
      }
    } 

    ${jobIdFieldsFragment}
  `

  const { data, loading, error } = useQuery(getJobByIdQuery, {
    variables: {
      jobId: id
    }
  })

  return {
    job: data?.job ?? null,
    loading,
    error
  }
}

export const useCreateJob = () => {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJobWithInput(input: $input) {
        ...JobIdFields
      }
    }

    ${jobIdFieldsFragment} 
  `

  const [mutate, result] = useMutation(mutation)

  const { loading, error } = result

  const handleCreateJob = async (title, description) => {
    const { data } = await mutate({
      variables: {
        input: {
          title,
          description
        }
      },
      fetchPolicy: 'network-only'
    })

    return data?.job ?? {}
  }

  return {
    loading,
    error,
    handleCreateJob
  }
}
