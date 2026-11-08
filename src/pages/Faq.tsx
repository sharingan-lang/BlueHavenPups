import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal, stagger } from '@/components/Reveal';
import { Band } from '@/components/Band';
import { FAQ } from '@/data/content';
import { META } from '@/data/meta';
import { usePageMeta, crumbs } from '@/hooks/usePageMeta';

export default function Faq() {
  const m = META.faq;
  usePageMeta({
    ...m,
    jsonLd: [
      crumbs(m.label, m.path),
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  });
  const [query, setQuery] = useState('');
  const term = query.trim().toLowerCase();
  const shown = useMemo(() => FAQ.map((f) => !term || (f.q + ' ' + f.a).toLowerCase().includes(term)), [term]);
  const count = shown.filter(Boolean).length;

  return (
    <>
      <section className="wrap grid gap-[clamp(2rem,5vw,4rem)] pt-[clamp(2rem,6vw,4.5rem)] pb-section lg:grid-cols-[5fr_7fr] lg:items-start">
        <div className="lg:sticky lg:top-26">
          <p className="eyebrow" {...stagger(0)}>FAQ</p>
          <h1 className="ph max-w-[12ch]" {...stagger(1)}>Answers before you ask</h1>
          <p className="lead" {...stagger(2)}>Preparing your home, travel, food and paperwork, explained plainly.</p>
          <div className="mt-8" {...stagger(3)}>
            <label htmlFor="find">Search the questions</label>
            <input id="find" type="search" placeholder="Try “flight” or “vaccinations”" autoComplete="off" value={query} onChange={(e) => setQuery(e.target.value)} />
            <p id="left" className="mt-3 mb-0 min-h-[1.4em] font-display text-sm font-semibold text-muted" aria-live="polite">
              {term ? `Showing ${count} of ${FAQ.length} questions` : ''}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-[.9rem]" id="list">
          {FAQ.map((f, i) => (
            <Reveal as="details" key={f.q} i={Math.min(i, 4)} className="q" {...(shown[i] ? {} : { hidden: true })}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </Reveal>
          ))}
          {count === 0 && (
            <p id="none" className="text-[1.15rem]">No answer matches that yet. <Link className="underline" to="/contact">Ask us directly</Link> and we will help.</p>
          )}
        </div>
      </section>
      <Band title="Still wondering about something?" text="Ask us anything about our puppies, our home or how a handover works." to="/contact" cta="Start a conversation" />
    </>
  );
}
