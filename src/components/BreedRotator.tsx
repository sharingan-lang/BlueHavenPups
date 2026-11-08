import { BREED_ORDER } from '@/data/breedAssets';

type SlotState = 'on' | 'prev' | 'off';

/**
 * Breed name, slid up through one mask. Every name sits in one grid cell, so the box is always
 * as wide as the longest breed and nothing around it moves.
 */
export function BreedRotator({ index }: { index: number }) {
  const n = BREED_ORDER.length;
  const stateOf = (k: number): SlotState => (k === index ? 'on' : k === (index - 1 + n) % n ? 'prev' : 'off');
  return (
    <>
      <span className="sr-only">{BREED_ORDER.join(', ')}</span>
      <span className="rotator" aria-hidden="true">
        <span className="track">
          {BREED_ORDER.map((name, k) => <span key={name} data-state={stateOf(k)}>{name}</span>)}
        </span>
      </span>
    </>
  );
}
