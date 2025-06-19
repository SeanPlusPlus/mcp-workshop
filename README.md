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
- Simple local mocks for tools and memory

## 🧩 Structure

- `src/`
  - `index.js` — Entry point for the workshop
  - `messages/` — Simulated message handling and agent logic
  - `tools/` — Mock external tools (e.g., calculator, search)
  - `memory/` — Contextual storage/retrieval (TBD)
  - `schemas/` — Definitions for message formats (TBD)
  - `tracing/` — Logs structured tool usage to simulate MCP-style traceability
- `README.md` — This file

## 🏁 How to Start

```bash
npm install
npm start
```

You’ll walk through a series of interactive steps to simulate an LLM handling a request, querying tools, and returning a structured response.

## 📌 Next Step

Continue adding tools and build a schema-driven message pipeline.

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

Next up: Add additional tools and evolve toward a message router + tool registry
