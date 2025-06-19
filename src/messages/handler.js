// src/messages/handler.js

import { evaluate } from '../tools/calculator.js'

export const handleMessage = async (message) => {
  if (message.role === 'user') {
    const mathMatch = message.content.match(/(\d+[\s]*[+\-*/][\s]*\d+)/)

    if (mathMatch) {
      const expression = mathMatch[1]
      try {
        const result = evaluate(expression)
        return {
          role: 'assistant',
          content: `The answer is ${result}`,
        }
      } catch (err) {
        return {
          role: 'assistant',
          content: "Sorry, I couldn't evaluate that expression.",
        }
      }
    }

    return {
      role: 'assistant',
      content: 'The answer is 4',
    }
  }

  return {
    role: 'assistant',
    content: 'I can only respond to user messages right now.',
  }
}
