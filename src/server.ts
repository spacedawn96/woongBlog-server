import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema.ts';

const app = express();
app.use(cookieParser());

app.get('/', (_req, res) => res.send('hello'));

async function startServer() {
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
    }),
    introspection: true,
  });

  await server.start();
  server.applyMiddleware({ app });
}
startServer();

export default app;
