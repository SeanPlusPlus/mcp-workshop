// src/tools/registry.js

import { evaluate } from './calculator.js'
import { getCurrentTime } from './time.js'
import { rollDie } from './dice.js'

export const toolRegistry = [
  {
    name: 'calculator',
    match: (content) => content.match(/(\d+[\s]*[+\-*/][\s]*\d+)/),
    handler: (match) => evaluate(match[1]),
  },
  {
    name: 'time',
    match: (content) => /what\s+time\s+is\s+it\??/i.test(content),
    handler: () => getCurrentTime(),
  },
  {
    name: 'diceRoll',
    match: (content) => /roll\s+(a|one)?\s*(die|dice)/i.test(content),
    handler: () => rollDie(),
  },
]
