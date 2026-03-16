const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function debug() {
    console.log("--- DEBUGGING DATABASE (JS) ---");
    
    try {
        const investigations = await prisma.investigation.findMany({
            take: 3,
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
            console.log(`Counts: Ev(${inv._count.evidence}), Ent(${inv._count.entities}), Log(${inv._count.logs})`);
        });

        const logs = await prisma.searchLog.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' }
        });

        console.log("\n--- RECENT SEARCH LOGS ---");
        logs.forEach(log => {
            console.log(`[${log.createdAt.toISOString()}] InvID: ${log.investigationId} | Type: ${log.connectorType} | Q: ${log.query}`);
        });

    } catch (err) {
        console.error("DB DEBUG ERROR:", err.message);
    }
}

debug().finally(() => prisma.$disconnect());
