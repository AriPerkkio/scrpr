import { ApolloServer } from 'apollo-server-lambda';
import { Configurations } from './resolvers';
import typeDefs from 'schema.graphql';

const resolvers = {
    Query: {
        configurations: Configurations,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
});

export const handler = server.createHandler();
