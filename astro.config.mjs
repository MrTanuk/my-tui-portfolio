// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://mrtanuk.online',
  // On-demand rendering: repos are fetched per request instead of being
  // frozen at build time, so a new repo no longer requires a redeploy.
  output: 'server',
  adapter: vercel({
    // ISR: cache the rendered pages and regenerate at most once an hour.
    // Without it, every page view would hit the GitHub API and blow past
    // its 60 req/hour unauthenticated limit.
    isr: { expiration: 3600 },
  }),
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), sitemap()],
});

