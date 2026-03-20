const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const email = 'aletheia-live@proton.me';
    console.log(`Checking for existing records for: ${email}`);
    
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        
        if (user) {
            console.log("FOUND EXISTING USER:");
            console.log(JSON.stringify(user, null, 2));
            console.log("\nIf this user exists in public.users but not in auth.users, registration will fail.");
        } else {
            console.log("No user found in public.users with that email.");
        }
    } catch (err) {
        console.error("Error querying database:", err);
    } finally {
        await prisma.$disconnect();
    }
}

check();
