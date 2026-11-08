import { Link } from 'react-router-dom';
import { PhotoImg } from './PhotoImg';
import { SHOW_SAMPLE_BADGE } from '@/data/site';
import type { Puppy } from '@/data/breeds';
import { price, readyText } from '@/lib/format';

/** One puppy as a row you can compare at a glance. Stacks on phones. */
export function PuppyRow({ puppy: k }: { puppy: Puppy }) {
  const open = k.status === 'Available';
  return (
    <li>
      <article className={`pup ${open ? '' : 'is-reserved'}`}>
        <div className="pup-img fade-img">
          <PhotoImg src={k.image} width={400} height={400} alt={`${SHOW_SAMPLE_BADGE ? 'Sample photo for ' : 'Photo of '}${k.name}, a ${k.breed} puppy`} />
        </div>
        <div>
          <h3>{k.name} <span className="status"><span className={`dot ${open ? '' : 'hollow'}`} aria-hidden="true" />{k.status}</span></h3>
          <p className="breed">{k.breed}</p>
        </div>
        <div className="pup-info">
          <p className="mb-3">{k.blurb}</p>
          <dl>
            <dt>Sex</dt><dd>{k.sex}</dd>
            <dt>Age</dt><dd>{k.weeks} weeks</dd>
            <dt>Colour</dt><dd>{k.color}</dd>
            <dt>Home</dt><dd>{readyText(k.weeks)}</dd>
          </dl>
        </div>
        <div className="pup-act">
          <span className="price">{price(k)}</span>
          {open ? (
            <Link className="btn sm" to={`/contact?puppy=${encodeURIComponent(k.name)}`} viewTransition>Ask about {k.name}</Link>
          ) : (
            <span className="btn sm off">Reserved</span>
          )}
        </div>
      </article>
    </li>
  );
}
