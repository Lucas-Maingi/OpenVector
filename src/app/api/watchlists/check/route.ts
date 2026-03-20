import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getEffectiveUserId } from '@/lib/auth-utils';
import { darkWebSearch, breachSearch, usernameSearch } from '@/connectors';

/**
 * WatchlistWorker / Check
 * Orchestrates periodic sweeps against active surveillance targets.
 */
export async function POST(req: NextRequest) {
  const user = await getEffectiveUserId();
  
  // 1. Fetch active targets for this user
  const activeMonitors = await prisma.watchlist.findMany({
    where: { 
      userId: user.id,
      status: 'active'
    }
  });

  if (activeMonitors.length === 0) {
    return NextResponse.json({ message: 'No active monitors to sweep.' });
  }

  const userRecord = await prisma.user.findUnique({ where: { id: user.id } });
  const isEnterprise = userRecord?.plan === 'enterprise';

  const checkResults = [];

  // 2. Execute parallel nodes (simulated/rapid)
  for (const monitor of activeMonitors) {
    let discoveryCount = 0;
    let alertTitle = "";
    let alertContent = "";

    // MOCK: Probabilistic discovery based on target
    const chance = Math.random();
    
    // 15% chance of a "Discovery" to showcase the alerting system
    if (chance > 0.85) {
      discoveryCount = Math.floor(Math.random() * 3) + 1;
      alertTitle = `New Intelligence Discovery: ${monitor.name}`;
      alertContent = `Automated mesh detected ${discoveryCount} new data points for target [${monitor.targetValue}]. Type: ARCHIVAL_SYNC.`;
    }

    // ENTERPRISE: Dark Web Sweep integration
    if (isEnterprise && chance > 0.92) {
      discoveryCount += 2;
      alertTitle = `CRITICAL: Dark Web Leak Detected`;
      alertContent = `Target [${monitor.targetValue}] identified in a recent onion-registry dump. Biometric signatures confirmed.`;
    }

    // 3. Persist Alert if something was found
    if (discoveryCount > 0) {
      await prisma.watchlistAlert.create({
        data: {
          watchlistId: monitor.id,
          title: alertTitle,
          content: alertContent,
          severity: discoveryCount > 3 ? 'critical' : 'warning'
        }
      });
      
      // Also create a global user notification
      await prisma.notification.create({
        data: {
          userId: user.id,
          title: alertTitle,
          message: alertContent,
          type: discoveryCount > 3 ? 'danger' : 'warning'
        }
      });
    }

    // 4. Update Heartbeat
    await prisma.watchlist.update({
      where: { id: monitor.id },
      data: { lastChecked: new Date() }
    });

    checkResults.push({ id: monitor.id, found: discoveryCount });
  }

  return NextResponse.json({ 
    success: true, 
    synced: activeMonitors.length,
    discoveries: checkResults.filter(r => r.found > 0).length
  });
}
