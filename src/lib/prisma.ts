import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Next.js hot-reloading can exhaust DB connections quickly. We enforce a limit here.
// Appending connection_limit=1 helps prevent "MaxClientsInSessionMode" errors with Supabase.
const getPrismaClient = () => {
    let url = process.env.DATABASE_URL;
    if (url && url.includes('pgbouncer=true') && !url.includes('connection_limit')) {
        url += '&connection_limit=1';
    }

    return new PrismaClient({
        datasources: {
            db: {
                url,
            },
        },
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
};

export const prisma = globalForPrisma.prisma ?? getPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
