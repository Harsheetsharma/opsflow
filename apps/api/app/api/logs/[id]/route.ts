import { prisma } from "@opsflow/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const logs = await prisma.jobLogs.findMany({
        where: { jobId: id },
    });

    return NextResponse.json({ logs });
}
