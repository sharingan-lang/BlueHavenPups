import { memo } from 'react';
import { BreedRotator } from '@/components/BreedRotator';
import { BREED_ASSETS, BREED_ORDER } from '@/data/breedAssets';
import { useLagged } from '@/hooks/useLagged';
import { useActiveBreedIndex } from './BreedClockProvider';

/** Breed name. Re-renders only when the active index changes. */
export const HeroBreedName = memo(function HeroBreedName() {
  return <BreedRotator index={useActiveBreedIndex()} />;
});

/** Tagline. All five lines share one grid cell, so its height is fixed by the longest. No layout shift. */
export const HeroTagline = memo(function HeroTagline({ lagMs = 160 }: { lagMs?: number }) {
  const active = useLagged(useActiveBreedIndex(), lagMs);
  return (
    <p className="tagline" aria-hidden="true">
      {BREED_ORDER.map((name, k) => <span key={name} data-on={k === active}>{BREED_ASSETS[name].tagline}</span>)}
    </p>
  );
});
