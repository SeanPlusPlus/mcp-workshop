// src/messages/handleMessage.js

import { toolRegistry } from '../tools/registry.js'
import { traceToolUse } from '../tracing/trace.js'
import { planTool } from '../llm/planTool.js'
import { finalReply } from '../llm/finalReply.js'

export async function handleMessage(userMessage) {
  let matched = toolRegistry.match(userMessage)

  if (!matched) {
    try {
      matched = await planTool(userMessage)
    } catch (err) {
      return {
        role: 'assistant',
        type: 'text',
        content: `Sorry, I couldn’t understand that.`,
      }
    }
  }

  const { tool, input } = matched
  const handler = toolRegistry.get(tool)

  if (!handler) {
    return {
      role: 'assistant',
      type: 'text',
      content: `Tool "${tool}" not found.`,
    }
  }

  let output
  try {
    output = await handler.run(input)
  } catch (err) {
    return {
      role: 'assistant',
      type: 'text',
      content: `Error running tool "${tool}": ${err.message}`,
    }
  }

  await traceToolUse({ tool, input, output })

  const final = await finalReply({ userMessage, toolName: tool, input, output })

  return {
    role: 'assistant',
    type: 'text',
    content: final,
  }
}
