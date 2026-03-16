import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function test() {
    const id = "0da21991-efd2-4c3c-af51-aa5243ff17d3";
    console.log("Querying investigation:", id);
    
    // Test 1: Permissive lookup
    const inv = await prisma.investigation.findUnique({
        where: { id },
        include: { logs: true }
    });
    
    if (!inv) {
        console.log("Investigation NOT FOUND (unique)");
    } else {
        console.log("Found investigation:", inv.title);
        console.log("Status:", inv.status);
        console.log("User ID:", inv.userId);
        console.log("Logs count:", inv.logs.length);
        if (inv.logs.length > 0) {
            console.log("First log:", inv.logs[0].query);
        }
    }
}

test().catch(console.error).finally(() => prisma.$disconnect());
