import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Next.js hot-reloading can exhaust DB connections quickly. We enforce a limit here.
// Appending connection_limit=1 helps prevent "MaxClientsInSessionMode" errors with Supabase.
const getPrismaClient = () => {
    // Prefer DIRECT_URL to bypass the Supabase session pooler causing MaxClientsInSessionMode
    let url = process.env.DIRECT_URL || process.env.DATABASE_URL;

    if (url) {
        // Automatically sanitize the pooler URL to a direct URL
        url = url.replace('?pgbouncer=true', '').replace('&pgbouncer=true', '');
        if (url.includes(':6543/')) {
            url = url.replace(':6543/', ':5432/');
        }
        // Force connection limit to 1 for serverless/Next.js
        if (!url.includes('connection_limit')) {
            url += url.includes('?') ? '&connection_limit=1' : '?connection_limit=1';
        }
    }

    return new PrismaClient({
        datasources: {
            db: { url },
        },
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
};

export const prisma = globalForPrisma.prisma ?? getPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
