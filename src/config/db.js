import { PrismaClient } from "@prisma/client";
import fs from "fs";


const logStream = fs.createWriteStream("prisma.log", { flags: "a" }); // "a" = append mode

export const Prisma = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "info" },
    { emit: "event", level: "warn" },
    { emit: "event", level: "error" },
  ],
});

// Capture logs and write to file
Prisma.$on("query", (e) => {
  logStream.write(`[QUERY] ${e.query} Params: ${e.params}\n`);
});

Prisma.$on("info", (e) => {
  logStream.write(`[INFO] ${e.message}\n`);
});

Prisma.$on("warn", (e) => {
  logStream.write(`[WARN] ${e.message}\n`);
});

Prisma.$on("error", (e) => {
  logStream.write(`[ERROR] ${e.message}\n`);
});
