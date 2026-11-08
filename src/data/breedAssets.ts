/**
 * Strict asset map: breed -> uploaded photo.
 * These photos ONLY represent breeds (hero rotator and breed finder). They are never used as individual
 * available puppies; those get their own photos later (see PUPPY_PHOTO_PLACEHOLDER in breeds.ts).
 *
 * PHOTO CHECK BEFORE LAUNCH:
 *  - Verify you own or are licensed to use every photo. A breeder site promises "our puppies".
 *  - Chihuahua_pups.jpeg shows a wire exercise pen behind the puppies. Consider a photo without bars.
 *  - Unused uploads: Chihuahua.jpeg, chihuahua1.jpeg (shows another kennel's "THC" monogram), poodle1.jpeg (wire crate).
 *  - Set SHOW_SAMPLE_BADGE = false in data/site.ts once these are confirmed to be your own puppies.
 */
export type PuppyBreedType = 'Yorkie' | 'Maltese' | 'Poodle' | 'Pomeranian' | 'Chihuahua';

export interface BreedAsset {
  name: PuppyBreedType;
  tagline: string;
  /** Hero photo, 4:5 (800x1000). */
  imagePlaceholder: string;
  alt: string;
  /** The uploaded file this crop came from. */
  uploadedAs: string;
}

export const BREED_ORDER = ['Yorkie', 'Maltese', 'Poodle', 'Pomeranian', 'Chihuahua'] as const satisfies readonly PuppyBreedType[];

export const BREED_ASSETS: Readonly<Record<PuppyBreedType, BreedAsset>> = {
  Yorkie: { name: 'Yorkie', tagline: 'Bold, bright and full of terrier spirit.', imagePlaceholder: '/img/hero/yorkie.webp', alt: 'A Yorkie lying on a sofa beside a smaller Yorkie puppy', uploadedAs: 'Yorkie.jpeg' },
  Maltese: { name: 'Maltese', tagline: 'Gentle, playful and devoted to you.', imagePlaceholder: '/img/hero/maltese.webp', alt: 'A Maltese mother with four white puppies on a sofa', uploadedAs: 'Maltese.jpeg' },
  Poodle: { name: 'Poodle', tagline: 'Clever, eager and low shedding.', imagePlaceholder: '/img/hero/poodle.webp', alt: 'Three curly red-brown Poodle puppies on a blanket in a white play pen', uploadedAs: 'poodle.jpeg' },
  Pomeranian: { name: 'Pomeranian', tagline: 'Lively, confident and gloriously fluffy.', imagePlaceholder: '/img/hero/pomeranian.webp', alt: 'Four fluffy Pomeranian puppies sitting by a plush bed', uploadedAs: 'Pomeranian.jpeg' },
  Chihuahua: { name: 'Chihuahua', tagline: 'Loyal, alert and big-hearted.', imagePlaceholder: '/img/hero/chihuahua.webp', alt: 'Five Chihuahua puppies resting together on a fluffy bed', uploadedAs: 'Chihuahua_pups.jpeg' },
};
