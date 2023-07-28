// ========== GraphQL Error
// import all packages
import { GraphQLError } from 'graphql'

export const notFoundError = (message) => {
  // Define GraphQL Custom Error
  return new GraphQLError(message, {
    extensions: {
      code: 'NOT_FOUND'
    }
  })
}

export const serverError = (message) => {
  // Define GraphQL Custom Error
  return new GraphQLError(message, {
    extensions: {
      code: 'SERVER_ERROR'
    }
  })
}
