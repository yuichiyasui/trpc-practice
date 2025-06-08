import { appRouter } from "@trpc-practice/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "~/libs/trpc/server";

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });
};
export { handler as GET, handler as POST };
