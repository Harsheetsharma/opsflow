import { prisma } from "@opsflow/db";
import { NextResponse } from "next/server";

export async function GET(_: Request,
    { params }: { params: { id: string } }) {

    const logs = prisma.jobLogs.findMany({
        where: { jobId: params.id }
    })

    return NextResponse.json({
        logs
    })
}