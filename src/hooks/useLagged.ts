import { useEffect, useState } from 'react';

/** Follows `value` after a delay of its own, so related pieces of UI can land in sequence. */
export function useLagged<T>(value: T, ms: number): T {
  const [lagged, setLagged] = useState(value);
  useEffect(() => {
    const t = window.setTimeout(() => setLagged(value), ms);
    return () => window.clearTimeout(t);
  }, [value, ms]);
  return lagged;
}
