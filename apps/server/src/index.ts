import { postRouter } from "./routers/post";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "yay!"),

  post: postRouter,
});

export type AppRouter = typeof appRouter;
