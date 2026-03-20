const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function introspect() {
    console.log("Introspecting PostgreSQL Triggers on 'users' table...");
    
    try {
        // Query to find triggers on the 'users' table
        const triggers = await prisma.$queryRaw`
            SELECT 
                trigger_name, 
                event_manipulation, 
                action_statement, 
                action_timing
            FROM information_schema.triggers
            WHERE event_object_table = 'users';
        `;
        
        console.log("FOUND TRIGGERS:");
        console.log(JSON.stringify(triggers, null, 2));

        // Query to find the function source code for any trigger
        if (Array.isArray(triggers) && triggers.length > 0) {
            for (const t of triggers) {
                const funcName = t.action_statement.match(/EXECUTE (?:FUNCTION|PROCEDURE) (.*?)\(/)?.[1];
                if (funcName) {
                    console.log(`\nInspecting Function: ${funcName}`);
                    const funcDef = await prisma.$queryRawUnsafe(`
                        SELECT prosrc 
                        FROM pg_proc 
                        WHERE proname = '${funcName.split('.').pop()}';
                    `);
                    console.log("FUNCTION DEF:");
                    console.log(funcDef[0]?.prosrc);
                }
            }
        } else {
            console.log("No triggers found on 'users' table in public schema.");
        }

    } catch (err) {
        console.error("Error introspecting triggers:", err);
    } finally {
        await prisma.$disconnect();
    }
}

introspect();
