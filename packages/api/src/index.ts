import { router } from "./trpc";
import { sportRouter } from "./router/sport";
import { recordRouter } from "./router/record";

export const appRouter = router({
  sport: sportRouter,
  record: recordRouter,
});

export type AppRouter = typeof appRouter;
