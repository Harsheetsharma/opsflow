import { NextResponse, NextRequest } from "next/server";
// import { WorkflowDefinition } from "@opsflow/engine";
import { runWorkflow } from "@opsflow/engine";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const executionId = await runWorkflow(body);

    return NextResponse.json({
        executionId
    })
}