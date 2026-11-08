import { Reveal, stagger } from '@/components/Reveal';
import { Band } from '@/components/Band';
import { HEALTH_ASK, HEALTH_PROVIDE } from '@/data/content';
import { META } from '@/data/meta';
import { crumbs, usePageMeta } from '@/hooks/usePageMeta';

const terms = 'mt-[clamp(1.5rem,4vw,3rem)] grid gap-[clamp(1.5rem,3.5vw,2.5rem)]';
const term = 'term grid gap-x-12 gap-y-[.4rem] md:grid-cols-[minmax(14rem,20rem)_minmax(0,1fr)] md:items-baseline';

export default function Health() {
  const m = META.health;
  usePageMeta({ ...m, jsonLd: [crumbs(m.label, m.path)] });
  return (
    <>
      <section className="wrap pt-[clamp(2rem,6vw,4.5rem)] pb-[clamp(2.5rem,6vw,4rem)]">
        <p className="eyebrow" {...stagger(0)}>Health</p>
        <h1 className="ph max-w-[14ch]" {...stagger(1)}>What our guarantee covers</h1>
        <p className="lead max-w-xl !text-[clamp(1.15rem,1rem+.7vw,1.45rem)] !mt-6" {...stagger(2)}>
          A written warranty, a vet check after arrival and health-tested parents. Here is what we provide with every puppy, and what we ask of you in return.
        </p>
      </section>

      <section className="wrap pb-section" aria-labelledby="give">
        <Reveal as="h2"><span id="give">What we provide</span></Reveal>
        <div className={terms}>
          {HEALTH_PROVIDE.map((t, i) => (
            <Reveal key={t.h} i={i} className={term}><h3>{t.h}</h3><p>{t.p}</p></Reveal>
          ))}
        </div>
      </section>

      <section className="wrap pb-section" aria-labelledby="ask">
        <div className="rounded-[10px] ticking-field p-[min(clamp(1.75rem,5vw,4rem),8vw)]">
          <Reveal as="h2"><span id="ask">What we ask of you</span></Reveal>
          <div className={terms}>
            {HEALTH_ASK.map((t, i) => (
              <Reveal key={t.h} i={i} className={term}><h3>{t.h}</h3><p>{t.p}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap pb-section" aria-labelledby="contract">
        <Reveal className="promise grid max-w-[52rem] gap-4 rounded-[10px] border-2 border-indigo p-[clamp(1.5rem,4vw,2.75rem)]">
          <p className="eyebrow">Before you pay a deposit</p>
          <p className="big" id="contract">Read the full warranty contract first.</p>
          <p>If anything on this page differs from the contract, the contract applies.</p>
        </Reveal>
      </section>

      <Band title="Want the contract before you decide?" text="Ask us and we will talk you through it." to="/contact" cta="Start a conversation" />
    </>
  );
}
