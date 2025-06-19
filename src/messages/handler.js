// src/messages/handler.js

import { evaluate } from '../tools/calculator.js'
import { logToolUse } from '../tracing/trace.js'

export const handleMessage = async (message) => {
  if (message.role === 'user') {
    const mathMatch = message.content.match(/(\d+[\s]*[+\-*/][\s]*\d+)/)

    if (mathMatch) {
      const expression = mathMatch[1]
      try {
        const result = evaluate(expression)

        logToolUse({
          tool: 'calculator',
          input: expression,
          output: result,
        })

        return {
          role: 'assistant',
          type: 'tool_use',
          tool: 'calculator',
          input: expression,
          output: result,
        }
      } catch (err) {
        logToolUse({
          tool: 'calculator',
          input: expression,
          error: 'Failed to evaluate expression',
        })

        return {
          role: 'assistant',
          type: 'tool_use',
          tool: 'calculator',
          input: expression,
          error: 'Failed to evaluate expression',
        }
      }
    }

    return {
      role: 'assistant',
      type: 'text',
      content: 'The answer is 4',
    }
  }

  return {
    role: 'assistant',
    type: 'text',
    content: 'I can only respond to user messages right now.',
  }
}
