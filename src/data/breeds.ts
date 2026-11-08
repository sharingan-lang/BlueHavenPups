/**
 * Central, editable content arrays.
 * BREEDS and PUPPIES drive (hero photos live in breedAssets.ts) the home page, puppy list,
 * nav dropdown, rotator, filter chips and contact form. Replace the .svg
 * placeholders in /public/img with real photos (.webp/.jpg) and update the paths.
 */
import type { PuppyBreedType } from './breedAssets';

export interface Breed {
  name: PuppyBreedType;
  slug: string;
  /** "From" price in USD, shown on the breed cards and nav. */
  from: number;
  text: string;
  /** Typical adult size, shown in the breed finder. */
  size: string;
  /** What the coat needs from you. */
  coat: string;
  /** Card image (4:3). */
  image: string;
}

export const BREEDS = [
  { name: 'Yorkie', size: 'Up to 7 lb', coat: 'Silky coat, brushed most days', slug: 'yorkie', from: 2800, image: '/img/pups/yorkie.webp', text: 'Bold, bright and full of terrier spirit. A silky coat that needs regular brushing.' },
  { name: 'Maltese', size: 'Under 7 lb', coat: 'Long white coat, brushed daily', slug: 'maltese', from: 2600, image: '/img/pups/maltese.webp', text: 'Gentle, playful and devoted. A flowing white coat that needs daily brushing.' },
  { name: 'Poodle', size: 'Toy size, under 10 in tall', coat: 'Curly coat, clipped regularly', slug: 'poodle', from: 2400, image: '/img/pups/poodle.webp', text: 'Clever, eager and low shedding. Learns quickly and loves having a job to do.' },
  { name: 'Pomeranian', size: '3 to 7 lb', coat: 'Double coat, brushed a few times a week', slug: 'pomeranian', from: 2900, image: '/img/pups/pomeranian.webp', text: 'Lively, confident and fluffy. A thick double coat and a big personality.' },
  { name: 'Chihuahua', size: 'Up to 6 lb', coat: 'Smooth or long coat, very little grooming', slug: 'chihuahua', from: 2000, image: '/img/pups/chihuahua.webp', text: 'Loyal and alert, with a big heart in a tiny frame. Smooth or long coat.' },
] as const satisfies readonly Breed[];

export type BreedName = PuppyBreedType;
export const BREED_NAMES: readonly BreedName[] = BREEDS.map((b) => b.name);

export type PuppyStatus = 'Available' | 'Reserved';
export interface Puppy {
  name: string;
  breed: BreedName;
  sex: 'Female' | 'Male';
  /** Age in weeks. */
  weeks: number;
  color: string;
  price: number;
  status: PuppyStatus;
  image: string;
  blurb: string;
}

/** SAMPLE DATA: replace with your real litters. */
/** Individual puppies get their own photos later. Breed photos must never stand in for a specific puppy. */
export const PUPPY_PHOTO_PLACEHOLDER = '/img/pups/placeholder.svg';

export const PUPPIES: readonly Puppy[] = [
  { name: 'Pepper', breed: 'Yorkie', sex: 'Female', weeks: 11, color: 'Steel blue and tan', price: 2800, status: 'Available', image: PUPPY_PHOTO_PLACEHOLDER, blurb: 'Brave, curious and first to the toy basket. Loves a lap and a lively game of tug.' },
  { name: 'Maisie', breed: 'Maltese', sex: 'Female', weeks: 12, color: 'Pure white', price: 2600, status: 'Available', image: PUPPY_PHOTO_PLACEHOLDER, blurb: 'Sweet and calm, happiest curled up beside you. Already settles well on a grooming mat.' },
  { name: 'Teddy', breed: 'Poodle', sex: 'Male', weeks: 10, color: 'Apricot', price: 2400, status: 'Available', image: PUPPY_PHOTO_PLACEHOLDER, blurb: 'Quick to learn and eager to please. Follows us from room to room.' },
  { name: 'Ziggy', breed: 'Pomeranian', sex: 'Male', weeks: 11, color: 'Orange sable', price: 2900, status: 'Available', image: PUPPY_PHOTO_PLACEHOLDER, blurb: 'A confident little fluffball with plenty to say. Friendly with every visitor.' },
  { name: 'Luna', breed: 'Chihuahua', sex: 'Female', weeks: 12, color: 'Cream, smooth coat', price: 2000, status: 'Available', image: PUPPY_PHOTO_PLACEHOLDER, blurb: 'Gentle and watchful, a born cuddler who loves a warm blanket.' },
  { name: 'Mochi', breed: 'Maltese', sex: 'Male', weeks: 10, color: 'White', price: 2600, status: 'Reserved', image: PUPPY_PHOTO_PLACEHOLDER, blurb: 'Playful and affectionate. Reserved for a family who visited us last week.' },
];

export const ABOUT_IMAGE = { src: '/img/about.webp', alt: 'A fluffy white puppy asleep on its back in a pink bed' };
export const PUPPIES_BANNER = { src: '/img/puppies-banner.svg', alt: 'Puppies from our current litters' };

export const isBreedName = (v: string | null | undefined): v is BreedName =>
  !!v && (BREED_NAMES as readonly string[]).includes(v);
