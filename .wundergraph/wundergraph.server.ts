import { configureWunderGraphServer } from "@wundergraph/sdk";
import type { HooksConfig } from "./generated/wundergraph.hooks";
import type { InternalClient } from "./generated/wundergraph.internal.client";

export default configureWunderGraphServer<HooksConfig, InternalClient>(() => ({
  hooks: {
    queries: {
      Dragons: {
        postResolve: async (hook) => {
          hook.log.info("postResolve hook for Dragons");
        },
        mutatingPostResolve: async (hook) => {
          return {
            data: {
              spacex_dragons: [...hook.response.data?.spacex_dragons!],
            },
          };
        },
      },
      Districts: {
        mutatingPostResolve: async (hook) => {
          return {
            // ...hook.response.data,
            data: {
              districts: [
                ...hook.response.data?.districts!,
                {
                  id: 121,
                  area: 28382.33,
                  districtName: "abdo",
                  sectorCode: "hamdy",
                },
              ],
            },
          };
        },
      },
    },
    mutations: {},
  },
  graphqlServers: [],
}));
