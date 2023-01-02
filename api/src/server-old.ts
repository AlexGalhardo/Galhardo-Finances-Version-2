import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { json } from "body-parser";
import cors from "cors";
import http from "http";

import app from "./app";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";

const httpServer = http.createServer(app);

interface IMyContext {
    token?: string;
}

const graphqlServer = new ApolloServer<IMyContext>({
    // context: { hello: "world" },
    csrfPrevention: true,
    cache: "bounded",
    typeDefs,
    resolvers,
    // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

(async () => {
    await graphqlServer.start();

    app.use(
        "/graphql",
        cors<cors.CorsRequest>(),
        json(),
        expressMiddleware(graphqlServer, {
            context: async ({ req }) => ({ token: req.headers.token }),
        }),
    );

    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 GALHARDO FINANCES GraphqlServer running on http://localhost:4000/graphql`);
})();
