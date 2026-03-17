const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const investigationId = 'd2a2b05d-67f2-4cef-8860-28dd209384a9';
  
  console.log(`Checking logs for investigation: ${investigationId}`);
  
  try {
    const logs = await prisma.searchLog.findMany({
      where: { investigationId },
      orderBy: { createdAt: 'desc' },
      take: 10
    });
    
    console.log(`Found ${logs.length} logs.`);
    logs.forEach(l => {
      console.log(`[${l.connectorType}] ${l.query}`);
    });

    const evidence = await prisma.evidence.count({ where: { investigationId } });
    console.log(`Evidence count: ${evidence}`);

    const investigation = await prisma.investigation.findUnique({
      where: { id: investigationId },
      select: { status: true, title: true, subjectEmail: true }
    });
    console.log(`Investigation: ${JSON.stringify(investigation)}`);
  } catch (err) {
    console.error('Database query failed:', err.message);
  }
}

main()
  .finally(() => prisma.$disconnect());
