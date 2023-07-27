// ========== Server
// import all packages
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import Config from './config/config.js';
import { resolvers } from './resolvers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// setup json & url-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// define cors options
const corsOptions = {
  origin(origin, callback) {
    if (!origin || Config.WHITELIST.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      throw new Error('Blocked by cors');
    }
  },
};

// setup cors
app.use(cors(corsOptions));

const typeDefs = await readFile(join(__dirname, './schema.graphql'), 'utf-8');

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();

app.use('/graphql', apolloMiddleware(apolloServer));

app.listen(Config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`The server is being run at http://localhost:${Config.PORT}`);
  // eslint-disable-next-line no-console
  console.log(`The GraphQL endpoint: http://localhost:${Config.PORT}/graphql`);
});
