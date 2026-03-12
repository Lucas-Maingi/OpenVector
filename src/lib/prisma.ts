import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Next.js hot-reloading can exhaust DB connections quickly. We enforce a limit here.
// Appending connection_limit=1 helps prevent "MaxClientsInSessionMode" errors with Supabase.
const getPrismaClient = () => {
    let url = process.env.DATABASE_URL;

    if (url) {
        // Use pgbouncer pooler if port 6543 is detected, otherwise use direct 5432
        // We no longer hardcode specific domains to avoid breaking non-original instances
        if (url.includes(':6543') && !url.includes('pgbouncer=true')) {
            url += url.includes('?') ? '&pgbouncer=true' : '?pgbouncer=true';
        }

        // Increase connection limit to allow bulk operations to flourish
        // Vercel Hobby can handle ~10-20 connections per instance safely
        if (url.includes('connection_limit=')) {
            url = url.replace(/connection_limit=\d+/, 'connection_limit=10');
        } else {
            url += url.includes('?') ? '&connection_limit=10' : '?connection_limit=10';
        }
    }

    return new PrismaClient({
        datasources: {
            db: { url },
        },
        log: process.env.NODE_ENV === 'development' ? ['error'] : ['error'],
    });
};

export const prisma = globalForPrisma.prisma ?? getPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
