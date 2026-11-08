import { useEffect } from 'react';
import { SITE } from '@/data/site';

export interface PageMeta {
  title: string;
  description: string;
  /** Path such as "/puppies". */
  path: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
}

function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) { el = create(); document.head.appendChild(el); }
  el.setAttribute(attr, value);
}
const meta = (key: 'name' | 'property', k: string, v: string) =>
  upsert(`meta[${key}="${k}"]`, () => { const e = document.createElement('meta'); e.setAttribute(key, k); return e; }, 'content', v);

export const crumbs = (label: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url + '/' },
    { '@type': 'ListItem', position: 2, name: label, item: SITE.url + path },
  ],
});

/** Keeps <title>, description, canonical, Open Graph, Twitter, robots and JSON-LD in sync per route. */
export function usePageMeta({ title, description, path, noindex, jsonLd }: PageMeta) {
  const ld = JSON.stringify(jsonLd ?? []);
  useEffect(() => {
    const url = SITE.url + (path === '/' ? '/' : path);
    document.title = title;
    meta('name', 'description', description);
    upsert('link[rel="canonical"]', () => { const e = document.createElement('link'); e.setAttribute('rel', 'canonical'); return e; }, 'href', url);
    meta('property', 'og:title', title);
    meta('property', 'og:description', description);
    meta('property', 'og:url', url);
    meta('name', 'twitter:title', title);
    meta('name', 'twitter:description', description);
    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) meta('name', 'robots', 'noindex');
    else robots?.remove();
    document.head.querySelectorAll('script[data-managed-ld]').forEach((n) => n.remove());
    (JSON.parse(ld) as Record<string, unknown>[]).forEach((obj) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-managed-ld', '');
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    });
    return () => document.head.querySelectorAll('script[data-managed-ld]').forEach((n) => n.remove());
  }, [title, description, path, noindex, ld]);
}
