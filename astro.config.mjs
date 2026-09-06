import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://example.com',
  trailingSlash: 'never',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});
