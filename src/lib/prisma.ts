import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = `${process.env.PRISMA_DATABASE_URL}`;

const pool = new Pool({ 
  connectionString,
  max: 10, // Limit connections for serverless
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000, // 10s timeout to prevent hanging
  ssl: {
    rejectUnauthorized: false, 
  }
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;