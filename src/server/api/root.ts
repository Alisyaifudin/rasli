import { createTRPCRouter } from "~/server/api/trpc";
import { guessRouter } from "~/server/api/routers/guess";
import { puzzleRouter } from "./routers/puzzle";
import { debugRouter } from "./routers/debug";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  guess: guessRouter,
  puzzle: puzzleRouter,
  debug: debugRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
