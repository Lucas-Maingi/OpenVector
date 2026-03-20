const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function audit() {
    console.log("Auditing physical columns of 'users' table...");
    
    try {
        const columns = await prisma.$queryRaw`
            SELECT 
                column_name, 
                data_type, 
                is_nullable, 
                column_default
            FROM information_schema.columns
            WHERE table_name = 'users'
            ORDER BY ordinal_position;
        `;
        
        console.log("PHYSICAL TABLE SCHEMA:");
        console.table(columns);

    } catch (err) {
        console.error("Error auditing columns:", err);
    } finally {
        await prisma.$disconnect();
    }
}

audit();
