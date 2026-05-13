import { z } from "zod";
import { router, publicProcedure } from "./trpc";
import { PrismaClient } from "@pulserec/db";

const prisma = new PrismaClient();

export const sportRouter = router({
  list: publicProcedure.query(async () => {
    return prisma.sport.findMany();
  }),
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return prisma.sport.findUnique({ where: { id: input } });
  }),
});
