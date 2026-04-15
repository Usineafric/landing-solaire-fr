import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://lepanneausolaire.com',
  output: 'static',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/admin'),
    }),
    react(),
  ],
  // Cloudflare Pages adapter (switch output to 'server' if you need SSR)
  // adapter: cloudflare(),
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
