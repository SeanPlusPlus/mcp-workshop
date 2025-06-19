// src/logs/trace.js

export const logToolUse = ({ tool, input, output, error }) => {
  const timestamp = new Date().toISOString()

  console.log('[TOOL INVOCATION]', {
    timestamp,
    tool,
    input,
    ...(output !== undefined && { output }),
    ...(error && { error }),
  })
}
