import { Link, useSearchParams } from 'react-router-dom';
import { stagger } from '@/components/Reveal';
import { Band } from '@/components/Band';
import { PuppyRow } from '@/components/PuppyRow';
import { BREEDS, PUPPIES, isBreedName } from '@/data/breeds';
import { SHOW_SAMPLE_BADGE, SITE } from '@/data/site';
import { META } from '@/data/meta';
import { crumbs, usePageMeta } from '@/hooks/usePageMeta';
import { money } from '@/lib/format';

export default function Puppies() {
  const m = META.puppies;
  usePageMeta({ ...m, jsonLd: [crumbs(m.label, m.path)] });
  const [params, setParams] = useSearchParams();
  const q = params.get('breed');
  const active = isBreedName(q) ? q : 'All';
  const info = BREEDS.find((b) => b.name === active);
  const list = PUPPIES.filter((p) => active === 'All' || p.breed === active);
  const countFor = (name: string) => (name === 'All' ? PUPPIES.length : PUPPIES.filter((p) => p.breed === name).length);

  const pick = (name: string) => {
    const next = new URLSearchParams(params);
    if (name === 'All') next.delete('breed'); else next.set('breed', name);
    setParams(next, { replace: true });
  };

  return (
    <>
      <section className="wrap pt-[clamp(2.5rem,6vw,5rem)] pb-section">
        <p className="eyebrow" {...stagger(0)}>Puppies</p>
        <h1 className="ph max-w-[16ch]" {...stagger(1)}>Who is ready to come home</h1>
        <p className="lead" {...stagger(2)}>
          Updated by hand. Reserved puppies stay listed until they go home at {SITE.readyWeeks} weeks or older.
          {SHOW_SAMPLE_BADGE && ' Photos shown are samples.'}
        </p>
        <div className="tabs mt-10" id="filters" role="group" aria-label="Filter by breed" {...stagger(3)}>
          {['All', ...BREEDS.map((b) => b.name)].map((n) => (
            <button key={n} type="button" className="chip" data-b={n} aria-pressed={n === active} onClick={() => pick(n)}>
              {n}<sup aria-hidden="true">{countFor(n)}</sup>
            </button>
          ))}
        </div>
        {info && (
          <p id="breedbox" className="ctx mt-6">
            <b>{info.name}.</b> {info.text} {info.size}. {info.coat}. Puppies from {money(info.from)}.
          </p>
        )}
        <p id="count" className="mt-8 mb-3 text-sm font-semibold text-muted tabular-nums" aria-live="polite">
          {list.length ? `Showing ${list.length} ${list.length === 1 ? 'puppy' : 'puppies'}` : ''}
        </p>
        <h2 className="sr-only">Available puppies</h2>
        {list.length ? (
          <ul className="pups" id="kgrid">{list.map((p) => <PuppyRow key={p.name} puppy={p} />)}</ul>
        ) : (
          <p className="text-xl">
            {active === 'All' ? 'No puppies are listed right now.' : `No ${active} puppies right now.`}{' '}
            <Link to="/contact?puppy=Waiting%20list" className="textlink">Join the waiting list</Link> and we will write when a litter is on the way.
          </p>
        )}
      </section>
      <Band title="Nothing right yet? Join the waiting list." text="Tell us the breed and a rough timeline and we will write when a litter is on the way." to="/contact?puppy=Waiting%20list" cta="Join the waiting list" />
    </>
  );
}
