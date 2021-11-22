import { UserInputError, AuthenticationError, ApolloError } from 'apollo-server-express';
import User from '../../entity/User';
import { getRepository, getConnection } from 'typeorm';
import gql from 'graphql-tag';

export const typeDef = gql`
  type User {
    id: ID!
    username: String
    email: String
    password: String
    email_verified: Boolean
    tokenVersion: String
    auth: [User]
    accessToken: String
    refreshToken: String
    created_at: String
  }
`;

export const resolvers = {
  Query: {
    user: async (_, { id, username }) => {
      const users = getRepository(User);
      try {
        if (username) {
          const user = await users.findOne({
            where: {
              username,
            },
          });
          return user;
        }
        const user = await users.findOne({
          id,
        });
        return user;
      } catch (e) {
        console.log(e);
      }
    },
  },
  Mutation: {
    logout: async (_, args, { res }) => {
      return true;
    },
  },
};
