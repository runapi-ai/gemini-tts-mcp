import { afterEach, describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "../src/server.js";

let client: Client | undefined;

afterEach(async () => {
  await client?.close();
  client = undefined;
});

describe("gemini-tts nested input schema", () => {
  it("publishes speaker and dialogue item constraints", async () => {
    const server = createServer();
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    client = new Client({ name: "gemini-tts-schema-test", version: "0.1.0" });
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);

    const tools = await client.listTools();
    const speechTool = tools.tools.find((tool) => tool.name === "text_to_speech");
    const properties = speechTool?.inputSchema.properties as Record<string, any>;

    expect(properties.speakers).toMatchObject({ type: "array", minItems: 1 });
    expect([...properties.speakers.items.required].sort()).toEqual(["accent", "pace", "speaker_id", "style", "voice_name"]);
    expect(properties.speakers.items.properties.speaker_id.pattern).toBe("^Speaker [1-9][0-9]*$");
    expect(properties.speakers.items.properties.voice_name.enum).toContain("Fenrir");
    expect([...properties.dialogue_turns.items.required].sort()).toEqual(["speaker_id", "text"]);
    expect(properties.dialogue_turns.items.properties.text.maxLength).toBe(10_000);
  });
});
