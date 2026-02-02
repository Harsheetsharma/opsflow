export type StepType = "http" | "script";

export interface Step {
    key: string;
    type: StepType;
    config: any
}

export interface WorkflowDefinition {
    name: string;
    steps: Step[];
}