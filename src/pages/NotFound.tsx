import { Link } from 'react-router-dom';
import { stagger } from '@/components/Reveal';
import { META } from '@/data/meta';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function NotFound() {
  usePageMeta({ ...META.notFound, noindex: true });
  return (
    <div className="wrap max-w-[40rem] pt-[clamp(3rem,10vw,8rem)] pb-section">
      <p className="eyebrow" {...stagger(0)}>Error 404</p>
      <h1 className="!text-[min(clamp(2.4rem,6.5vw,4.6rem),14vw)]" {...stagger(1)}>We could not find that page</h1>
      <p className="lead" {...stagger(2)}>It may have moved, or the link may have a typo. Try one of these instead.</p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3" {...stagger(3)}>
        <Link className="btn" to="/">Back to the homepage</Link>
        <Link className="textlink" to="/puppies">See our puppies</Link>
        <Link className="textlink" to="/contact">Ask us a question</Link>
      </div>
    </div>
  );
}
