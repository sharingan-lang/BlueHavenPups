import { Link } from 'react-router-dom';
import { Reveal, stagger } from '@/components/Reveal';
import { Band } from '@/components/Band';
import { PhotoImg } from '@/components/PhotoImg';
import { srcSet } from '@/lib/images';
import { ABOUT_IMAGE } from '@/data/breeds';
import { ABOUT_STEPS } from '@/data/content';
import { REGISTRY, SHOW_SAMPLE_BADGE, SITE } from '@/data/site';
import { META } from '@/data/meta';
import { crumbs, usePageMeta } from '@/hooks/usePageMeta';

export default function About() {
  const m = META.about;
  usePageMeta({ ...m, jsonLd: [crumbs(m.label, m.path)] });
  return (
    <>
      <section className="wrap pt-[clamp(2rem,6vw,4.5rem)] pb-section">
        <p className="eyebrow" {...stagger(0)}>About</p>
        <h1 className="ph max-w-[14ch]" {...stagger(1)}>A small kennel with an open living room</h1>
        <p className="lead max-w-xl !text-[clamp(1.15rem,1rem+.7vw,1.45rem)] !mt-6" {...stagger(2)}>
          Our puppies live in the middle of the household, not in outdoor runs or cages. They get used to children, vacuum cleaners, kitchen sounds and visitors long before they meet you.
        </p>
      </section>

      <section className="wrap" aria-labelledby="weeks">
        <Reveal as="h2" className="mb-[clamp(1.5rem,4vw,3rem)]"><span id="weeks">A puppy’s first {SITE.readyWeeks} weeks</span></Reveal>
        {ABOUT_STEPS.map((s, i) => (
          <Reveal key={s.t} i={i} className="step grid gap-x-12 gap-y-2 py-[clamp(1.25rem,3vw,2rem)] md:grid-cols-[15rem_minmax(0,1fr)] md:items-baseline">
            <h3>{s.t}</h3><p className="m-0 max-w-[38rem] text-muted">{s.d}</p>
          </Reveal>
        ))}
      </section>

      <section className="wrap grid gap-[clamp(2rem,5vw,4rem)] py-section md:grid-cols-[5fr_7fr] md:items-start">
        <Reveal className="leaf relative aspect-[4/5] w-full max-w-[460px] md:sticky md:top-26">
          <PhotoImg src={ABOUT_IMAGE.src} srcSet={srcSet(ABOUT_IMAGE.src, [480])} sizes="(min-width: 47.5em) 40vw, calc(100vw - 40px)" width={800} height={1000} alt={ABOUT_IMAGE.alt} />
          {SHOW_SAMPLE_BADGE && <span className="sample !left-5 !right-auto !bottom-5">Sample photo</span>}
        </Reveal>
        <div>
          <Reveal as="p" className="eyebrow">How we work</Reveal>
          <Reveal className="say"><b>We health-test the parents before we plan a litter.</b><span>Screening comes first, and our {REGISTRY.short}-registered lines are documented, so you start with the best odds we can give you.</span></Reveal>
          <Reveal className="say"><b>We talk to every family before a puppy is promised.</b><span>We place puppies with households we have spoken to, so the match is right for the puppy and for you.</span></Reveal>
          <Reveal className="say"><b>You get our advice for the life of your dog.</b><span>Pickup day is the start of the relationship, not the end of it.</span></Reveal>
        </div>
      </section>

      <section className="wrap pb-section">
        <Reveal className="card mist max-w-4xl">
          <p className="eyebrow">What we ask of you</p>
          <h3>Every puppy goes to a family companion home</h3>
          <p>Our puppies are companions. We ask that they live indoors with the family and are spayed or neutered on your vet’s schedule, as set out in our pet-only agreement. The full details are on the health page.</p>
          <div className="go"><Link className="textlink" to="/health" viewTransition>See the health guarantee</Link></div>
        </Reveal>
      </section>

      <Band title="Curious about something we did not cover?" text="Ask us anything about our puppies, our home or how a handover works." to="/contact" cta="Start a conversation" />
    </>
  );
}
