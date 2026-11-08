import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { ABOUT_IMAGE, BREEDS, BREED_NAMES, PUPPIES } from '@/data/breeds';
import { BREED_ASSETS, BREED_ORDER } from '@/data/breedAssets';
import { createBreedClock } from '@/state/breedClock';
import { variantSrc, srcSet } from '@/lib/images';
import { existsSync } from 'node:fs';
import { META } from '@/data/meta';
import { FAQ, REVIEWS, HEALTH_PROVIDE } from '@/data/content';
import { SITE } from '@/data/site';

const go = async (path: string) => {
  render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);
  await screen.findAllByRole('heading', { level: 1 });
};

describe('central data', () => {
  it('features exactly the five toy breeds', async () => {
    expect(BREED_NAMES).toEqual(['Yorkie', 'Maltese', 'Poodle', 'Pomeranian', 'Chihuahua']);
  });
  it('keeps every array aligned with BREEDS', async () => {
    expect([...BREED_ORDER]).toEqual([...BREED_NAMES]);
    expect(Object.keys(BREED_ASSETS).sort()).toEqual([...BREED_ORDER].sort());
    PUPPIES.forEach((p) => expect(BREED_NAMES).toContain(p.breed));
    BREEDS.forEach((b) => expect(PUPPIES.some((p) => p.breed === b.name)).toBe(true));
  });
  it('contains no leftover cat vocabulary', async () => {
    const blob = JSON.stringify({ BREEDS, PUPPIES, BREED_ASSETS, META, FAQ, REVIEWS, HEALTH_PROVIDE, SITE }).replace(/dogs or cats/g, '');
    expect(blob).not.toMatch(/kitten|\bcats?\b|cattery|feline|ragdoll|bengal|persian|maine coon|russian blue|TICA|CFA|FVRCP/i);
  });
  it('meets SEO length limits', async () => {
    Object.values(META).forEach((m) => {
      expect(m.title.length).toBeLessThanOrEqual(60);
      expect(m.description.length).toBeGreaterThanOrEqual(120);
      expect(m.description.length).toBeLessThanOrEqual(165);
    });
  });
});

describe('routes', () => {
  it.each(['/', '/puppies', '/about', '/health', '/reviews', '/faq', '/contact', '/nope'])('renders %s with one h1', async (p) => {
     await go(p);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(document.body.textContent).not.toMatch(/kitten/i);
  });
  it('sets the title per route', async () => {
     await go('/health');
    expect(document.title).toBe(META.health.title);
  });
});

describe('nav dropdown', () => {
  it('lists all five breeds and links to the filtered list', async () => {
     await go('/');
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /browse puppies by breed/i }));
    const menu = screen.getByRole('list', { name: 'Breeds' });
    expect(within(menu).getAllByRole('link')).toHaveLength(BREEDS.length + 1);
    await user.click(within(menu).getByRole('link', { name: /Poodle/ }));
    expect(await screen.findByRole('heading', { level: 1, name: /ready to come home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Poodle' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Showing 1 puppy')).toBeInTheDocument();
  });
  it('closes on Escape', async () => {
     await go('/');
    const user = userEvent.setup();
    const caret = screen.getByRole('button', { name: /browse puppies by breed/i });
    await user.click(caret);
    expect(caret).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Escape}');
    expect(caret).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('puppies page', () => {
  it('filters by breed from the URL and via chips', async () => {
     await go('/puppies?breed=Maltese');
    expect(await screen.findByText('Showing 2 puppies')).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText(`Showing ${PUPPIES.length} puppies`)).toBeInTheDocument();
  });
  it('shows reserved puppies without an ask button', async () => {
     await go('/puppies');
    await screen.findByText('Mochi');
    expect(screen.queryByRole('link', { name: /Ask about Mochi/ })).toBeNull();
    expect(screen.getByRole('link', { name: /Ask about Pepper/ })).toHaveAttribute('href', '/contact?puppy=Pepper');
  });
});

describe('contact form', () => {
  it('pre-fills the Selected puppy field from ?puppy=', async () => {
     await go('/contact?puppy=Pepper');
    const sel = await screen.findByLabelText(/selected puppy or breed/i);
    expect(sel).toHaveAttribute('id', 'puppy');
    expect(sel).toHaveValue('Pepper');
    expect(document.getElementById('ctx')).toHaveTextContent(/Pepper, a female Yorkie/);
  });
  it('offers every breed and the waiting list', async () => {
     await go('/contact');
    const sel = await screen.findByLabelText(/selected puppy or breed/i);
    const opts = within(sel).getAllByRole('option').map((o) => o.textContent);
    BREED_NAMES.forEach((b) => expect(opts).toContain(`Any ${b}`));
    expect(opts).toContain('Waiting list');
    expect(opts).not.toContain('Mochi');
  });
  it('validates required fields', async () => {
     await go('/contact');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: /send by email/i }));
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute('aria-invalid', 'true');
    expect(document.getElementById('email-err')).toHaveTextContent(/check your email/i);
  });
});

describe('faq', () => {
  it('filters questions', async () => {
     await go('/faq');
    const user = userEvent.setup();
    await user.type(await screen.findByLabelText(/search the questions/i), 'flight');
    expect(screen.getByText(/Showing 1 of/)).toBeInTheDocument();
  });
});

