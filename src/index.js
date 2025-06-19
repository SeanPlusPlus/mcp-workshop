// src/index.js

import { handleMessage } from './messages/handler.js'

const messages = [
  {
    role: 'user',
    content: 'What is 72 divided by 9?',
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
