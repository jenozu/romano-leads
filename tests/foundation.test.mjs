import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const requiredFiles = [
  'astro.config.mjs',
  'tsconfig.json',
  '.env.example',
  '.gitignore',
  'src/layouts/BaseLayout.astro',
  'src/pages/index.astro',
  'src/styles/global.css',
  'src/config/site.ts',
  'phases.md',
  'MASTER_BUILD_LIST.md',
];

test('required Build 1 files exist', async () => {
  await Promise.all(requiredFiles.map((file) => access(file)));
});

test('starter page is Blue Horizon specific and contains no Astro demo copy', async () => {
  const page = await readFile('src/pages/index.astro', 'utf8');
  assert.match(page, /Blue Horizon Pools/);
  assert.doesNotMatch(page, /Welcome to Astro/i);
});

test('.env files are ignored while .env.example remains trackable', async () => {
  const gitignore = await readFile('.gitignore', 'utf8');
  assert.match(gitignore, /^\.env$/m);
  assert.match(gitignore, /!\.env\.example/);
});
