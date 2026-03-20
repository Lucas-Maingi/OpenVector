const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
    console.log("Applying registration recovery fix (updatedAt default)...");
    
    try {
        await prisma.$executeRawUnsafe(`
            ALTER TABLE public.users 
            ALTER COLUMN "updatedAt" SET DEFAULT now();
        `);
        console.log("SUCCESS: Database-level default added to 'updatedAt'.");
    } catch (err) {
        console.error("FAILED to apply SQL fix:");
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

fix();
