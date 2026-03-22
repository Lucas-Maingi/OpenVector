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
        // Enforce a higher connection limit of 10 to sustain parallel OSINT nodes and UI polling
        if (url.includes('connection_limit=')) {
            url = url.replace(/connection_limit=\d+/, 'connection_limit=10');
        } else {
            url += url.includes('?') ? '&connection_limit=10' : '?connection_limit=10';
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
