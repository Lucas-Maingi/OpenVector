const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
    const testEmail = `debug-${Date.now()}@aletheia.io`;
    console.log(`Attempting to create test user: ${testEmail}`);
    
    try {
        const user = await prisma.user.create({
            data: {
                id: require('crypto').randomUUID(),
                email: testEmail,
                role: 'analyst',
                plan: 'free'
            }
        });
        console.log("SUCCESS: User created via Prisma directly.");
        console.log(JSON.stringify(user, null, 2));
        
        // Clean up
        await prisma.user.delete({ where: { id: user.id } });
        console.log("Cleanup: Test user deleted.");
    } catch (err) {
        console.error("FATAL DATABASE ERROR DETECTED:");
        console.error(err);
        
        if (err.code === 'P2002') {
            console.error("Analysis: Unique constraint failed. This email or ID already exists.");
        } else if (err.code === 'P2003') {
            console.error("Analysis: Foreign key constraint failed.");
        } else {
            console.error(`Analysis: Possible missing column or type mismatch in Postgres: ${err.message}`);
        }
    } finally {
        await prisma.$disconnect();
    }
}

test();
