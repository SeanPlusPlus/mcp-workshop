// src/llm/planTool.js

import 'dotenv/config'
import { OpenAI } from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const TOOL_INSTRUCTIONS = `
You are an intelligent assistant that decides which tool to use based on a user message.
Available tools:
- calculator: for math (e.g. "2 + 2")
- time: for current time questions (e.g. "What time is it?")
- diceRoll: for randomness (e.g. "Roll a die")

Respond with a JSON object ONLY like this:
{ "tool": "toolName", "input": "toolInput" }
`

export async function planTool(userMessage) {
  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: TOOL_INSTRUCTIONS },
      { role: 'user', content: userMessage },
    ],
    temperature: 0,
  })

  const content = res.choices[0].message.content
  try {
    const parsed = JSON.parse(content)
    return parsed
  } catch (err) {
    console.error('Failed to parse tool plan from LLM:', content)
    throw new Error('Invalid tool plan')
  }
}
