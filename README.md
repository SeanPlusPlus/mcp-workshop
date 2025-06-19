# MCP WORKSHOP

Welcome to the **Model Context Protocol (MCP) Workshop**! This is a live, iterative tutorial between me (Sean) and ChatGPT — building understanding from first principles and implementing a conceptual prototype in JavaScript step by step.

## 🚀 Goal

Learn and build a conceptual prototype of the Model Context Protocol (MCP) using JavaScript. We’ll simulate how LLMs can interact with tools, external data sources, and memory through a structured protocol.

## 📚 What is MCP?

MCP (Model Context Protocol) is an open standard introduced by Anthropic in November 2024. It provides a structured way for LLMs to:

- Access and query external tools
- Retrieve and store context
- Compose workflows involving multiple steps
- Maintain a consistent schema for structured communication

## 🧠 Key Concepts We’ll Explore

- Messages and structured communication
- Tool use and invocation
- External context (retrieval, storage, reasoning)
- Schema design
- Simulated agents and tool responses

## 🛠 Stack

We’ll use:

- JavaScript (Node.js)
- JSON for message structure
- Zod for schema validation
- OpenAI’s GPT-4 for planning
- Simple local mocks for tools and memory

## 🧩 Structure

- `src/`
  - `index.js` — Entry point for the workshop
  - `messages/` — Simulated message handling and agent logic
  - `tools/` — Mock external tools (e.g., calculator, time, dice, registry)
  - `llm/` — Planner that queries OpenAI to select a tool and input
  - `memory/` — Contextual storage/retrieval (TBD)
  - `schemas/` — Definitions for message formats (TBD)
  - `tracing/` — Logs structured tool usage to simulate MCP-style traceability
- `scripts/`
  - `listTools.js` — Lists available tool cards
  - `testPlanner.js` — Interactively test LLM tool planning via CLI
- `.env` — Holds your `OPENAI_API_KEY`
- `README.md` — This file

## 🏁 How to Start

```bash
npm install
npm start
```

To list available tools:

```bash
npm run tools
```

To test LLM tool planning:

```bash
npm run plan
```

## 📌 v2 In Progress

We’ve begun layering in OpenAI-driven planning to replace regex matching:

- Fallback to GPT-4 when no match is found
- Tool planning happens via `planTool()` in `src/llm`
- Tool cards still handle validation and execution

---

## ✅ Progress So Far

- ✔️ Created initial `README.md`
- ✔️ Set up ESLint and Prettier for 2-space indentation and no semicolons
- ✔️ Added a basic `index.js` file that simulates an LLM responding to a user prompt
- ✔️ Created `handleMessage()` to return structured tool usage or fallback text
- ✔️ Implemented a basic calculator tool using `eval()` with guardrails
- ✔️ Introduced MCP-style output with `{ role, type, tool, input, output }`
- ✔️ Added structured logging in `src/tracing/trace.js` to trace tool usage with timestamps
- ✔️ Renamed `logs/` to `tracing/` to avoid `.gitignore` conflicts
- ✔️ Added a `time` tool that returns the current ISO timestamp
- ✔️ Introduced a dynamic `toolRegistry` in `src/tools/registry.js`
- ✔️ Refactored `handleMessage()` to detect and invoke tools through the registry
- ✔️ Added a `diceRoll` tool that simulates rolling a 6-sided die
- ✔️ Updated `index.js` to run a test message for each tool (calculator, time, dice, fallback)
- ✔️ Converted all tools into full MCP-style tool cards with metadata and schema definitions
- ✔️ Created `scripts/listTools.js` and CLI command `npm run tools` to list all available tools
- ✔️ Installed and integrated `zod` to define and enforce `inputSchema` and `outputSchema` in each tool
- ✔️ Added `planTool()` using OpenAI’s GPT-4 to determine tool + input from natural language
- ✔️ Created CLI test runner for the planner with `npm run plan`
- ✔️ Integrated `planTool()` into `handleMessage()` for fallback logic

Next up: Consider finalizing `v2.0.0`, adding memory, or supporting multi-tool planning
