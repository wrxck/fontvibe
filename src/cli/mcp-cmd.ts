import fs from 'node:fs';
import path from 'node:path';

function write(msg: string): void {
  process.stderr.write(msg + '\n');
}

export async function runMcp(): Promise<void> {
  const rcPath = path.resolve(process.cwd(), '.fontviberc');
  let config = { apiKey: '', wsPort: 24242 };

  if (fs.existsSync(rcPath)) {
    try {
      config = { ...config, ...JSON.parse(fs.readFileSync(rcPath, 'utf-8')) };
    } catch {
      write('Failed to parse .fontviberc');
    }
  }

  if (!config.apiKey) {
    write('No API key found. Run `fontvibe init` first.');
    process.exit(1);
  }

  const { startMcpServer } = await import('../mcp/server.js');
  await startMcpServer(config.apiKey, config.wsPort);
}
