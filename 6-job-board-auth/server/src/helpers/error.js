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

export const badRequestError = (message) => {
  return new GraphQLError(message, {
    extensions: {
      code: 'BAD_REQUEST'
    }
  })
}

export const unauthorizedError = (message) => {
  return new GraphQLError(message, {
    extensions: {
      code: 'UNAUTHORIZED'
    }
  })
}
