// src/tools/registry.js

import { evaluate } from './calculator.js'
import { getCurrentTime } from './time.js'
import { rollDie } from './dice.js'

export const toolRegistry = [
  {
    name: 'calculator',
    description: 'Evaluates simple math expressions like "2 + 2".',
    match: (content) => content.match(/(\d+[\s]*[+\-*/][\s]*\d+)/),
    inputSchema: 'string (simple math expression)',
    outputSchema: 'number',
    handler: (match) => evaluate(match[1]),
  },
  {
    name: 'time',
    description: 'Returns the current time in ISO 8601 format.',
    match: (content) => /what\s+time\s+is\s+it\??/i.test(content),
    inputSchema: 'none',
    outputSchema: 'string (ISO timestamp)',
    handler: () => getCurrentTime(),
  },
  {
    name: 'diceRoll',
    description:
      'Rolls a 6-sided die and returns a random integer from 1 to 6.',
    match: (content) => /roll\s+(a|one)?\s*(die|dice)/i.test(content),
    inputSchema: 'none',
    outputSchema: 'number (1–6)',
    handler: () => rollDie(),
  },
]
