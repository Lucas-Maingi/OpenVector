import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Next.js hot-reloading can exhaust DB connections quickly. We enforce a limit here.
// Appending connection_limit=1 helps prevent "MaxClientsInSessionMode" errors with Supabase.
const getPrismaClient = () => {
    let url = process.env.DATABASE_URL;

    if (url) {
        // Use pgbouncer pooler if port 6543 is detected
        if (url.includes(':6543') && !url.includes('pgbouncer=true')) {
            url += url.includes('?') ? '&pgbouncer=true' : '?pgbouncer=true';
        }

        // Respect existing connection limit or use a safe default for serverless
        // Vercel Hobby has a low concurrency limit, so we stick to 1-3 if not specified
        if (!url.includes('connection_limit=')) {
            url += url.includes('?') ? '&connection_limit=2' : '?connection_limit=2';
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
