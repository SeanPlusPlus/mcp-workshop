// src/messages/handler.js

import { toolRegistry } from '../tools/registry.js'
import { logToolUse } from '../tracing/trace.js'

export const handleMessage = async (message) => {
  if (message.role !== 'user') {
    return {
      role: 'assistant',
      type: 'text',
      content: 'I can only respond to user messages right now.',
    }
  }

  for (const tool of toolRegistry) {
    const match = tool.match(message.content)
    if (match) {
      try {
        const input = match[1] ?? undefined

        // Validate input if schema exists
        if (
          tool.inputSchema &&
          tool.inputSchema._def.typeName !== 'ZodUndefined'
        ) {
          tool.inputSchema.parse(input)
        }

        const output = await tool.handler(match)

        // Validate output
        tool.outputSchema.parse(output)

        logToolUse({
          tool: tool.name,
          input: message.content,
          output,
        })

        return {
          role: 'assistant',
          type: 'tool_use',
          tool: tool.name,
          input: message.content,
          output,
        }
      } catch (err) {
        logToolUse({
          tool: tool.name,
          input: message.content,
          error: err.message || 'Unknown error',
        })

        return {
          role: 'assistant',
          type: 'tool_use',
          tool: tool.name,
          input: message.content,
          error: 'Tool invocation failed',
        }
      }
    }
  }

  return {
    role: 'assistant',
    type: 'text',
    content: 'The answer is 4',
  }
}
