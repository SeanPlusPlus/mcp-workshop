// src/index.js

import { handleMessage } from './messages/handler.js'

const messages = [
  {
    role: 'user',
    content: 'What is 6 * 7?',
  },
  {
    role: 'user',
    content: 'What time is it?',
  },
  {
    role: 'user',
    content: 'Tell me something else',
  },
]

const main = async () => {
  for (const message of messages) {
    const response = await handleMessage(message)
    console.log('\nUser:', message.content)
    console.log('LLM Response:', response)
  }
}

main()
