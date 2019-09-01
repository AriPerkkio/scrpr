import { ApolloServer, gql } from 'apollo-server-lambda';
import { hello } from './resolvers';

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: hello,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
});

export const handler = server.createHandler();
