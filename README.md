# MCP WORKSHOP

![GitHub release (latest by date)](https://img.shields.io/github/v/release/SeanPlusPlus/mcp-workshop?label=release)

Welcome to the **Model Context Protocol (MCP) Workshop**! This is a live, iterative tutorial between me (Sean) and ChatGPT — building understanding from first principles and implementing a conceptual prototype in JavaScript step by step.

## 🚀 Goal

Learn and build a conceptual prototype of the Model Context Protocol (MCP) using JavaScript. We’ll simulate how LLMs can interact with tools, external data sources, and memory through a structured protocol.

## 📦 Versions

👉 [View latest GitHub release](https://github.com/SeanPlusPlus/mcp-workshop/releases/latest)

### ✅ Version 1.0.0 (Locked)

To check out the original minimal working prototype:

```bash
git checkout v1.0.0
```

Covered in v1:

- Static regex-based tool detection
- Dynamic tool registry (`registry.js`)
- Tools: `calculator`, `time`, `diceRoll`
- Zod-based schema validation for input/output
- Structured tool invocation responses
- CLI for listing tools: `npm run tools`
- Logging and tracing of tool usage

---

### ✅ Version 2.0.0

To explore v2:

```bash
git checkout v2.0.0
```

Added in v2:

- 🧠 `planTool()` uses GPT-4 to route user prompts to tools
- 🧪 `scripts/testPlanner.js` lets you try LLM-driven planning via `npm run plan`
- 🧰 `handleMessage()` falls back to the LLM if no tool is matched
- 🔁 Tool output is passed back to GPT-4 via `finalReply()`
- 💬 Final user-facing response is generated by the LLM

v2 completes the full reasoning loop:  
**LLM → tool → LLM**

---

### ✅ Version 3.0.0

```bash
git checkout main
npm install
npm run agent
```

New in v3:

- Introduced mcp-agent.js, the core LLM → Tool → Output runner
- Automatically plans which tool to use via GPT-4
- Invokes and validates tool output using Zod
- Script name: `npm run agent`

---

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
  - `llm/` — Planner + final response generation using OpenAI
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

---

## 🧾 Milestones and Feature Summary

### 🛠 v1.0.0 Foundation

- ✅ Created `README.md`
- ✅ Set up ESLint and Prettier (2-space, no semicolons, format-on-save)
- ✅ Built initial tool invocation system using regex-based matching
- ✅ Designed dynamic `toolRegistry.js` with `name`, `match`, `handler`
- ✅ Built first tools: `calculator`, `time`, `diceRoll`
- ✅ Added CLI tool list: `npm run tools`
- ✅ Added tool logging via `trace.js`
- ✅ Introduced Zod validation for input/output schemas
- ✅ Refactored `handleMessage()` to invoke tools via registry
- ✅ CLI-driven test suite via `index.js` messages
- ✅ Tagged and released as `v1.0.0`

### 🤖 v2.0.0 Agent Upgrade

- ✅ Introduced GPT-4-based planner: `planTool.js`
- ✅ Created CLI script: `npm run plan` to test LLM tool routing
- ✅ Fallback to LLM planning in `handleMessage()` when no tool matches
- ✅ Created `finalReply.js` to turn tool result into natural language
- ✅ Completed full loop: **LLM → tool → LLM reply**
- ✅ Updated all messages to return human-facing responses from the model
- ✅ Updated README, tagged and ready for `v2.0.0`

### ⏭️ Next Ideas

- Add memory context or conversation history
- Support multiple tool calls in a single turn
- Use system-level planning instructions
- Make planner LLM aware of prior tool results or facts
