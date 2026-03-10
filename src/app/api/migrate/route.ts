// Prisma Migration Helper Script
// Run this via Next.js API route if local port 5432 is blocked by ISP/Firewall

import { execSync } from 'child_process';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const output = execSync('npx prisma db push', { encoding: 'utf-8' });
        return NextResponse.json({ success: true, log: output });
    } catch (error: any) {
        return NextResponse.json({ success: false, log: error.message }, { status: 500 });
    }
}
