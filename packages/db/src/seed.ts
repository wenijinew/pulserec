import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sports = [
  {
    name: "Basketball",
    icon: "🏀",
    parameters: [
      { name: "points", type: "number", unit: "pts" },
      { name: "assists", type: "number", unit: "ast" },
      { name: "rebounds", type: "number", unit: "reb" },
      { name: "steals", type: "number", unit: "stl" },
      { name: "blocks", type: "number", unit: "blk" },
    ],
  },
  {
    name: "Football",
    icon: "⚽",
    parameters: [
      { name: "goals", type: "number", unit: "gls" },
      { name: "assists", type: "number", unit: "ast" },
      { name: "passes", type: "number", unit: "pas" },
      { name: "shots", type: "number", unit: "sht" },
      { name: "distance", type: "number", unit: "km" },
    ],
  },
  {
    name: "Ping Pong",
    icon: "🏓",
    parameters: [
      { name: "wins", type: "number", unit: "W" },
      { name: "losses", type: "number", unit: "L" },
      { name: "aces", type: "number", unit: "ace" },
      { name: "smashes", type: "number", unit: "smh" },
    ],
  },
  {
    name: "Handball",
    icon: "🤾",
    parameters: [
      { name: "goals", type: "number", unit: "gls" },
      { name: "assists", type: "number", unit: "ast" },
      { name: "saves", type: "number", unit: "sav" },
      { name: "steals", type: "number", unit: "stl" },
      { name: "blocks", type: "number", unit: "blk" },
    ],
  },
];

async function seed() {
  for (const sport of sports) {
    await prisma.sport.upsert({
      where: { name: sport.name },
      update: { icon: sport.icon, parameters: sport.parameters },
      create: { name: sport.name, icon: sport.icon, parameters: sport.parameters },
    });
  }
  console.log(`Seeded ${sports.length} sports`);
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
