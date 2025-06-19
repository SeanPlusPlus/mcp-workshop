// scripts/listTools.js

import { toolRegistry } from '../src/tools/registry.js'

console.log('\n🛠 Available Tools\n')

toolRegistry.forEach((tool) => {
  console.log(`🔹 ${tool.name}`)
  console.log(`   Description: ${tool.description}`)
  console.log(`   Input: ${tool.inputSchema}`)
  console.log(`   Output: ${tool.outputSchema}\n`)
})
