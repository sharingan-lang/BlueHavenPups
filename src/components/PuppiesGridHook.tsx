import { Link } from 'react-router-dom';
import { contactRoute, FUTURE_PUPPIES_LIMIT, type FuturePuppy } from '@/data/futurePuppies';
import { money } from '@/lib/format';

interface Props { items: readonly FuturePuppy[]; enabled?: boolean }

/**
 * Inactive placeholder for the future "Our Puppies" section. Renders nothing until `enabled`
 * is true AND items exist. Ready for six cards with prices, purchase buttons and contact routing.
 */
export function PuppiesGridHook({ items, enabled = false }: Props) {
  if (!enabled || items.length === 0) return null;
  return (
    <section className="wrap py-section" aria-labelledby="our-puppies-grid">
      <h2 id="our-puppies-grid" className="mb-10">Our puppies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.slice(0, FUTURE_PUPPIES_LIMIT).map((p) => (
          <article key={p.id} className="card">
            <div className="leaf aspect-[4/3]"><img src={p.image} alt={`${p.name}, a ${p.breed} puppy`} width={800} height={600} loading="lazy" /></div>
            <h3>{p.name}</h3>
            <p>{p.breed}</p>
            <div className="mt-auto flex items-center justify-between gap-4">
              <span className="price">{p.status === 'Available' ? money(p.priceUsd) : 'Reserved'}</span>
              {p.status === 'Available'
                ? <Link className="btn sm" to={contactRoute(p)}>Ask about {p.name}</Link>
                : <span className="btn sm off">Reserved</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
