import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';

/** Closing call-to-action band used at the foot of every page. */
export function Band({ title, text, to, cta, children }: { title: string; text: string; to: string; cta: string; children?: ReactNode }) {
  return (
    <section className="wrap pb-section">
      <Reveal className="band dark-field on-dark">
        <div><h2>{title}</h2><p>{text}</p>{children}</div>
        <Link className="btn light" to={to} viewTransition>{cta}</Link>
      </Reveal>
    </section>
  );
}