describe('home rotator', () => {
  it('reserves space for all five breeds and announces them once', async () => {
     await go('/');
    const r = document.querySelector('.rotator')!;
    expect(r.querySelectorAll('span[data-state]')).toHaveLength(5);
    expect(r.querySelectorAll('span[data-state="on"]')).toHaveLength(1);
    expect(document.querySelector('.hero h1 .sr-only')).toHaveTextContent('Yorkie, Maltese, Poodle, Pomeranian, Chihuahua');
  });
});

describe('asset map', () => {
  const pub = (src: string) => `${process.cwd()}/public${src}`;
  it('points every breed and puppy image at a file that exists', () => {
    BREED_ORDER.forEach((b) => expect(existsSync(pub(BREED_ASSETS[b].imagePlaceholder))).toBe(true));
    BREEDS.forEach((b) => expect(existsSync(pub(b.image))).toBe(true));
    // every photo has its responsive variants
    BREED_ORDER.forEach((b) => expect(existsSync(pub(variantSrc(BREED_ASSETS[b].imagePlaceholder, 480)))).toBe(true));
    BREEDS.forEach((b) => [480, 160].forEach((w) => expect(existsSync(pub(variantSrc(b.image, w)))).toBe(true)));
    expect(existsSync(pub(variantSrc(ABOUT_IMAGE.src, 480)))).toBe(true);
    PUPPIES.forEach((p) => expect(existsSync(pub(p.image))).toBe(true));
  });
  it('matches each breed to the right uploaded file', () => {
    expect(BREED_ASSETS.Yorkie.uploadedAs).toBe('Yorkie.jpeg');
    expect(BREED_ASSETS.Maltese.uploadedAs).toBe('Maltese.jpeg');
    expect(BREED_ASSETS.Poodle.uploadedAs).toBe('poodle.jpeg');
    expect(BREED_ASSETS.Pomeranian.uploadedAs).toBe('Pomeranian.jpeg');
    expect(BREED_ASSETS.Chihuahua.uploadedAs).toBe('Chihuahua_pups.jpeg');
    PUPPIES.forEach((p) => expect(p.image).not.toMatch(/\/(yorkie|maltese|poodle|pomeranian|chihuahua)\.webp$/));
  });
});

describe('breed clock', () => {
  it('wraps around and rejects bad indexes', () => {
    const c = createBreedClock(5, 1000);
    c.goTo(4); expect(c.getIndex()).toBe(4);
    expect(() => c.goTo(9)).toThrow(RangeError);
    expect(() => createBreedClock(0, 1000)).toThrow();
  });
  it('notifies subscribers and stops notifying after unsubscribe', () => {
    const c = createBreedClock(5, 1000); let n = 0;
    const off = c.subscribe(() => { n += 1; });
    c.goTo(2); off(); c.goTo(3);
    expect(n).toBe(1);
  });
});

describe('hero', () => {
  it('shows the active breed photo, tagline and a pause control, with no layout-changing swaps', async () => {
    await go('/');
    const imgs = document.querySelectorAll<HTMLImageElement>('.tag-photo img');
    expect(imgs).toHaveLength(5);
    expect([...imgs].filter((i) => i.style.opacity === '1')).toHaveLength(1);
    expect(document.querySelectorAll('.tagline > span')).toHaveLength(5);
    const user = userEvent.setup();
    const pause = screen.getByRole('button', { name: /pause breed rotation/i });
    await user.click(pause);
    expect(screen.getByRole('button', { name: /resume breed rotation/i })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Show Pomeranian' }));
    expect([...document.querySelectorAll<HTMLImageElement>('.tag-photo img')].findIndex((i) => i.style.opacity === '1')).toBe(3);
    await waitFor(() => expect(document.querySelector('.tag-cap')).toHaveTextContent('Pomeranian'));
  });
  it('keeps the future Our Puppies hook inactive', async () => {
    await go('/');
    expect(document.getElementById('our-puppies-grid')).toBeNull();
  });
});

describe('testimonials stay text-only', () => {
  it('has no images and no locations', async () => {
    await go('/reviews');
    expect(document.querySelectorAll('main img')).toHaveLength(0);
    REVIEWS.forEach((r) => expect(r.meta).not.toMatch(/,\s*[A-Z]{2}\b/));
  });
});

describe('image helpers', () => {
  it('builds variant paths and srcset strings', () => {
    expect(variantSrc('/img/hero/yorkie.webp', 480)).toBe('/img/hero/yorkie-480.webp');
    expect(srcSet('/img/hero/yorkie.webp', [480])).toBe('/img/hero/yorkie-480.webp 480w, /img/hero/yorkie.webp 800w');
  });
});

describe('hero image loading', () => {
  it('loads only the first photo up front, then the next one ahead of time', async () => {
    await go('/');
    const withSrc = () => [...document.querySelectorAll<HTMLImageElement>('.tag-photo img')].filter((i) => i.getAttribute('src'));
    expect(withSrc().length).toBeLessThanOrEqual(2);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Show Pomeranian' }));
    await waitFor(() => expect(withSrc().length).toBeGreaterThanOrEqual(3));
  });
});
