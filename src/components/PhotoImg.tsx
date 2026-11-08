import { useEffect, useRef, useState } from 'react';

interface Props { src: string; alt: string; width: number; height: number; eager?: boolean; srcSet?: string; sizes?: string }

/** Fades in once loaded. A missing photo gets a calm placeholder instead of a broken-image icon. */
export function PhotoImg({ src, alt, width, height, eager, srcSet, sizes }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
    const el = ref.current;
    setLoaded(!!el && el.complete && el.naturalWidth > 0);
  }, [src]);
  if (failed) return <div className="noimg">Photo coming soon</div>;
  return (
    <img
      ref={ref}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      className={loaded ? 'in' : ''}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  );
}
