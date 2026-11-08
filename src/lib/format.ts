import { SITE } from '@/data/site';
import type { Puppy } from '@/data/breeds';

export const money = (n: number) => '$' + n.toLocaleString('en-US');
export const price = (p: Puppy) => (p.status === 'Available' ? money(p.price) : 'Reserved');
export const readyText = (w: number) =>
  w >= SITE.readyWeeks ? 'Ready to go home' : `Ready in ${SITE.readyWeeks - w} week${SITE.readyWeeks - w === 1 ? '' : 's'}`;
export const digits = (s: string) => s.replace(/\D/g, '');
