const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function debug() {
    const id = "1f51096c-80b7-44f6-b74c-4da289f9ff2b";
    console.log(`Checking investigation: ${id}`);
    
    try {
        const inv = await prisma.investigation.findUnique({
            where: { id },
            include: {
                _count: { select: { evidence: true, entities: true, logs: true } },
                logs: { take: 5, orderBy: { createdAt: 'desc' } },
                evidence: { take: 5 }
            }
        });
        
        console.log("Investigation Data:", JSON.stringify(inv, null, 2));
        
        if (!inv) {
            console.log("!!! Investigation not found in DB !!!");
        } else {
            console.log(`Log count: ${inv._count.logs}`);
            console.log(`Evidence count: ${inv._count.evidence}`);
        }
        
    } catch (err) {
        console.error("Debug Error:", err);
    } finally {
        await prisma.$disconnect();
    }
}

debug();
