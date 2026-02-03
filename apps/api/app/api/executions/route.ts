import { prisma } from "@opsflow/db";

import { NextResponse } from "next/server";

export async function GET() {
    const executions = await prisma.execution.findMany({
        orderBy: { startedAt: "desc" },
        include: { jobs: true }
    });

    return NextResponse.json(executions);
}