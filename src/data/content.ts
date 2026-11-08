import { REGISTRY, SITE } from './site';

export interface Faq { q: string; a: string }
export const FAQ: readonly Faq[] = [
  { q: 'How do I prepare my home for a puppy?', a: 'Set up a crate or pen, a bed, a potty area, food and water bowls, and a few chew toys before the puppy arrives. Tuck cords out of reach and keep chocolate, xylitol sweeteners and small objects off the floor. Toy puppies are fragile, so block stairs and keep furniture jumps low.' },
  { q: 'How do you socialize the puppies?', a: 'They are born in our home and handled every day from the first week. They hear the vacuum, the doorbell and visitors, and get gentle practice with paws, nails and brushing, so they arrive confident with people.' },
  { q: 'When can a puppy go home?', a: `At ${SITE.readyWeeks} weeks or older. By then each puppy is weaned, eating well, has had its first vaccinations and a vet check, and is microchipped. Toy breeds need that extra time to grow strong.` },
  { q: 'What should I feed a toy puppy?', a: 'We send you home with a small supply of the food we use. Keep to it for the first weeks, then change slowly if you wish. Toy breeds do best with several small meals a day, because skipping meals can drop their blood sugar. Ask us or your vet for a plan.' },
  { q: 'How much grooming do they need?', a: 'It depends on the breed. Yorkies, Maltese and long-coat Pomeranians need brushing most days, Poodles need regular clipping, and smooth-coat Chihuahuas need very little. We explain the routine for your puppy at handover.' },
  { q: 'Can a puppy live with other dogs or cats?', a: 'Yes, in most homes. Puppies meet our own dogs from birth. Introduce new pets slowly, one calm meeting at a time, and keep the puppy safe from larger dogs while it is small.' },
  { q: 'Can you deliver a puppy?', a: 'You are welcome to collect your puppy from our home. If you are far away, we can arrange an in-cabin flight nanny or a personal hand-off. We never ship a puppy alone in cargo.' },
  { q: 'What paperwork do I receive?', a: `Vet records, the vaccination and deworming schedule, microchip details, parent health test results, pedigree and ${REGISTRY.short} registration paperwork, and your signed health warranty.` },
];

export interface Review { quote: string; name: string; meta: string }
/** SAMPLE REVIEWS: replace with real, attributable reviews before launch. */
export const REVIEWS: readonly Review[] = [
  { quote: 'Biscuit slept through his first night and has not stopped wagging since. The records were thorough and so was the advice.', name: 'The Okafor family', meta: 'Yorkie family' },
  { quote: 'We were nervous about our first small dog. Weeks of photos and updates made us feel like part of the family before pickup.', name: 'Dana R.', meta: 'Maltese family' },
  { quote: 'Our vet said she was one of the best socialized puppies she had seen. Calm at the clinic, calm with the kids.', name: 'Marcus & Leah T.', meta: 'Poodle family' },
  { quote: 'Honest from the first message. They asked as many questions of us as we asked of them, and I loved that.', name: 'Priya S.', meta: 'Pomeranian family' },
  { quote: 'Delivery by flight nanny was smooth and stress free. Our little girl arrived happy, fed and fully settled in a day.', name: 'The Hendricks', meta: 'Chihuahua family' },
  { quote: 'A year on, they still answer our questions within a day. That is rare in a breeder.', name: 'Tom W.', meta: 'Yorkie family' },
];

export const ABOUT_STEPS = [
  { t: 'Weeks 0 to 3', d: 'Born and raised in our living room, handled gently every day.' },
  { t: 'Weeks 3 to 8', d: 'Everyday sounds, new surfaces, paw and nail handling, short sessions on a grooming mat.' },
  { t: `Weeks 8 to ${SITE.readyWeeks}`, d: 'Weaned and eating well, first vaccinations, microchip, vet check and a final health review.' },
] as const;

export const HEALTH_PROVIDE = [
  { h: `A ${SITE.warrantyMonths}-month health warranty`, p: 'Written cover against verified life-threatening congenital and hereditary conditions. The full contract is sent before any deposit.' },
  { h: '72 hours with your vet', p: 'Your puppy goes to your own vet within three days. If a serious problem is found, the contract explains your options.' },
  { h: 'Vaccinated and dewormed', p: 'Age-appropriate puppy vaccinations and deworming, with dates recorded, plus a vet health check before departure.' },
  { h: 'Health-tested parents', p: 'Parent dogs are screened, with results shared, for conditions common to toy breeds, such as patellar luxation, heart and eye issues, and liver shunt.' },
  { h: 'Microchipped and registered', p: `Every puppy leaves with a microchip, ${REGISTRY.short} (${REGISTRY.long}) registration paperwork and a full pedigree.` },
] as const;

export const HEALTH_ASK = [
  { h: 'A vet visit within 72 hours', p: 'Book your puppy’s first check promptly. It protects you and the puppy.' },
  { h: 'Keep to the vaccine schedule', p: 'Follow your vet’s plan for boosters, parasite prevention and routine care.' },
  { h: 'Feed well and in small meals', p: 'Toy breeds need regular, small meals to keep their blood sugar steady.' },
  { h: 'A family companion home', p: 'Puppies live indoors as family pets and are spayed or neutered on your vet’s schedule, as set out in our pet-only agreement.' },
  { h: 'Tell us how they are doing', p: 'We love updates and photos, and we want to know straight away if any health issue appears.' },
] as const;
