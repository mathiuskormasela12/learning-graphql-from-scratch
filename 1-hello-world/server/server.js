// ========= Server
// import all packages
import {ApolloServer} from '@apollo/server' // This package is used to access graphql feature
import {startStandaloneServer} from '@apollo/server/standalone' // this package is used to create standalone server without using another server frameworks

// Define Schema
// These are fields can be requested by client
const typeDefs = `#graphql #this is a special comment to enable syntax highlighting
  # this is a comment, comment will not executed by our machine

  # it's optional, it just to explain, 
  # why in the apollo sandbox we type 
  # the Query with lower-case Q 
  # but in our code we type Query with Q upper-case
  schema {
    # mapping Query (Q upper-case) to query (q lower-case)
    # but the name should be Query with Q upper-case to define schema, I mean (type Query)
    query: Query
  }

  type Query {
    greeting: String
  }
`;

// Define Resolver
// This is used to get its value
const resolvers = {
  Query: {
    greeting: () => 'Hello World'
  }
}

// Instantiate a ApolloServer class
// By default Apollo Server will provide us Sandbox to make request to graphql server
const server = new ApolloServer({ typeDefs, resolvers });
const {url} = await startStandaloneServer(server, {
  listen: {
    port: 9000
  }
});
console.info(`The server is being run at ${url}`);