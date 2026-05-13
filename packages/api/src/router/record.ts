import { z } from "zod";
import { router, publicProcedure } from "./trpc";
import { PrismaClient } from "@pulserec/db";

const prisma = new PrismaClient();

export const recordRouter = router({
  create: publicProcedure
    .input(z.object({ sportId: z.string(), date: z.string(), values: z.record(z.number()) }))
    .mutation(async ({ input }) => {
      const record = await prisma.dailyRecord.upsert({
        where: { userId_sportId_date: { userId: "demo-user", sportId: input.sportId, date: new Date(input.date) } },
        update: { values: input.values },
        create: { userId: "demo-user", sportId: input.sportId, date: new Date(input.date), values: input.values },
      });
      return record;
    }),
  listByDate: publicProcedure
    .input(z.object({ date: z.string() }))
    .query(async ({ input }) => {
      return prisma.dailyRecord.findMany({
        where: { userId: "demo-user", date: new Date(input.date) },
        include: { sport: true },
      });
    }),
  history: publicProcedure
    .input(z.object({ sportId: z.string().optional(), limit: z.number().default(30) }))
    .query(async ({ input }) => {
      return prisma.dailyRecord.findMany({
        where: { userId: "demo-user", ...(input.sportId ? { sportId: input.sportId } : {}) },
        include: { sport: true },
        orderBy: { date: "desc" },
        take: input.limit,
      });
    }),
});
