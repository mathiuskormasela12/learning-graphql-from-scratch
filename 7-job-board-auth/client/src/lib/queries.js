// ========= Queries
// import all packages
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  // gql package from @apollo/client returns DocumentNode Object instaed and will parse will show errors if we write wrong syntax
  // bit gql package from graphql-request returns a string only, because it uses for syntax highlighting
  gql,
  InMemoryCache,
  concat
} from '@apollo/client'
import config from '../config/config'

const httpLink = createHttpLink({
  uri: `${config.API_URL}/graphql`
})

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN')

  if (accessToken) {
    operation.setContext({
      headers: {
        'X-ACCESS-TOKEN': accessToken
      }
    })
  }

  return forward(operation)
})

// Instantiate Apollo Client Object
const apolloClient = new ApolloClient({
  uri: `${config.API_URL}/graphql`,

  // we erite link instead of uri bcs we want to add header to the request object
  // the order is important, because we need authLink is rendered first before httpLink
  link: concat(authLink, httpLink),
  cache: new InMemoryCache()

  // This one is used to preven caching in Apollo Client.
  // Because Apollo Client will cache our data automatically, if we don't change this options.
  // By default, when we visit a page that fetch data with Apollo Client, Apollo client will cached the fetched data automatically
  // and when we visit that page again, Apollo won't fetch the data from server, but will data from the cached.
  // but if we reload tha web page, apollo client will fetch data from the server.
  // defaultOptions: {
  //   query: {
  //     // Most common value of fetchPolicy is "network-only" and "cache-first".
  //     // "cache-first" is a default value, it will cache the fetched data automatically.
  //     // "network-only" will fetch data from the server always.
  //     // We can configure fetch policy on the specific request
  //     // if we set on the Apollo Client Object, it will be a global options and will effect all apollo request
  //     fetchPolicy: 'network-only'
  //   },
  //   // This one is used for react hooks, we have to set sama value with the query above
  //   watchQuery: {
  //     fetchPolicy: 'network-only'
  //   }
  // }
})

export const getJobs = async () => {
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

  const { data } = await apolloClient.query({
    query,
    // Set fetch policy on specific request
    fetchPolicy: 'network-only'
  })

  return data.jobs
}

export const getJob = async (jobId) => {
  const query = gql`
    query GetJob($jobId: ID!) {
      job(jobId: $jobId) {
        id
        title
        description
        company {
          name
        }
      }
    } 
  `

  const { data } = await apolloClient.query({
    query,
    variables: {
      jobId
    }
  })
  return data.job
}

export const createJob = async ({ companyId, title, description }) => {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJobWithInput(input: $input) {
        id
      }
    } 
  `

  const { data } = await apolloClient.mutate({
    mutation,
    variables: {
      input: {
        companyId,
        title,
        description
      }
    }
    // Setup headers on specific request
    // context: {
    //   headers: {
    //     'x-access-token': localStorage.getItem('ACCESS_TOKEN')
    //   }
    // }
  })

  return data.job
}

export const login = async ({ email, password }) => {
  const mutation = gql`
    mutation Login($input: LoginUser!) {
      user: login(input: $input) {
        token
      }
    }
  `

  const { data } = await apolloClient.mutate({
    mutation,
    variables: {
      input: {
        email,
        password
      }
    }
  })
  return data.user
}
