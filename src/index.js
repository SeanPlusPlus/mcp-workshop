// src/index.js

import { handleMessage } from './messages/handler.js'

const userMessage = {
  role: 'user',
  content: 'What is 2 + 2?',
}

const main = async () => {
  const response = await handleMessage(userMessage)
  console.log('LLM Response:', response)
}

main()
