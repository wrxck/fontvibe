function write(msg: string): void {
  process.stdout.write(msg + '\n');
}

const [command] = process.argv.slice(2);

switch (command) {
  case 'init': {
    const { runInit } = await import('./cli/init.js');
    await runInit();
    break;
  }
  case 'mcp': {
    const { runMcp } = await import('./cli/mcp-cmd.js');
    await runMcp();
    break;
  }
  default:
    write('fontvibe - font management dev tool\n');
    write('Commands:');
    write('  init    Create .fontviberc config file');
    write('  mcp     Start MCP server with WebSocket bridge');
    break;
}
