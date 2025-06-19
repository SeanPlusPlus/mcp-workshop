// src/tools/calculator.js

export const evaluate = (expression) => {
  // Basic safety: only allow digits, + - * / and spaces
  if (!/^[-+*/\d\s.()]+$/.test(expression)) {
    throw new Error('Invalid characters in expression')
  }

  try {
    // eslint-disable-next-line no-eval
    const result = eval(expression)
    return result
  } catch (err) {
    throw new Error('Error evaluating expression')
  }
}
