import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Next.js hot-reloading can exhaust DB connections quickly. We enforce a limit here.
// Appending connection_limit=1 helps prevent "MaxClientsInSessionMode" errors with Supabase.
const getPrismaClient = () => {
    // We only use DATABASE_URL (DIRECT_URL on Vercel is often IPv6 which causes "Can't reach database server" errors)
    let url = process.env.DATABASE_URL;

    if (url) {
        // 1. Fix IPv6 issue on Vercel Node runtime: db.[id].supabase.co is IPv6 only. 
        // We replace it with the Supabase IPv4 pooler domain.
        url = url.replace(
            'db.ojdqtdkrwadjuznfqswk.supabase.co',
            'aws-1-us-west-1.pooler.supabase.com'
        );

        // 2. Fix MaxClientsInSessionMode: bypass the pgbouncer pooler (port 6543) 
        // and connect directly to Postgres (port 5432) via the IPv4 domain.
        if (url.includes(':6543')) {
            url = url.replace(':6543', ':5432');
        }

        // 3. Strip pgbouncer pooling flags since we are connecting to 5432 directly
        url = url.replace('?pgbouncer=true', '').replace('&pgbouncer=true', '');

        // 4. Force strict connection limit for Vercel Serverless scaling limits
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
