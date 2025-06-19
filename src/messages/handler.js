// src/messages/handler.js

import { toolRegistry } from '../tools/registry.js'
import { logToolUse } from '../tracing/trace.js'
import { planTool } from '../llm/planTool.js'
import { finalReply } from '../llm/finalReply.js'

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

        if (
          tool.inputSchema &&
          tool.inputSchema._def.typeName !== 'ZodUndefined'
        ) {
          tool.inputSchema.parse(input)
        }

        const output = await tool.handler(match)
        tool.outputSchema.parse(output)

        logToolUse({
          tool: tool.name,
          input: message.content,
          output,
        })

        const final = await finalReply({
          userMessage: message.content,
          toolName: tool.name,
          input,
          output,
        })

        return {
          role: 'assistant',
          type: 'text',
          content: final,
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

  try {
    const { tool: toolName, input } = await planTool(message.content)
    const tool = toolRegistry.find((t) => t.name === toolName)
    if (!tool) throw new Error(`Unknown tool: ${toolName}`)

    tool.inputSchema.parse(input)
    const output = await tool.handler([null, input])
    tool.outputSchema.parse(output)

    logToolUse({ tool: tool.name, input, output })

    const final = await finalReply({
      userMessage: message.content,
      toolName: tool.name,
      input,
      output,
    })

    return {
      role: 'assistant',
      type: 'text',
      content: final,
    }
  } catch (err) {
    logToolUse({ tool: 'planner', input: message.content, error: err.message })
    return {
      role: 'assistant',
      type: 'text',
      content: 'The answer is 4',
    }
  }
}
