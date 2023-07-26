// ========== Server
// import all packages
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import fs from 'fs/promises';
import path from 'path';
import url from 'url';
import { resolvers } from './resolvers.js';

const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const { SERVICE_APP_PORT = 3000, SERVICE_WEB_CLIENTS = '' } = process.env;

const app = express();

// setup json & url-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup cors
const whitelist = SERVICE_WEB_CLIENTS.split(',');
const corsOption = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      throw new Error('Blocked by cors');
    }
  },
};
app.use(cors(corsOption));

// get apollo server schema
let typeDefs = await fs.readFile(path.join(dirname, './schema.graphql'));
typeDefs = typeDefs.toString('utf8');

// setup apollo server
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use('/graphql', apolloMiddleware(apolloServer));

app.listen(SERVICE_APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`The server is running at http://localhost:${SERVICE_APP_PORT}`);
  // eslint-disable-next-line no-console
  console.log(`The GraphQL endpoint: http://localhost:${SERVICE_APP_PORT}/graphql`);
});
