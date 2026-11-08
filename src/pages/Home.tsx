import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Band } from '@/components/Band';
import { BreedClockProvider } from '@/components/hero/BreedClockProvider';
import { HeroBreedName, HeroTagline } from '@/components/hero/HeroText';
import { HeroImageShowcase } from '@/components/hero/HeroImageShowcase';
import { HealthPreview } from '@/components/HealthPreview';
import { PuppiesGridHook } from '@/components/PuppiesGridHook';
import { FUTURE_PUPPIES } from '@/data/futurePuppies';
import { BREEDS, PUPPIES } from '@/data/breeds';
import { ABOUT_STEPS, REVIEWS } from '@/data/content';
import { REGISTRY, SHOW_SAMPLE_BADGE, SITE } from '@/data/site';
import { META } from '@/data/meta';
import { usePageMeta } from '@/hooks/usePageMeta';
import { money } from '@/lib/format';
import { srcSet, variantSrc } from '@/lib/images';

const line = (i: number) => ({ '--i': i }) as CSSProperties;
const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export default function Home() {
  const m = META.home;
  usePageMeta({
    ...m,
    jsonLd: [{
      '@context': 'https://schema.org', '@type': 'Organization', name: SITE.name, url: SITE.url,
      logo: SITE.url + '/icon-512.png', email: SITE.email, telephone: SITE.phone,
      description: `Small family boutique breeder of Yorkie, Maltese, Poodle, Pomeranian and Chihuahua puppies. ${REGISTRY.short}-registered litters.`,
    }],
  });
  const [sel, setSel] = useState(0);
  // Plate photos load one at a time, as breeds are hovered or focused.
  const [seen, setSeen] = useState<ReadonlySet<number>>(() => new Set([0]));
  const pick = (k: number) => { setSel(k); setSeen((prev) => (prev.has(k) ? prev : new Set([...prev, k]))); };
  const breed = BREEDS[sel];
  const ready = PUPPIES.filter((p) => p.status === 'Available');
  const reserved = PUPPIES.length - ready.length;
  const readyIn = (name: string) => ready.filter((p) => p.breed === name).length;
  const review = REVIEWS[0];

  return (
    <>
      {/* 1. Hero: one shared clock; name, tagline and photo subscribe independently */}
      <BreedClockProvider>
        <section className="hero wrap grid items-center gap-x-10 gap-y-10 pt-[clamp(2rem,5vw,4rem)] pb-[clamp(2.5rem,5vw,4rem)] md:grid-cols-[minmax(0,1.45fr)_minmax(0,.8fr)] lg:gap-x-16 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,.75fr)]">
          <div className="hero-copy">
            <h1>
              <span className="rot-line"><HeroBreedName /></span>
              <span className="line sub"><span style={line(1)}>puppies raised on our sofa, not in a kennel run.</span></span>
            </h1>
            <HeroTagline />
            <p className="lead max-w-[34rem]" data-s style={line(4)}>
              Born in our living room, handled daily from the first week, and placed only with families we have spoken to.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3" data-s style={line(5)}>
              <Link className="btn" to="/puppies" viewTransition>See who is ready to come home</Link>
              <Link className="textlink" to="/about" viewTransition>How we raise them</Link>
            </div>
          </div>
          <HeroImageShowcase />
        </section>
      </BreedClockProvider>

      {/* 2. Right now: live from PUPPIES */}
      <div className="wrap">
        <div className="now seam">
          <p><span className="dot" aria-hidden="true" />{plural(ready.length, 'puppy is', 'puppies are')} ready to go home</p>
          {reserved > 0 && <p><span className="dot hollow" aria-hidden="true" />{reserved} reserved</p>}
          <Link className="textlink ml-auto" to="/contact?puppy=Waiting%20list" viewTransition>Join the waiting list for the next litter</Link>
        </div>
      </div>

      {/* 3. Breed finder */}
      <section className="wrap py-section" aria-labelledby="breeds">
        <div className="mb-[clamp(2rem,5vw,3.5rem)] max-w-2xl">
          <p className="eyebrow">The breeds</p>
          <h2 id="breeds">Five toy breeds. Find the one that fits your home.</h2>
        </div>
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] md:gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-start">
          <ul className="finder-list">
            {BREEDS.map((b, k) => (
              <li key={b.slug}>
                <Link to={`/puppies?breed=${encodeURIComponent(b.name)}`} data-active={k === sel} onMouseEnter={() => pick(k)} onFocus={() => pick(k)} viewTransition>
                  <img src={variantSrc(b.image, 160)} srcSet={`${variantSrc(b.image, 160)} 160w, ${variantSrc(b.image, 480)} 480w`} sizes="64px" alt="" width={64} height={64} loading="lazy" decoding="async" />
                  <span className="nm">{b.name}</span>
                  <span className="fr">from {money(b.from)}</span>
                  <span className="tx">{b.text}</span>
                </Link>
              </li>
            ))}
          </ul>
          <aside className="finder-plate hidden md:block" aria-label={`${breed.name} at a glance`} aria-live="polite">
            <div className="ph-img">
              {BREEDS.map((b, k) => <img key={b.slug} src={seen.has(k) ? variantSrc(b.image, 480) : undefined} srcSet={seen.has(k) ? srcSet(b.image, [480]) : undefined} sizes="(min-width: 56.25em) 480px, 330px" alt="" width={800} height={600} loading="lazy" decoding="async" style={{ opacity: k === sel ? 1 : 0 }} />)}
              {SHOW_SAMPLE_BADGE && <span className="sample">Sample photo</span>}
            </div>
            <dl>
              <dt>Adult size</dt><dd>{breed.size}</dd>
              <dt>Coat care</dt><dd>{breed.coat}</dd>
              <dt>Ready now</dt><dd>{readyIn(breed.name) ? plural(readyIn(breed.name), 'puppy', 'puppies') : 'None right now'}</dd>
              <dt>Price</dt><dd>From {money(breed.from)}</dd>
            </dl>
            <Link className="btn w-full" to={`/puppies?breed=${encodeURIComponent(breed.name)}`} viewTransition>See {breed.name} puppies</Link>
          </aside>
        </div>
      </section>

      {/* 4. First twelve weeks: a real sequence, with a scroll-linked rail */}
      <section className="ticking-field py-section" aria-labelledby="weeks">
        <div className="wrap grid gap-12 lg:grid-cols-[5fr_7fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Before they meet you</p>
            <h2 id="weeks">A puppy’s first {SITE.readyWeeks} weeks</h2>
            <p className="lead">By the time you visit, your puppy already knows the kettle, the doorbell and being picked up.</p>
            <Link className="textlink" to="/about" viewTransition>Read how we raise them</Link>
          </div>
          <ol className="tl">
            {ABOUT_STEPS.map((s, i) => (
              <li key={s.t} data-n={i + 1}><h3>{s.t}</h3><p>{s.d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Terms, as a table */}
      <section className="wrap py-section" aria-labelledby="terms">
        <div className="grid gap-12 lg:grid-cols-[4fr_8fr]">
          <div>
            <p className="eyebrow">Before any deposit</p>
            <h2 id="terms">What you get, in writing</h2>
            <p className="lead">Every promise below is in the contract we send you first.</p>
            <HealthPreview />
          </div>
          <dl className="terms">
            <div><dt>Registry</dt><dd>{REGISTRY.short}-registered litters<small>Pedigree and registration paperwork come home with your puppy.</small></dd></div>
            <div><dt>Going home</dt><dd>{SITE.readyWeeks} weeks or older<small>Weaned, vaccinated, microchipped and vet-checked first.</small></dd></div>
            <div><dt>Health warranty</dt><dd>{SITE.warrantyMonths} months<small>Written cover for verified hereditary conditions.</small></dd></div>
            <div><dt>Your own vet</dt><dd>72 hours to examine<small>Take your puppy to any vet within three days of pickup.</small></dd></div>
            <div><dt>Who we sell to</dt><dd>Families, never pet stores<small>No brokers, no resellers. We talk to every household first.</small></dd></div>
          </dl>
        </div>
      </section>

      {/* 6. One real voice */}
      <section className="wrap pb-section" aria-label="What a family said">
        <figure className="pull">
          <blockquote>{review.quote}</blockquote>
          <figcaption><b>{review.name}</b><span>{review.meta}</span></figcaption>
        </figure>
        <Link className="textlink mt-6" to="/reviews" viewTransition>Read more from families</Link>
      </section>

      {/* FUTURE: Our Puppies Section Hook */}
      <PuppiesGridHook items={FUTURE_PUPPIES} enabled={false} />

      <Band title="Not sure which puppy fits? Tell us about your home." text="We would rather help you wait for the right puppy than rush the wrong one." to="/contact" cta="Start a conversation" />
    </>
  );
}
