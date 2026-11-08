import { expect, test } from '@playwright/test';

const ROUTES = ['/', '/puppies', '/about', '/health', '/reviews', '/faq', '/contact'];
const BREEDS = ['Yorkie', 'Maltese', 'Poodle', 'Pomeranian', 'Chihuahua'];

for (const path of ROUTES) {
  test(`${path}: no horizontal scroll, one h1, brand text, SEO basics`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await expect(page.locator('.site-header .brand svg')).toBeVisible();
    await expect(page.locator('.footer')).toContainText('Blue Haven Pups');
    expect((await page.title()).length).toBeLessThanOrEqual(60);
    const desc = (await page.locator('meta[name="description"]').getAttribute('content')) ?? '';
    expect(desc.length).toBeGreaterThanOrEqual(120);
    expect(desc.length).toBeLessThanOrEqual(165);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /bluehavenpups\.com/);
    expect(await page.locator('body').innerText()).not.toMatch(/kitten|cattery|feline/i);
    expect(errors).toEqual([]);
  });
}

test('unknown route shows the 404 page with noindex', async ({ page }) => {
  await page.goto('/nope');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('could not find');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
});

test('mobile menu opens, closes on Escape, and links work', async ({ page, isMobile }) => {
  test.skip(!isMobile && (page.viewportSize()?.width ?? 0) >= 900, 'mobile and tablet only');
  await page.goto('/');
  const btn = page.locator('.menu-btn');
  await btn.click();
  await expect(btn).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(btn).toHaveAttribute('aria-expanded', 'false');
  await btn.click();
  await page.locator('#site-nav').getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(btn).toHaveAttribute('aria-expanded', 'false');
});

test('breed dropdown lists all five breeds and filters the puppy list', async ({ page }) => {
  await page.goto('/');
  if (await page.locator('.menu-btn').isVisible()) await page.locator('.menu-btn').click();
  await page.getByRole('button', { name: /browse puppies by breed/i }).click();
  const menu = page.locator('#breed-menu');
  for (const b of BREEDS) await expect(menu.getByRole('link', { name: new RegExp(b) })).toBeVisible();
  await menu.getByRole('link', { name: /Pomeranian/ }).click();
  await expect(page).toHaveURL(/\/puppies\?breed=Pomeranian/);
  await expect(page.getByRole('button', { name: 'Pomeranian' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#count')).toHaveText('Showing 1 puppy');
});

test('sticky header stays pinned while scrolling', async ({ page }) => {
  await page.goto('/faq');
  await page.mouse.wheel(0, 900);
  await expect(page.locator('.site-header')).toBeInViewport();
});

test('hero rotator never changes the layout height', async ({ page }) => {
  await page.goto('/');
  const box = page.locator('.hero h1');
  const h1 = (await box.boundingBox())!.height;
  await page.waitForTimeout(3600);
  expect((await box.boundingBox())!.height).toBe(h1);
});

test('puppy list filters and only offers available puppies', async ({ page }) => {
  await page.goto('/puppies');
  await expect(page.locator('.pup')).toHaveCount(6);
  await page.getByRole('button', { name: 'Maltese' }).click();
  await expect(page.locator('.pup')).toHaveCount(2);
  await expect(page.getByRole('link', { name: /Ask about Mochi/ })).toHaveCount(0);
});

test('contact pre-fills the selected puppy and validates', async ({ page }) => {
  await page.goto('/contact?puppy=Pepper');
  await expect(page.locator('#puppy')).toHaveValue('Pepper');
  await expect(page.locator('#ctx')).toContainText('Pepper');
  await page.getByRole('button', { name: /send by email/i }).click();
  await expect(page.locator('#name')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#name')).toBeFocused();
});

test('FAQ search narrows the list', async ({ page }) => {
  await page.goto('/faq');
  await page.locator('#find').fill('flight');
  await expect(page.locator('#left')).toContainText('Showing 1 of');
  await page.locator('#find').fill('zzzz');
  await expect(page.locator('#none')).toBeVisible();
});

test('touch targets are at least 44px on mobile', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only');
  await page.goto('/puppies');
  for (const el of await page.locator('.chip, .btn').all()) {
    const b = await el.boundingBox();
    if (b) expect(b.height).toBeGreaterThanOrEqual(43.5);
  }
});
