import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws;

// Load your connection string from .env
const connectionString = `${process.env.DATABASE_URL}`;


// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.
const adapter = new PrismaNeon({ connectionString });

// use a global instance to prevent multiple clients during hot reloads
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Initialize Prisma Client with adapter + result transformer
export const prisma = globalForPrisma.prisma ||
  new PrismaClient({ adapter}).$extends({
    result: {
      product: {
        price: { compute: (p) => p.price?.toString()},
        rating: { compute: (p) => p.rating?.toString()},
      },
    },
  });

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma; 