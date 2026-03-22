import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Next.js hot-reloading can exhaust DB connections quickly. We enforce a limit here.
// Appending connection_limit=1 helps prevent "MaxClientsInSessionMode" errors with Supabase.
const getPrismaClient = () => {
    let url = process.env.DATABASE_URL;

    if (url) {
        // Use pgbouncer pooler if port 6543 is detected or if specifically requested
        if (url.includes(':6543') || url.includes('.pooler.')) {
            if (!url.includes('pgbouncer=true')) {
                url += url.includes('?') ? '&pgbouncer=true' : '?pgbouncer=true';
            }
        }

        // Increase connection limit to handle concurrent serverless handshakes
        // Enforce a minimum connection limit of 5 to handle concurrent serverless handshakes
        if (url.includes('connection_limit=')) {
            // Replace existing limit with 5 if it's less than 5
            url = url.replace(/connection_limit=\d+/, 'connection_limit=5');
        } else {
            url += url.includes('?') ? '&connection_limit=5' : '?connection_limit=5';
        }
    }

    console.log(`[PRISMA] Initializing client for ${process.env.NODE_ENV} environment.`);

    return new PrismaClient({
        datasources: {
            db: { url },
        },
        log: ['error'], // Keep logs lean but capture all failures
    });
};

export const prisma = globalForPrisma.prisma ?? getPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
