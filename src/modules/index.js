import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';
import * as user from './user';
import { Mutation, Query, traineeSubscription } from './trainee';

const typesArray = fileLoader(path.join(__dirname, './**/*.graphql'));

const typeDefs = mergeTypes(typesArray, { all: true });

export default {
  resolvers: {
    Query: {
      ...user.getMe,
      ...Query,
    },
    Mutation: {
      ...Mutation,
      ...user.loginMutation,
    },
    Subscription: {
      ...traineeSubscription,
    },
  },
  typeDefs,
};
