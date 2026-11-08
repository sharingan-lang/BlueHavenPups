import { Reveal, stagger } from '@/components/Reveal';
import { Band } from '@/components/Band';
import { REVIEWS } from '@/data/content';
import { META } from '@/data/meta';
import { crumbs, usePageMeta } from '@/hooks/usePageMeta';

export default function Reviews() {
  const m = META.reviews;
  usePageMeta({ ...m, jsonLd: [crumbs(m.label, m.path)] });
  const [feature, ...notes] = REVIEWS;
  return (
    <>
      <section className="wrap pt-[clamp(2rem,6vw,4.5rem)] pb-[clamp(2.5rem,6vw,4.5rem)]">
        <p className="eyebrow" {...stagger(0)}>Reviews</p>
        <h1 className="ph max-w-[13ch]" {...stagger(1)}>Notes from families after pickup day</h1>
        <p className="lead max-w-xl !text-[clamp(1.15rem,1rem+.7vw,1.45rem)] !mt-6" {...stagger(2)}>What households have said about bringing a puppy home.</p>
      </section>

      <section className="wrap" aria-label="Featured review">
        <Reveal as="figure" className="feature mb-section max-w-[52rem] m-0">
          <blockquote>“{feature.quote}”</blockquote>
          <figcaption><b>{feature.name}</b><span>{feature.meta}</span></figcaption>
        </Reveal>
      </section>

      <section className="wrap columns-1 gap-tile pb-section md:columns-2" aria-label="More reviews">
        {notes.map((r, i) => (
          <Reveal key={r.name} as="figure" i={i % 2} className="note seam mb-tile grid break-inside-avoid gap-5 pt-7 pb-8">
            <blockquote>“{r.quote}”</blockquote>
            <figcaption><b>{r.name}</b><span>{r.meta}</span></figcaption>
          </Reveal>
        ))}
      </section>

      <Band title="Taken a puppy home? Tell us how it went." text="We love hearing how every puppy settles in." to="/contact" cta="Share your story" />
    </>
  );
}
