// src/llm/finalReply.js

import { OpenAI } from 'openai'
import 'dotenv/config'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const FINAL_INSTRUCTIONS = `
You are an assistant responding to the user.
A tool has been invoked on your behalf. You now know its result.
Compose a friendly, natural response to the user using that result.
Respond with plain text only.
`

export async function finalReply({ userMessage, toolName, input, output }) {
  const messages = [
    { role: 'system', content: FINAL_INSTRUCTIONS },
    { role: 'user', content: `User said: "${userMessage}"` },
    {
      role: 'assistant',
      content: `Tool used: ${toolName}\nInput: ${input}\nOutput: ${output}`,
    },
  ]

  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages,
    temperature: 0.7,
  })

  return res.choices[0].message.content.trim()
}
