// ========== Server
// import all packages
import path from 'path'
import url from 'url'
import fs from 'fs/promises'
import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import config from './config/config.js'
import { resolvers } from './resolvers.js'
import { isLogin } from './middelwares/isLogin.js'
import { getUserByid } from './db/operations.js'

// Setup __dirname
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Init Express Application Object
const app = express()

// Allow Express to receive request body as a json and form data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Define Cors Options Object
const corsOptions = {
  origin (origin, callback) {
    if (!origin || config.WHITELIST.includes(origin)) {
      callback(null, true)
    } else {
      throw new Error('Blocked by cors')
    }
  }
}

// Add Cors Options to Cors Middleware
app.use(cors(corsOptions))

app.use(isLogin)

// Read GraphQL Schema
const typeDefs = await fs.readFile(path.join(__dirname, './schema.graphql'), 'utf-8')

// Instantiate Apollo Server Object
const apolloServer = new ApolloServer({ typeDefs, resolvers })

// Start Apollo Server
await apolloServer.start()

// Define Apollo Context to provide a field to ensuer a user has logged in
const getContext = async ({ req }) => {
  if (req.app.locals?.auth?.data?.id) {
    const { companyId = null } = await getUserByid(req.app.locals.auth.data.id)
    return {
      auth: req.app.locals.auth,
      companyId
    }
  }

  return {
    auth: {
      data: null,
      message: req.app?.locals?.auth?.message ?? 'Error'
    }
  }
}

// Add Apollo Server to Express
app.use('/graphql', apolloMiddleware(apolloServer, { context: getContext }))

// Start server
app.listen(config.PORT, () => {
  console.log(`The server is being run at http://localhost:${config.PORT}`)
  console.log(`GraphQL Endpoint: http://localhost:${config.PORT}/graphql`)
})
