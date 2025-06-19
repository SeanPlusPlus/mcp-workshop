// src/tools/registry.js

import { z } from 'zod'
import { evaluate } from './calculator.js'
import { getCurrentTime } from './time.js'
import { rollDie } from './dice.js'

export const toolRegistry = [
  {
    name: 'calculator',
    description: 'Evaluates simple math expressions like "2 + 2".',
    match: (content) => content.match(/(\d+[\s]*[+\-*/][\s]*\d+)/),
    inputSchema: z.string(),
    outputSchema: z.number(),
    handler: (match) => evaluate(match[1]),
  },
  {
    name: 'time',
    description: 'Returns the current time in ISO 8601 format.',
    match: (content) => /what\s+time\s+is\s+it\??/i.test(content),
    inputSchema: z.undefined(),
    outputSchema: z.string().datetime(),
    handler: () => getCurrentTime(),
  },
  {
    name: 'diceRoll',
    description:
      'Rolls a 6-sided die and returns a random integer from 1 to 6.',
    match: (content) => /roll\s+(a|one)?\s*(die|dice)/i.test(content),
    inputSchema: z.undefined(),
    outputSchema: z.number().int().min(1).max(6),
    handler: () => rollDie(),
  },
]
