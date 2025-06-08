import "server-only";

import { appRouter } from "@trpc-practice/server";
import { createCallerFactory } from "@trpc-practice/server/src/trpc";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { makeQueryClient } from "../react-query";

export const createTRPCContext = cache(async () => {
  return {};
});

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createTRPCContext);
export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient,
);
