type Listener = () => void;

/**
 * A tiny external store that owns ONE timer and the active breed index.
 * Text and image components subscribe independently (useSyncExternalStore), so neither
 * holds rotation state of its own and they can never drift apart.
 */
export interface BreedClock {
  readonly length: number;
  getIndex(): number;
  getPlaying(): boolean;
  subscribe(listener: Listener): () => void;
  goTo(index: number): void;
  setPlaying(playing: boolean): void;
  /** Temporary hold while the pointer or focus is on the hero visual. */
  setHeld(held: boolean): void;
  start(): void;
  stop(): void;
}

export function createBreedClock(length: number, intervalMs: number): BreedClock {
  if (length < 1) throw new Error('createBreedClock: length must be at least 1');
  const listeners = new Set<Listener>();
  const calm = typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let playing = !calm;
  let held = false;
  let timer: number | undefined;

  const emit = () => listeners.forEach((l) => l());
  const tick = () => {
    if (!playing || held || (typeof document !== 'undefined' && document.hidden)) return;
    index = (index + 1) % length;
    emit();
  };

  return {
    length,
    getIndex: () => index,
    getPlaying: () => playing,
    subscribe(listener) {
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    },
    goTo(next) {
      if (next < 0 || next >= length) throw new RangeError(`createBreedClock.goTo: ${next} is out of range`);
      if (next === index) return;
      index = next;
      emit();
    },
    setPlaying(next) { if (next !== playing) { playing = next; emit(); } },
    setHeld(next) { held = next; },
    start() { if (timer === undefined && length > 1) timer = window.setInterval(tick, intervalMs); },
    stop() { if (timer !== undefined) { window.clearInterval(timer); timer = undefined; } },
  };
}
