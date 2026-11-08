import { memo, useEffect, useState } from 'react';
import { BREED_ASSETS, BREED_ORDER } from '@/data/breedAssets';
import { SHOW_SAMPLE_BADGE } from '@/data/site';
import { srcSet } from '@/lib/images';
import { useLagged } from '@/hooks/useLagged';
import { useActiveBreedIndex, useBreedClock, useClockPlaying } from './BreedClockProvider';

/**
 * Collar-tag photo. All five photos are stacked at a fixed 4:5 ratio and cross-fade by opacity only,
 * so a breed change never reflows the page. Reads the shared index; owns no rotation state.
 * No ancestor fades in with opacity: Chrome ignores images under a transparent parent when picking the
 * page's largest paint, which pushed this photo's LCP from ~0.7s to ~3.4s. The tag's swing is the entrance.
 */
export const HeroImageShowcase = memo(function HeroImageShowcase() {
  const clock = useBreedClock();
  const index = useActiveBreedIndex();
  const playing = useClockPlaying();
  // Caption changes halfway through the photo's cross-fade, so it never names a breed the photo isn't showing yet.
  const active = BREED_ASSETS[BREED_ORDER[useLagged(index, 280)]];

  // Staged loading: only the first photo loads up front. The next one is fetched while the current is on screen.
  const [enabled, setEnabled] = useState<ReadonlySet<number>>(() => new Set([0]));
  useEffect(() => {
    setEnabled((prev) => {
      const wanted = [index, (index + 1) % BREED_ORDER.length];
      if (wanted.every((k) => prev.has(k))) return prev;
      return new Set([...prev, ...wanted]);
    });
  }, [index]);

  return (
    <div
      className="hero-visual"
      onPointerEnter={() => clock.setHeld(true)}
      onPointerLeave={() => clock.setHeld(false)}
      onFocusCapture={() => clock.setHeld(true)}
      onBlurCapture={() => clock.setHeld(false)}
    >
      <div className="tag-wrap">
        <div className="tag">
          <div className="tag-photo">
            {BREED_ORDER.map((name, k) => {
              const a = BREED_ASSETS[name];
              return (
                <img
                  key={name}
                  src={enabled.has(k) ? a.imagePlaceholder : undefined}
                  srcSet={enabled.has(k) ? srcSet(a.imagePlaceholder, [480]) : undefined}
                  sizes="(min-width: 56.25em) 340px, min(340px, calc(100vw - 40px))"
                  alt={k === index ? a.alt : ''}
                  aria-hidden={k === index ? undefined : true}
                  width={800}
                  height={1000}
                  decoding="async"
                  fetchPriority={k === 0 ? 'high' : 'auto'}
                  style={{ opacity: k === index ? 1 : 0 }}
                />
              );
            })}
          </div>
          <div className="tag-cap"><span>{active.name}</span>{SHOW_SAMPLE_BADGE && <small>Sample photo</small>}</div>
        </div>
      </div>

      <div className="rot-controls">
        <button
          type="button"
          className="rot-pause"
          aria-pressed={!playing}
          aria-label={playing ? 'Pause breed rotation' : 'Resume breed rotation'}
          onClick={() => clock.setPlaying(!playing)}
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5v11l9-5.5z" fill="currentColor" /></svg>
          )}
        </button>
        <div className="rot-dots" role="group" aria-label="Choose a breed">
          {BREED_ORDER.map((name, k) => (
            <button key={name} type="button" aria-label={`Show ${name}`} aria-current={k === index ? 'true' : undefined} onClick={() => clock.goTo(k)} />
          ))}
        </div>
      </div>
    </div>
  );
});
