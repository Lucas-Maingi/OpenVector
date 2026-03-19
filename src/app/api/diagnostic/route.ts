import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getEffectiveUserId } from '@/lib/auth-utils';

/**
 * DIAGNOSTIC ENDPOINT - Tests evidence creation to identify the exact error.
 * GET /api/diagnostic
 */
export async function GET() {
    const results: Record<string, any> = {
        timestamp: new Date().toISOString(),
        tests: {}
    };

    try {
        const user = await getEffectiveUserId();
        results.userId = user.id;
        results.isGuest = user.isGuest;

        // Test 1: Can we create a user?
        try {
            const diagEmail = user.email || `diag-${user.id}@test.io`;
            await prisma.user.upsert({
                where: { id: user.id },
                update: { updatedAt: new Date() },
                create: { id: user.id, email: diagEmail }
            });
            results.tests.userUpsert = 'PASS';
        } catch (e: any) {
            results.tests.userUpsert = `FAIL: ${e.message}`;
        }

        // Test 2: Can we create a test investigation?
        let testInvId: string | null = null;
        try {
            const inv = await prisma.investigation.create({
                data: {
                    title: 'DIAG_TEST',
                    userId: user.id,
                    description: 'Diagnostic test — will be deleted'
                }
            });
            testInvId = inv.id;
            results.tests.investigationCreate = 'PASS';
        } catch (e: any) {
            results.tests.investigationCreate = `FAIL: ${e.message}`;
        }

        if (testInvId) {
            // Test 3: Can we create an entity? (This works based on screenshots)
            try {
                await prisma.entity.create({
                    data: {
                        investigationId: testInvId,
                        type: 'domain',
                        value: 'diag-test.com',
                        confidence: 70
                    }
                });
                results.tests.entityCreate = 'PASS';
            } catch (e: any) {
                results.tests.entityCreate = `FAIL: ${e.message}`;
            }

            // Test 4: CORE evidence create (minimal fields)
            try {
                await prisma.evidence.create({
                    data: {
                        investigationId: testInvId,
                        title: 'Diagnostic Evidence Test',
                        content: 'Test content for diagnostic purposes.',
                    }
                });
                results.tests.evidenceCreateMinimal = 'PASS';
            } catch (e: any) {
                results.tests.evidenceCreateMinimal = `FAIL: ${e.message}`;
            }

            // Test 5: FULL evidence create (all fields we use in safeRun)
            try {
                await prisma.evidence.create({
                    data: {
                        investigationId: testInvId,
                        title: 'Full Diagnostic Evidence Test',
                        content: 'Full test content.',
                        sourceUrl: 'https://example.com',
                        type: 'url',
                        tags: 'general',
                        confidenceScore: 0.85,
                        confidenceLabel: 'HIGH',
                        eventDate: new Date(),
                        provenanceHash: 'abc123def456',
                        captureTimestamp: new Date(),
                        sourceArchiveUrl: null,
                        screenshotUrl: null,
                        provenanceSourceId: null,
                    }
                });
                results.tests.evidenceCreateFull = 'PASS';
            } catch (e: any) {
                results.tests.evidenceCreateFull = `FAIL: ${e.message}`;
            }

            // Test 6: SearchLog create
            try {
                await prisma.searchLog.create({
                    data: {
                        investigationId: testInvId,
                        userId: user.id,
                        connectorType: 'diagnostic',
                        query: 'Diagnostic test log',
                        resultCount: 0
                    }
                });
                results.tests.searchLogCreate = 'PASS';
            } catch (e: any) {
                results.tests.searchLogCreate = `FAIL: ${e.message}`;
            }

            // Cleanup: Delete the test investigation and all related records
            try {
                await prisma.evidence.deleteMany({ where: { investigationId: testInvId } });
                await prisma.entity.deleteMany({ where: { investigationId: testInvId } });
                await prisma.searchLog.deleteMany({ where: { investigationId: testInvId } });
                await prisma.investigation.delete({ where: { id: testInvId } });
                results.tests.cleanup = 'PASS';
            } catch (e: any) {
                results.tests.cleanup = `FAIL: ${e.message}`;
            }
        }

        // Test 7: Check existing investigation evidence count
        try {
            const recentInv = await prisma.investigation.findFirst({
                where: { userId: user.id },
                orderBy: { createdAt: 'desc' },
                include: {
                    _count: { select: { evidence: true, entities: true, logs: true } }
                }
            });
            if (recentInv) {
                results.tests.recentInvestigation = {
                    id: recentInv.id,
                    title: recentInv.title,
                    status: recentInv.status,
                    evidenceCount: recentInv._count.evidence,
                    entityCount: recentInv._count.entities,
                    logCount: recentInv._count.logs
                };
            } else {
                results.tests.recentInvestigation = 'No investigations found';
            }
        } catch (e: any) {
            results.tests.recentInvestigation = `FAIL: ${e.message}`;
        }

        results.overallStatus = Object.values(results.tests).every(
            (v: any) => typeof v === 'string' ? v === 'PASS' : true
        ) ? 'ALL PASS' : 'SOME FAILURES';

    } catch (e: any) {
        results.fatalError = e.message;
    }

    return NextResponse.json(results, { status: 200 });
}
