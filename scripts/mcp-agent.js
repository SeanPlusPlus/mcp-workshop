// scripts/mcp-agent.js

import readline from 'readline'
import { planTool } from '../src/llm/planTool.js'
import { toolRegistry } from '../src/tools/registry.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('🧠 Enter a user message: ', async (input) => {
  try {
    const plan = await planTool(input)
    console.log('\n✅ LLM Tool Plan:', plan)

    const tool = toolRegistry.find((t) => t.name === plan.tool)
    if (!tool) throw new Error(`❌ Tool "${plan.tool}" not found in registry`)

    const parsedInput = tool.inputSchema.parse(plan.input)
    const rawOutput = await tool.handler(parsedInput)
    const validatedOutput = tool.outputSchema.parse(rawOutput)

    console.log('\n🛠️  Tool Output:', validatedOutput)
  } catch (err) {
    console.error('\n❌ Error:', err.message)
  } finally {
    rl.close()
  }
})
