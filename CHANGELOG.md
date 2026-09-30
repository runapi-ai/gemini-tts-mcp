# Changelog

## [v0.2.0](https://github.com/runapi-ai/gemini-tts-mcp/releases/tag/v0.2.0) - 2026-09-30

### Changed
- Send tool arguments to the service without local model, enum, range, required-field, or cross-field validation. Tool descriptions still list declared types and known values.
  Migration: Invalid arguments now return the service's error, including its message, instead of a local tool-input rejection.
- Make accent, style, and pace optional for each speaker on text_to_speech; only speaker_id and voice_name are required.
- Depend on @runapi.ai/mcp-core 0.4.5 and send task creation and lookup to each tool's published route.


## [v0.1.1](https://github.com/runapi-ai/gemini-tts-mcp/releases/tag/v0.1.1) - 2026-07-31

### Changed
- Resolve MCP prices from the RunAPI Price Schedule API instead of embedded package data.


## [v0.1.0](https://github.com/runapi-ai/gemini-tts-mcp/releases/tag/v0.1.0) - 2026-07-20

### Added
- Add multi-speaker text-to-speech tools with model-specific input contracts and task polling.
