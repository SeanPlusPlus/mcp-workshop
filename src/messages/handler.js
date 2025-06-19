// src/messages/handler.js

export const handleMessage = async (message) => {
  if (message.role === 'user') {
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
