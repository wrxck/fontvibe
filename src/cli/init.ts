import fs from 'node:fs';
import path from 'node:path';

import prompts from 'prompts';

function write(msg: string): void {
  process.stdout.write(msg + '\n');
}

export async function runInit(): Promise<void> {
  const rcPath = path.resolve(process.cwd(), '.fontviberc');

  const existing = fs.existsSync(rcPath);
  if (existing) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: '.fontviberc already exists. Overwrite?',
      initial: false,
    });
    if (!overwrite) {
      write('Cancelled.');
      return;
    }
  }

  const response = await prompts([
    {
      type: 'text',
      name: 'apiKey',
      message: 'Google Fonts API key:',
      validate: (v: string) => v.length > 0 || 'API key is required',
    },
    {
      type: 'number',
      name: 'wsPort',
      message: 'WebSocket port for MCP bridge:',
      initial: 24242,
    },
    {
      type: 'select',
      name: 'position',
      message: 'Panel position:',
      choices: [
        { title: 'Bottom Right', value: 'bottom-right' },
        { title: 'Bottom Left', value: 'bottom-left' },
        { title: 'Top Right', value: 'top-right' },
        { title: 'Top Left', value: 'top-left' },
      ],
      initial: 0,
    },
  ]);

  if (!response.apiKey) {
    write('Cancelled.');
    return;
  }

  const config = {
    apiKey: response.apiKey,
    wsPort: response.wsPort || 24242,
    position: response.position || 'bottom-right',
    persistSwaps: true,
  };

  fs.writeFileSync(rcPath, JSON.stringify(config, null, 2) + '\n');
  write(`Created ${rcPath}`);
}
