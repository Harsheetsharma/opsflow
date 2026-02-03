import { runWorkflow } from "@opsflow/engine";

runWorkflow({
    name: "test",
    steps: [
        {
            key: "Google",
            type: "http",
            config: { url: "https://jsonplaceholder.typicode.com/todos/1" },


        }, {
            key: "gemini",
            type: "http",
            config: { url: "https://jsonplaceholder.typicode.com/todos/1" },
        }, {
            key: "FailureStep",
            type: "script",
            config: {
                code: "throw new Error('fail test')"
            }
        }
    ]
});