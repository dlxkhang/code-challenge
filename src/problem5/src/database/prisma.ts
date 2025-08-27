import { PrismaClient } from '@prisma/client'

// Create a global Prisma client instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Use existing client or create new one
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// In development, save the client to global to prevent creating multiple instances
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma;
