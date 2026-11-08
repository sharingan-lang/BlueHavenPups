import { defineConfig, type Plugin } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import { META } from './src/data/meta';

/**
 * Public site URL, used for canonical links, Open Graph, sitemap and robots.
 * Order: VITE_SITE_URL (set it for a custom domain) > Vercel's production domain > placeholder.
 */
const PLACEHOLDER_URL = 'https://bluehavenpups.com';
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const SITE_URL = (process.env.VITE_SITE_URL ?? (vercelHost ? `https://${vercelHost}` : PLACEHOLDER_URL)).replace(/\/$/, '');
/** On Vercel preview deployments, ask crawlers to stay away. */
const isPreviewDeploy = !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production';

function siteFiles(): Plugin {
  return {
    name: 'site-files',
    transformIndexHtml: (html) => html.replaceAll(PLACEHOLDER_URL, SITE_URL),
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const paths = Object.values(META).map((m) => m.path).filter((p) => p !== '/404');
      const urls = paths.map((p) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n');
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n` });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: isPreviewDeploy ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n` });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteFiles()],
  define: { __SITE_URL__: JSON.stringify(SITE_URL) },
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { port: 5173 },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
