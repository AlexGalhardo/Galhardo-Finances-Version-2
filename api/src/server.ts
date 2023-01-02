import { startStandaloneServer } from "@apollo/server/standalone";

import app from "./app";
import { graphqlServer } from "./graphql/graphqlServer";

(async () => {
    const { url } = await startStandaloneServer(graphqlServer, {
        context: async ({ req }) => ({ token: req.headers.token }),
        listen: { port: 4000 },
    });

    console.log(`🚀 GALHARDO GRAPHQL API server is running at ${url}`);
})();

app.listen(process.env.PORT || 3333, () =>
    console.log(
        `🚀 GALHARDO FINANCES HTTP REST API server is running at ${process.env.API_URL}:${process.env.PORT ?? 3333}`,
    ),
);
