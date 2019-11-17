import { ApolloServer, gql } from 'apollo-server-lambda';
import { Configurations } from './resolvers';

const typeDefs = gql`
    type Configuration {
        id: ID!
        name: String
    }

    type Query {
        configurations(id: String): Configuration
    }
`;

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
