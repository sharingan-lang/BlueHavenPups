/** Per-route SEO. Titles stay under 60 characters, descriptions between 120 and 165. */
export interface RouteMeta { title: string; description: string; path: string; label: string }

export const META = {
  home: { path: '/', label: 'Home', title: 'Home-Raised Toy Puppies in Five Breeds | Blue Haven Pups', description: 'A small family boutique breeder raising Yorkie, Maltese, Poodle, Pomeranian and Chihuahua puppies at home. See who is ready to go home and ask about a puppy.' },
  puppies: { path: '/puppies', label: 'Puppies', title: 'Available Puppies: Yorkie, Maltese, Poodle | Blue Haven', description: 'See which Yorkie, Maltese, Poodle, Pomeranian and Chihuahua puppies are ready or reserved, with their ages, colours and prices, updated by hand.' },
  about: { path: '/about', label: 'About', title: 'About Our Home-Raised Puppies | Blue Haven Pups', description: 'How we raise our puppies: in our living room, handled daily from birth, from health-tested parents, and placed with families we have spoken to first.' },
  health: { path: '/health', label: 'Health', title: 'Puppy Health Guarantee | Blue Haven Pups', description: 'What our written health guarantee covers, what we provide with every puppy, and what we ask of you in return. Read the full contract before any deposit.' },
  reviews: { path: '/reviews', label: 'Reviews', title: 'Puppy Reviews from Families | Blue Haven Pups', description: 'Notes from families about bringing a Blue Haven puppy home, from how quickly it settled in to the health records and the handover day.' },
  faq: { path: '/faq', label: 'FAQ', title: 'Puppy Adoption FAQ | Blue Haven Pups', description: 'Answers about preparing your home, socializing, when puppies go home, food, grooming, other pets, delivery and paperwork, explained plainly.' },
  contact: { path: '/contact', label: 'Contact', title: 'Contact Blue Haven Pups | Ask About a Puppy', description: 'Tell us about your home and which puppy caught your eye. We reply by email or WhatsApp, usually within a day, and keep a waiting list for new litters.' },
  notFound: { path: '/404', label: 'Not found', title: 'Page Not Found | Blue Haven Pups', description: 'That page could not be found. Head back to the Blue Haven Pups homepage, see our available puppies, or ask us a question directly.' },
} as const satisfies Record<string, RouteMeta>;
