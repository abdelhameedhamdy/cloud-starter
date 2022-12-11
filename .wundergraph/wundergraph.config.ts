import {
  configureWunderGraphApplication,
  cors,
  EnvironmentVariable,
  introspect,
  templates,
} from "@wundergraph/sdk";
import server from "./wundergraph.server";
import operations from "./wundergraph.operations";

const spacex = introspect.graphql({
  apiNamespace: "spacex",
  url: "https://spacex-api.fly.dev/graphql",
});

const db = introspect.postgresql({
  apiNamespace: 'db',
  databaseURL: new EnvironmentVariable('DATABASE_URL'),
})

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  apis: [spacex, db],
  server,
  operations,
  codeGenerators: [
    {
      templates: [
        ...templates.typescript.all,
      ],
    },
  ],
  cors: {
    ...cors.allowAll,
    allowedOrigins:
      process.env.NODE_ENV === "production"
        ? [
            // change this before deploying to production to the actual domain where you're deploying your app
            "http://localhost:3000",
          ]
        : [
            "http://localhost:3000",
            new EnvironmentVariable("WG_ALLOWED_ORIGIN"),
          ],
  },
  dotGraphQLConfig: {
    hasDotWunderGraphDirectory: false,
  },
});
