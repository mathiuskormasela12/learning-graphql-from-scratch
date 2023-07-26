// ========== Server
// import all packages
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import 'dotenv/config';
import cors from 'cors';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolvers } from './resolvers.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const { SERVICE_API_PORT = 3000, SERVICE_WEB_CLIENTS = '' } = process.env;

const app = express();

// setup cors
const whitelist = SERVICE_WEB_CLIENTS.split(',');
const corsOptions = {
  origin(origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      throw new Error('Blocked by cors');
    }
  },
};
app.use(cors(corsOptions));

// setup json & url encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const typeDefs = await readFile(path.join(dirname, './schema.graphql'), 'utf8');

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use('/graphql', apolloMiddleware(apolloServer));

app.listen(SERVICE_API_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`The server is being run at http://localhost:${SERVICE_API_PORT}`);
  // eslint-disable-next-line no-console
  console.log(`The GraphQL endpoint: http://localhost:${SERVICE_API_PORT}/graphql`);
});
