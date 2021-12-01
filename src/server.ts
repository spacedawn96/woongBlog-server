import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema.ts';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { ValidateTokensMiddleware } from './middlewares/ValidateTokensMiddleware';

const app = express();
app.use(cookieParser());
app.use(ValidateTokensMiddleware);

app.get('/', (_req, res) => res.send('hello'));

async function startServer() {
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
    }),
    introspection: true,

    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();

  server.applyMiddleware({ app });
}

startServer();

export default app;
