<h1 align="center">RunAPI Gemini TTS MCP Server</h1>

<p align="center">
  <strong>Gemini TTS API access for AI agents: run audio generation operations, poll asynchronous results, and check pricing through one focused MCP server.</strong>
</p>

<p align="center">
  <sub>Works with Claude Code, Codex, Cursor, Windsurf, VS Code, Roo Code, and any MCP-compatible host.</sub>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@runapi.ai/gemini-tts-mcp"><img src="https://img.shields.io/npm/v/%40runapi.ai/gemini-tts-mcp?style=flat-square&color=blue" alt="npm version"></a>
  <a href="https://github.com/runapi-ai/gemini-tts-mcp"><img src="https://img.shields.io/badge/GitHub-runapi--ai%2Fgemini--tts--mcp-24292f?style=flat-square" alt="GitHub repository"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-Apache_2.0-blue?style=flat-square" alt="Apache-2.0 license"></a>
  <img src="https://img.shields.io/badge/Type-MCP_Server-blue?style=flat-square" alt="MCP Server">
  <img src="https://img.shields.io/badge/Models-2-16a34a?style=flat-square" alt="2 models">
</p>

<p align="center">
  <a href="#install">Install</a> |
  <a href="#tools">Tools</a> |
  <a href="#models">Models</a> |
  <a href="#agent-prompts">Agent Prompts</a> |
  <a href="#configuration">Configuration</a> |
  <a href="#links">Links</a>
</p>

---

## Why This Package?

`@runapi.ai/gemini-tts-mcp` is a focused Model Context Protocol server for the **Gemini TTS** model line on RunAPI.
It gives MCP-compatible assistants direct access to 1 endpoint and 2 model variants without loading the full RunAPI catalog.

Use this per-model server when an agent should stay scoped to Gemini TTS. Use [`@runapi.ai/mcp`](https://github.com/runapi-ai/mcp) when one assistant should discover every RunAPI model line.

---

## Install

Add it to Claude Code:

```bash
claude mcp add gemini-tts -s user -- npx -y @runapi.ai/gemini-tts-mcp
```

Use project scope when the server should be shared with a repository:

```bash
claude mcp add gemini-tts -s project -- npx -y @runapi.ai/gemini-tts-mcp
```

Codex, Cursor, Windsurf, VS Code, Roo Code, and other MCP hosts can use the same stdio command:

```json
{
  "mcpServers": {
    "gemini-tts": {
      "command": "npx",
      "args": ["-y", "@runapi.ai/gemini-tts-mcp"]
    }
  }
}
```

`check_pricing` works before sign-in. For task creation and status polling, ask your assistant to call the `login` tool. It opens a browser login and saves credentials to `~/.config/runapi/config.json`, the same file used by `runapi login`.
Headless and CI hosts can still set `RUNAPI_API_KEY` before starting the MCP host.

Ready-made examples are in [`examples/`](examples/) for Claude, Cursor, Windsurf, VS Code, and Roo Code.

---

## Tools

| Tool | Auth | Purpose |
|---|---|---|
| `text_to_speech` | Yes | Create a Gemini TTS text to speech task and optionally wait for a terminal status. Returns the task id, status, and output URLs. |
| `get_task` | Yes | Fetch the current status and latest payload for an existing task. |
| `check_pricing` | No | Look up current pricing for a Gemini TTS model and endpoint. |

---

## Models

Gemini TTS covers 2 model variants across 1 endpoint. Each tool accepts the models listed for it:

| Tool | Models |
|---|---|
| `text_to_speech` | `gemini-2.5-pro-tts`, `gemini-3.1-flash-tts` |

Model availability can change between releases. Use `check_pricing` or the [Gemini TTS model page](https://runapi.ai/models/gemini-tts) for the current catalog view.

---

## Agent Prompts

Ask your assistant in natural language; it can inspect pricing, create the task, and return the task id plus output URLs.

### Create a task

```text
Run a Gemini TTS text to speech task with RunAPI.
```

The assistant can call `check_pricing`, then `text_to_speech`, and return the task id, status, and output URLs.

### Submit without waiting

```text
Create the task but don't wait for it to finish.
```

The assistant calls the create tool with `wait: false` and returns the task id. Check on it later with `get_task`.

### Check pricing before creating

```text
Check current Gemini TTS pricing, then create the task if it matches my request.
```

The assistant calls `check_pricing` and can link to the [Gemini TTS model page](https://runapi.ai/models/gemini-tts) for the canonical catalog entry.

---

## Configuration

The server resolves auth in this order:

1. `RUNAPI_API_KEY` environment variable, useful for headless and CI hosts
2. `~/.config/runapi/config.json`, created by the MCP `login` tool or `runapi login`
3. No key, which still allows `check_pricing`

The config file is normally managed by login. A pre-provisioned headless config can use:

```json
{
  "apiKey": "your_runapi_key"
}
```

Do not commit real API keys.

---

## Links

| Resource | URL |
|---|---|
| Gemini TTS model page | [https://runapi.ai/models/gemini-tts](https://runapi.ai/models/gemini-tts) |
| npm package | [@runapi.ai/gemini-tts-mcp](https://www.npmjs.com/package/@runapi.ai/gemini-tts-mcp) |
| GitHub repository | [runapi-ai/gemini-tts-mcp](https://github.com/runapi-ai/gemini-tts-mcp) |
| RunAPI MCP overview | [runapi.ai/mcp](https://runapi.ai/mcp) |
| RunAPI docs | [runapi.ai/docs](https://runapi.ai/docs) |

---

## License

Licensed under the [Apache License, Version 2.0](LICENSE).
