// ========== Not Found
// import all packages
import { GraphQLError } from 'graphql';

export const notFound = (message) => new GraphQLError(message, {
  extensions: {
    code: 'NOT_FOUND',
  },
});
