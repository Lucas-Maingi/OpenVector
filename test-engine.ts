import { PrismaClient } from '@prisma/client';
import { runFullScan } from './src/connectors';

const prisma = new PrismaClient();

async function testScan() {
    console.log("Starting direct engine debug for maingilucas0@gmail.com...");
    
    // Create a mock investigation for the test
    const dummyUserId = "local-dev-user";
    await prisma.user.upsert({
        where: { id: dummyUserId },
        update: {},
        create: { id: dummyUserId, email: 'local-dev@test.io' }
    });

    const investigation = await prisma.investigation.create({
        data: {
            title: "Debug Scan",
            userId: dummyUserId,
            subjectEmail: "maingilucas0@gmail.com"
        }
    });

    console.log(`Created test investigation: ${investigation.id}`);

    try {
        const result = await runFullScan(
            investigation,
            dummyUserId,
            true, // isPro
            null, // customApiKey
            Date.now()
        );

        console.log("--- SCAN COMPLETE ---");
        console.log(`Found entities: ${result.found}`);
        
        // Let's check the database to see if evidence was actually saved
        const evidenceCount = await prisma.evidence.count({
            where: { investigationId: investigation.id }
        });
        const entityCount = await prisma.entity.count({
            where: { investigationId: investigation.id }
        });

        console.log(`Database -> Evidence: ${evidenceCount}, Entities: ${entityCount}`);
    } catch (err: any) {
        console.error("Scan failed with error:", err);
    } finally {
        await prisma.$disconnect();
    }
}

testScan();
