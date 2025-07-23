// src/index.js

import { handleMessage } from './messages/handler.js'

const messages = [
  {
    role: 'user',
    content: 'What is 2 + 2?',
  },
  {
    role: 'user',
    content: 'What time is it?',
  },
  {
    role: 'user',
    content: 'Can you roll a die for me?',
  },
]

const main = async () => {
  for (const message of messages) {
    console.log('[USER]', message.content)
    const response = await handleMessage(message)
    console.log('[LLM Response]', response, '\n\n============\n')
  }
}

main()
