// npm install @apollo/server graphql
import { ApolloServer } from "@apollo/server";

import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

interface IMyContext {
    token?: string;
}

export const graphqlServer = new ApolloServer<IMyContext>({ typeDefs, resolvers });
