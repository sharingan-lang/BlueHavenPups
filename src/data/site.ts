/** Central site configuration. Edit here and every page, meta tag and form updates. */
export const SITE = {
  name: 'Blue Haven Pups',
  /** Set by vite.config.ts from VITE_SITE_URL (or Vercel's production domain). */
  url: __SITE_URL__,
  email: 'adoptions@bluehavenpups.com',
  phone: '+1 (800) 492-7164',
  whatsapp: '18004927164',
  /** Minimum age (weeks) a puppy goes home. */
  readyWeeks: 12,
  warrantyMonths: 24,
  year: 2026,
} as const;

/** Registry named in badges and copy. Swap here if you register with a different body. */
export const REGISTRY = { short: 'AKC', long: 'American Kennel Club' } as const;

/** Set false once real photos replace the placeholders. */
export const SHOW_SAMPLE_BADGE = false;

export interface NavItem { to: string; label: string }
export const NAV_PAGES: readonly NavItem[] = [
  { to: '/puppies', label: 'Our Puppies' },
  { to: '/about', label: 'About' },
  { to: '/health', label: 'Health' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/faq', label: 'FAQ' },
];
export const NAV_CTA: NavItem = { to: '/contact', label: 'Contact' };

