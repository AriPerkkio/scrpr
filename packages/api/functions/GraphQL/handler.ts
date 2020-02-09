import { ApolloServer } from 'apollo-server-lambda';
import resolvers from './resolvers';
import typeDefs from 'schema.graphql';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
});

export const handler = server.createHandler();
