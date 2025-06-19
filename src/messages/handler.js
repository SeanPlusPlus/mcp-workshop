// src/messages/handler.js

import { evaluate } from '../tools/calculator.js'
import { getCurrentTime } from '../tools/time.js'
import { logToolUse } from '../tracing/trace.js'

export const handleMessage = async (message) => {
  if (message.role !== 'user') {
    return {
      role: 'assistant',
      type: 'text',
      content: 'I can only respond to user messages right now.',
    }
  }

  // Check for math expression
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

  // Check for time request
  const timeMatch = /what\s+time\s+is\s+it\??/i.test(message.content)
  if (timeMatch) {
    const result = getCurrentTime()

    logToolUse({
      tool: 'time',
      input: 'current time',
      output: result,
    })

    return {
      role: 'assistant',
      type: 'tool_use',
      tool: 'time',
      input: 'current time',
      output: result,
    }
  }

  // Default fallback response
  return {
    role: 'assistant',
    type: 'text',
    content: 'The answer is 4',
  }
}
