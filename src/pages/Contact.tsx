import { useRef, useState, type FormEvent } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Reveal, stagger } from '@/components/Reveal';
import { BREEDS, PUPPIES } from '@/data/breeds';
import { SITE } from '@/data/site';
import { META } from '@/data/meta';
import { crumbs, usePageMeta } from '@/hooks/usePageMeta';
import { digits, money } from '@/lib/format';

/** Options for the "Selected puppy" select, built from the central arrays. */
export const PUPPY_OPTIONS = [
  'Not sure yet',
  'Waiting list',
  ...PUPPIES.filter((p) => p.status === 'Available').map((p) => p.name),
  ...BREEDS.map((b) => `Any ${b.name}`),
];

const rules = {
  name: (v: string) => (v.trim() ? '' : 'Add your name so we know who we are writing to.'),
  email: (v: string) => (/^\S+@\S+\.\S+$/.test(v.trim()) ? '' : 'Check your email address. It should look like name@example.com.'),
};
type Field = keyof typeof rules;

function ContactForm({ initial }: { initial: string }) {
  const [vals, setVals] = useState({ name: '', email: '', msg: '', puppy: initial });
  const [errors, setErrors] = useState<Record<Field, string>>({ name: '', email: '' });
  const [status, setStatus] = useState<{ text: string; n: number } | null>(null);
  const refs = { name: useRef<HTMLInputElement>(null), email: useRef<HTMLInputElement>(null) };

  const picked = PUPPIES.find((p) => p.name === vals.puppy);
  const asking = vals.puppy === initial && initial !== PUPPY_OPTIONS[0];

  const check = () => {
    const next = { name: rules.name(vals.name), email: rules.email(vals.email) };
    setErrors(next);
    const firstBad = (['name', 'email'] as Field[]).find((f) => next[f]);
    if (firstBad) refs[firstBad].current?.focus();
    return !firstBad;
  };
  const body = () => `Hello ${SITE.name}, I am interested in: ${vals.puppy}.\n\n${vals.msg.trim()}\n\n${vals.name.trim()}\n${vals.email.trim()}`;
  const say = (text: string) => setStatus((s) => ({ text, n: (s?.n ?? 0) + 1 }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!check()) return;
    say(`Your email app should open with your message ready. If nothing happens, write to ${SITE.email} instead.`);
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Puppy enquiry: ' + vals.puppy)}&body=${encodeURIComponent(body())}`;
  };
  const whatsapp = () => {
    if (!check()) return;
    say('WhatsApp is opening in a new tab with your message ready.');
    window.open(`https://wa.me/${digits(SITE.phone)}?text=${encodeURIComponent(body())}`, '_blank', 'noopener');
  };
  const set = (k: keyof typeof vals) => (e: { target: { value: string } }) => {
    setVals((v) => ({ ...v, [k]: e.target.value }));
    setStatus(null);
    if (k === 'name' || k === 'email') {
      if (errors[k] && !rules[k](e.target.value)) setErrors((x) => ({ ...x, [k]: '' }));
    }
  };

  return (
    <Reveal as="form" className="grid gap-5 rounded-[10px] border-2 border-indigo p-[clamp(1.5rem,4vw,2.75rem)]" id="form" noValidate onSubmit={submit}>
      {asking && (
        <p className="ctx" id="ctx">
          {picked ? (
            <>You are asking about <b>{picked.name}</b>, a {picked.sex.toLowerCase()} {picked.breed}, {picked.weeks} weeks old, {money(picked.price)}.</>
          ) : (
            <>You are joining the <b>waiting list</b>. Tell us the breed and a rough timeline below.</>
          )}
        </p>
      )}
      <div className="field">
        <label htmlFor="name" className="!block">Your name <span className="req">(required)</span></label>
        <input ref={refs.name} id="name" name="name" type="text" autoComplete="name" required aria-describedby="name-err" aria-invalid={errors.name ? true : undefined} value={vals.name} onChange={set('name')} />
        <p className="err" id="name-err" role="alert">{errors.name}</p>
      </div>
      <div className="field">
        <label htmlFor="email" className="!block">Email <span className="req">(required)</span></label>
        <input ref={refs.email} id="email" name="email" type="email" autoComplete="email" inputMode="email" required aria-describedby="email-err" aria-invalid={errors.email ? true : undefined} value={vals.email} onChange={set('email')} />
        <p className="err" id="email-err" role="alert">{errors.email}</p>
      </div>
      <div className="field">
        <label htmlFor="puppy" className="!block">Selected puppy or breed</label>
        <select id="puppy" name="puppy" value={vals.puppy} onChange={set('puppy')}>
          {PUPPY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="msg" className="!block">About your household</label>
        <textarea id="msg" name="msg" placeholder="Other pets, children, the kind of home, and when you would like a puppy" value={vals.msg} onChange={set('msg')} />
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-3">
        <button className="btn" type="submit">Send by email</button>
        <button className="btn quiet" type="button" id="wa" onClick={whatsapp}>Message on WhatsApp</button>
      </div>
      {status && <p key={status.n} className="status" id="status" role="status">{status.text}</p>}
    </Reveal>
  );
}

export default function Contact() {
  const m = META.contact;
  usePageMeta({ ...m, jsonLd: [crumbs(m.label, m.path)] });
  const [params] = useSearchParams();
  const { search } = useLocation();
  const ask = params.get('puppy');
  const initial = ask && PUPPY_OPTIONS.includes(ask) ? ask : PUPPY_OPTIONS[0];

  return (
    <div className="wrap grid gap-[clamp(2.5rem,6vw,5rem)] pt-[clamp(2rem,6vw,4.5rem)] pb-section md:grid-cols-[5fr_7fr] md:items-start">
      <div>
        <p className="eyebrow" {...stagger(0)}>Contact</p>
        <h1 className="ph" {...stagger(1)}>Tell us about your home</h1>
        <p className="lead" {...stagger(2)}>Share a few lines about who lives with you and which puppy caught your eye. We reply by email or WhatsApp, usually within a day.</p>
        <div className="direct my-9 grid gap-1" {...stagger(3)}>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={`tel:${SITE.phone.replace(/[^\d+]/g, '')}`}>{SITE.phone.replace(/ /g, '\u00a0')}</a>
        </div>
        <Reveal className="next">
          <h2 className="!mb-4 !text-[1.1rem] !tracking-tight">What happens next</h2>
          <ol>
            <li>We write back and ask a few questions about your household.</li>
            <li>We talk through which puppy suits your home.</li>
            <li>You visit by appointment and we agree a pickup date.</li>
          </ol>
        </Reveal>
      </div>
      <ContactForm key={search} initial={initial} />
    </div>
  );
}
