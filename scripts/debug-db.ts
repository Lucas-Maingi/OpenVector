import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function debug() {
    console.log("--- DEBUGGING DATABASE ---");
    
    // 1. Check most recent investigations
    const investigations = await prisma.investigation.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
            _count: { select: { evidence: true, entities: true, logs: true } }
        }
    });

    console.log("\n--- RECENT INVESTIGATIONS ---");
    investigations.forEach(inv => {
        console.log(`ID: ${inv.id}`);
        console.log(`Title: ${inv.title}`);
        console.log(`Status: ${inv.status}`);
        console.log(`Created: ${inv.createdAt}`);
        console.log(`Counts: Evidence(${inv._count.evidence}), Entities(${inv._count.entities}), Logs(${inv._count.logs})`);
        console.log('---');
    });

    // 2. Check most recent logs globally
    const logs = await prisma.searchLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' }
    });

    console.log("\n--- RECENT SEARCH LOGS ---");
    logs.forEach(log => {
        console.log(`[${log.createdAt.toISOString()}] InvID: ${log.investigationId} | Type: ${log.connectorType} | Query: ${log.query}`);
    });

    // 3. Check for the GUEST_ID user
    const GUEST_ID = '00000000-0000-0000-0000-000000000000';
    const guest = await prisma.user.findUnique({ where: { id: GUEST_ID } });
    console.log(`\nGuest User exists? ${!!guest}`);
}

debug()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
