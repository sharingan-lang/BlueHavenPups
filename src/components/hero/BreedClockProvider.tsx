import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';
import { createBreedClock, type BreedClock } from '@/state/breedClock';
import { BREED_ORDER } from '@/data/breedAssets';

const BreedClockContext = createContext<BreedClock | null>(null);

export function BreedClockProvider({ children, intervalMs = 3200 }: { children: ReactNode; intervalMs?: number }) {
  const [clock] = useState(() => createBreedClock(BREED_ORDER.length, intervalMs));
  useEffect(() => { clock.start(); return () => clock.stop(); }, [clock]);
  return <BreedClockContext.Provider value={clock}>{children}</BreedClockContext.Provider>;
}

export function useBreedClock(): BreedClock {
  const clock = useContext(BreedClockContext);
  if (!clock) throw new Error('useBreedClock must be used inside <BreedClockProvider>');
  return clock;
}

export function useActiveBreedIndex(): number {
  const clock = useBreedClock();
  return useSyncExternalStore(clock.subscribe, clock.getIndex, clock.getIndex);
}

export function useClockPlaying(): boolean {
  const clock = useBreedClock();
  return useSyncExternalStore(clock.subscribe, clock.getPlaying, clock.getPlaying);
}
