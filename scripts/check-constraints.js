const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const columns = await prisma.$queryRaw`
            SELECT column_name, is_nullable, column_default
            FROM information_schema.columns
            WHERE table_name = 'users' AND column_name IN ('updatedAt', 'updated_at', 'role', 'plan');
        `;
        console.log("CRITICAL COLUMN AUDIT:");
        console.table(columns);
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

check();
