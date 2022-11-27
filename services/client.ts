import { PrismaClient } from '@prisma/client'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient
}

export let prisma: PrismaClient

if (typeof window === 'undefined') {
  if (process.env.NODE_ENV === 'production') {
    global.prisma = new PrismaClient()
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient()
    }
    prisma = global.prisma
  }
}
