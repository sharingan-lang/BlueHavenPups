import { useId } from 'react';
import { SITE } from '@/data/site';

const SOFA = 'M15,40H81A5,5 0 0 1 86,45V66A5,5 0 0 1 81,71H15A5,5 0 0 1 10,66V45A5,5 0 0 1 15,40ZM7,47H13A5,5 0 0 1 18,52V66A5,5 0 0 1 13,71H7A5,5 0 0 1 2,66V52A5,5 0 0 1 7,47ZM83,47H89A5,5 0 0 1 94,52V66A5,5 0 0 1 89,71H83A5,5 0 0 1 78,66V52A5,5 0 0 1 83,47Z';
const STRIPES = [6, 15, 24, 33, 42, 51, 60, 69, 78, 87];

/**
 * Mark: a puppy peeking over a ticking-striped sofa back. Colours come from CSS variables
 * (--lg-sofa, --lg-stripe, --lg-head, --lg-ink, --lg-ear) so the footer can invert it.
 */
export function LogoMark() {
  const id = useId();
  return (
    <svg viewBox="0 0 96 74" aria-hidden="true" focusable="false">
      <defs><clipPath id={id}><path d={SOFA} /></clipPath></defs>
      <path className="lg-ear" d="M31 21C22 20 17 29 19 40C20 45 27 44 30 37Z" />
      <path className="lg-ear" d="M65 21C74 20 79 29 77 40C76 45 69 44 66 37Z" />
      <path className="lg-head" d="M48 11C60 11 67 19 67 29C67 40 59 46 48 46C37 46 29 40 29 29C29 19 36 11 48 11Z" />
      <circle className="lg-ink" cx="40.5" cy="27" r="2.3" />
      <circle className="lg-ink" cx="55.5" cy="27" r="2.3" />
      <path className="lg-ink" d="M44 33.2C44 31.8 45.8 31.2 48 31.2C50.2 31.2 52 31.8 52 33.2C52 35 49.8 36.4 48 36.4C46.2 36.4 44 35 44 33.2Z" />
      <path className="lg-sofa" d={SOFA} />
      <g clipPath={`url(#${id})`} className="lg-stripe" fillOpacity=".26">
        {STRIPES.map((x) => <rect key={x} x={x} y="38" width="2.6" height="36" />)}
      </g>
      <ellipse className="lg-head" cx="38" cy="40.5" rx="6" ry="3.4" />
      <ellipse className="lg-head" cx="58" cy="40.5" rx="6" ry="3.4" />
    </svg>
  );
}

export function Brand() {
  return (
    <>
      <LogoMark />
      <span className="brand-text" aria-hidden="true">Blue Haven Pups</span>
      <span className="sr-only">{SITE.name}</span>
    </>
  );
}
