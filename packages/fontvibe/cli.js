#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const pkgDir = dirname(require.resolve('@matthesketh/fontvibe/package.json'));
const cli = join(pkgDir, 'dist', 'cli.js');

execFileSync('node', [cli, ...process.argv.slice(2)], { stdio: 'inherit' });
