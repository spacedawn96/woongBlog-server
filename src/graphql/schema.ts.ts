import * as user from './resolvers/user';

import merge from 'lodash/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typeDef = `
  type Query {
    user(id: String, username: String): User!
  }
  type Mutation {
    logout: Boolean
  }
`;

const resolvers = {
  Query: {},
  Mutation: {},
};

const schema = makeExecutableSchema({
  typeDefs: [typeDef, user.typeDef],
  resolvers: merge(resolvers, user.resolvers),
});

export default schema;
