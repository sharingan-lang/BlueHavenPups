# Blue Haven Pups

Home-raised toy puppies from a small boutique breeder. Vite 7, React 19, TypeScript, Tailwind CSS v4, React Router 7.

```bash
npm install
npm run dev        # http://localhost:5173
npm run ci         # typecheck + tests + production build (what GitHub Actions runs)
npm run preview    # serve dist/ on :4173
npm run e2e        # Playwright, needs: npx playwright install chromium
```

Requires Node 20 or newer (`.nvmrc`).

## Deploy: GitHub, then Vercel

1. **Create an empty repository** on GitHub (no README, no .gitignore).
2. **Push this folder:**
   ```bash
   git init -b main
   git add .
   git commit -m "Blue Haven Pups"
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
3. **Import it in Vercel:** Add New > Project > pick the repo. Vercel detects Vite; `vercel.json` already sets the build command, output folder, SPA rewrite, cache headers and security headers. Click Deploy. No environment variables are required.
4. **Custom domain:** add it under Project Settings > Domains, then set `VITE_SITE_URL` (for example `https://www.yourdomain.com`) under Environment Variables and redeploy. That value drives canonical links, Open Graph tags, `sitemap.xml` and `robots.txt`. Without it, the site uses your `*.vercel.app` production domain.

What happens automatically:
- Every push to `main` deploys to production. Every pull request gets its own preview URL.
- Preview deployments serve a `robots.txt` that disallows crawling, so they never get indexed.
- GitHub Actions (`.github/workflows/ci.yml`) typechecks, tests and builds on every push and pull request. The browser tests run only when started by hand from the Actions tab.
- Unknown URLs fall back to `index.html`, and the app shows its own 404 page with `noindex`.

## Where to edit content

| What | File |
| --- | --- |
| Breeds (drives the nav dropdown, filter tabs, finder and contact form) | `src/data/breeds.ts` > `BREEDS` |
| Hero rotator: breed, tagline, photo | `src/data/breedAssets.ts` > `BREED_ASSETS` |
| Available puppies (shown on the Puppies page) | `src/data/breeds.ts` > `PUPPIES` |
| Name, email, phone, ready-age, warranty, registry | `src/data/site.ts` |
| FAQ, reviews, health terms, about steps | `src/data/content.ts` |
| Page titles and descriptions | `src/data/meta.ts` |
| Future "Our Puppies" grid (inactive) | `src/data/futurePuppies.ts` and `src/components/PuppiesGridHook.tsx` |
| Colours, fonts, radii, motion, breakpoints | `@theme` block at the top of `src/index.css` |

Photos live in `public/img/`. Each full-size photo (800px wide, WebP) needs two smaller copies so phones don't download desktop-sized images: `name-480.webp`, and `name-160.webp` for breed card photos in `public/img/pups/`. After adding or replacing a photo, run `python3 scripts/make-variants.py` (needs `pip install pillow`). Breed photos represent breeds only (hero rotator and breed finder). Individual puppies get their own photos when you add them to `PUPPIES`; until then they show a "Photo coming soon" tile.

## Responsive design and performance

Tested in real Chromium at 19 screen sizes (320px phones to 2560px monitors, including landscape phones and tablets) with no sideways scrolling, no tap target under 44px and no text under 12px.

- Layout steps at 640px, 760px (tablets get two-column hero, breed finder, About and Contact), 900px (full desktop nav) and 1312px.
- Images use `srcset`, so a phone gets the small file. The hero loads one photo up front and fetches the next one ahead of the rotation. The breed finder loads each photo only when you reach it.
- Layout shift is about zero, and the hero photo is the largest paint at roughly 0.2 to 0.4s on a local build.
- Motion respects `prefers-reduced-motion`. Hover effects only apply to devices with a real pointer.

Tests: `npm test` (31 unit tests), `npm run e2e` (Playwright: 3 profiles, Chromium only). If Playwright can't download a browser, set `PW_CHROMIUM_PATH` to an installed Chromium.

## Before you launch

- [ ] **Contact details are placeholders:** `adoptions@bluehavenpups.com` and `+1 (800) 492-7164` in `src/data/site.ts`. The contact form opens the visitor's email app or WhatsApp, so a wrong address means lost enquiries.
- [ ] **Sample content:** the six puppies, their prices, the reviews, and the contract and warranty wording are placeholders. Replace them with real, true ones. Reviews must be real, attributable reviews.
- [ ] **Registry and health claims** (AKC-registered litters, health-tested parents, 24-month warranty) must be true for your program.
- [ ] **Photo rights:** confirm you own or are licensed to use every photo in `public/img/`. See the notes at the top of `src/data/breedAssets.ts`.
- [ ] **Domain:** attach it in Vercel and set `VITE_SITE_URL`.
- [ ] **Link preview:** after deploying, check the share image at `/og-image.png` and test a link in a messaging app.

## Notes

- The site is a single-page app. Page titles, descriptions and structured data are set per route in the browser. Search engines that run JavaScript (Google, Bing) read them. If you later want server-rendered HTML, a prerender step (for example `vite-react-ssg`) is the usual route.
- The contact form has no server. It builds a `mailto:` or WhatsApp message.
- No Content-Security-Policy header is set, because `index.html` has one small inline script. Add a CSP with a hash for it if you want one.
