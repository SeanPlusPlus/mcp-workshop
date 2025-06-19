// scripts/testPlanner.js

import readline from 'readline'
import { planTool } from '../src/llm/planTool.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('🧠 Enter a user message: ', async (input) => {
  try {
    const plan = await planTool(input)
    console.log('\n✅ LLM Tool Plan:', plan)
  } catch (err) {
    console.error('\n❌ Error:', err.message)
  } finally {
    rl.close()
  }
})
