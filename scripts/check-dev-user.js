const { PrismaClient } = require('../src/generated/client');
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.upsert({
        where: { id: 'local-dev-user' },
        update: {},
        create: {
            id: 'local-dev-user',
            email: 'analyst@openvector.io',
            role: 'analyst'
        },
    });
    console.log('Dev user status:', user);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
