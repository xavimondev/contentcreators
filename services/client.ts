import { PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

export let prisma: PrismaClient

if (typeof window === 'undefined') {
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
  } else {
    const globalWithPrisma = global as typeof globalThis & {
      prisma: PrismaClient
    }
    if (!globalWithPrisma.prisma) {
      globalWithPrisma.prisma = new PrismaClient()
    }
    prisma = globalWithPrisma.prisma
  }
}
