import type { PuppyBreedType } from './breedAssets';

/** Shape of one card in the future "Our Puppies" grid. Fill FUTURE_PUPPIES (up to 6) and set enabled on the hook. */
export interface FuturePuppy {
  id: string;
  name: string;
  breed: PuppyBreedType;
  priceUsd: number;
  image: string;
  status: 'Available' | 'Reserved';
}

export const FUTURE_PUPPIES_LIMIT = 6;
export const FUTURE_PUPPIES: readonly FuturePuppy[] = [];

/** Pre-filled contact routing: the contact form reads ?puppy= and selects that puppy. */
export const contactRoute = (p: Pick<FuturePuppy, 'name'>): string => `/contact?puppy=${encodeURIComponent(p.name)}`;
