import { Agent, run } from "@openai/agents";
import "dotenv/config";
const agent = new Agent({
  name: "Test Agent",
  instructions: "You are a helpful agent",
});

async function testAgent() {
  const response = await run(
    agent,
    "Hello, Which is beautiful city? In one sentence"
  );
  console.log(response.finalOutput);
}

testAgent();
