import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { Brand } from './Logo';
import { BREEDS } from '@/data/breeds';
import { money } from '@/lib/format';
import { NAV_CTA, NAV_PAGES, SITE } from '@/data/site';

/** Sticky header. "Our Puppies" has a breed dropdown generated from BREEDS. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [breedsOpen, setBreedsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const caretBtn = useRef<HTMLButtonElement>(null);
  const { pathname, search } = useLocation();
  const [params] = useSearchParams();
  const activeBreed = pathname === '/puppies' ? params.get('breed') : null;

  useEffect(() => { setOpen(false); setBreedsOpen(false); }, [pathname, search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (breedsOpen) { setBreedsOpen(false); caretBtn.current?.focus(); }
      else if (open) { setOpen(false); menuBtn.current?.focus(); }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (breedsOpen && !groupRef.current?.contains(t)) setBreedsOpen(false);
      if (open && !headerRef.current?.contains(t)) setOpen(false);
    };
    const mq = window.matchMedia?.('(min-width:56.25em)');
    const onMq = () => { if (mq?.matches) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    mq?.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
      mq?.removeEventListener('change', onMq);
    };
  }, [open, breedsOpen]);

  return (
    <header ref={headerRef} className={`site-header ${open ? 'open' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap bar">
        <Link className="brand" to="/" viewTransition aria-label={`${SITE.name} home`}><Brand /></Link>
        <button ref={menuBtn} className="menu-btn" type="button" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((v) => !v)}>
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="site-nav" className="nav" aria-label="Main">
          {NAV_PAGES.map((p) =>
            p.to === '/puppies' ? (
              <div key={p.to} className="navgroup" ref={groupRef}>
                <NavLink className="navlink" to={p.to} viewTransition>{p.label}</NavLink>
                <button ref={caretBtn} className="caret" type="button" aria-expanded={breedsOpen} aria-controls="breed-menu" aria-label="Browse puppies by breed" onClick={() => setBreedsOpen((v) => !v)}>
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 5l4.5 4.5L11.5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <ul id="breed-menu" className="breed-menu" hidden={!breedsOpen} aria-label="Breeds">
                  <li><Link to="/puppies" viewTransition aria-current={pathname === '/puppies' && !activeBreed ? 'true' : undefined}>All puppies</Link></li>
                  {BREEDS.map((b) => (
                    <li key={b.slug}>
                      <Link to={`/puppies?breed=${encodeURIComponent(b.name)}`} viewTransition aria-current={activeBreed === b.name ? 'true' : undefined}>
                        {b.name} <small>from {money(b.from)}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <NavLink key={p.to} className="navlink" to={p.to} viewTransition>{p.label}</NavLink>
            ),
          )}
          <Link className="btn sm" to={NAV_CTA.to} viewTransition>{NAV_CTA.label}</Link>
        </nav>
      </div>
    </header>
  );
}
