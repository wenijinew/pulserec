export { PrismaClient } from "@prisma/client";
export type { User, Sport, UserSport, DailyRecord } from "@prisma/client";
export { sportsConfig, getSportConfig } from "./config/sports";
export type { SportConfig, SportField, FieldType } from "./config/sports";
