import { runWorkflow } from "@opsflow/engine";

runWorkflow({
    name: "test",
    steps: [
        {
            key: "Google",
            type: "http",
            config: { url: "https://jsonplaceholder.typicode.com/todos/1" }
        }
    ]
});