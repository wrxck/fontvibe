import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { startBridge, stopBridge } from './bridge.js';
import { createTools } from './tools.js';

export async function startMcpServer(apiKey: string, wsPort: number): Promise<void> {
  startBridge(wsPort);

  const server = new McpServer({
    name: 'fontvibe',
    version: '0.1.0',
  });

  const tools = createTools(apiKey);

  for (const tool of tools) {
    server.tool(
      tool.name,
      tool.description,
      tool.schema.shape,
      async (args) => {
        try {
          const result = await tool.handler(args as Record<string, unknown>);
          return {
            content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
          };
        } catch (err) {
          return {
            content: [{ type: 'text' as const, text: `Error: ${err instanceof Error ? err.message : 'unknown'}` }],
            isError: true,
          };
        }
      },
    );
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);

  process.on('SIGINT', () => {
    stopBridge();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    stopBridge();
    process.exit(0);
  });
}
