import { Link, NavLink } from 'react-router-dom';
import { Brand } from './Logo';
import { NAV_CTA, NAV_PAGES, REGISTRY, SITE } from '@/data/site';

export function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="wrap foot">
        <div className="f-brand">
          <Link className="brand" to="/" aria-label={`${SITE.name} home`}><Brand /></Link>
          <p>A small family boutique breeder. Toy puppies raised in our home, from {REGISTRY.short}-registered litters, going home at {SITE.readyWeeks} weeks or older to family homes.</p>
        </div>
        <nav aria-label="Footer">
          <p className="f-h">Explore</p>
          <div className="f-links">
            <NavLink to="/" end>Home</NavLink>
            {[...NAV_PAGES, NAV_CTA].map((p) => <NavLink key={p.to} to={p.to}>{p.label}</NavLink>)}
          </div>
        </nav>
        <div>
          <p className="f-h">Get in touch</p>
          <div className="f-links one">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`tel:${SITE.phone.replace(/[^\d+]/g, '')}`}>{SITE.phone}</a>
          </div>
        </div>
        <p className="f-legal">© {SITE.year} {SITE.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
