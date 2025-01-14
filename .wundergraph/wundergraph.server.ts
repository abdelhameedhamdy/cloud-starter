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
          const mutated = hook.response.data?.districts.map((d) => {
            return {
              ...d,
              area: Number(d.area!.toFixed(2)),
              sectorCode: `بلدية ${d.sectorCode}`,
              length: Number(d.length!.toFixed(2)),
            };
          });
          return {
            data: {
              districts: mutated!,
            },
          };
        },
      },
    },
    mutations: {},
  },
  graphqlServers: [],
}));
