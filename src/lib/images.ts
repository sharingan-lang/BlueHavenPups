/**
 * Responsive image helpers. Every full-size photo (800px wide) has smaller copies named
 * `name-480.webp` (and `name-160.webp` for breed card photos). Make them with scripts/make-variants.py.
 */
export const variantSrc = (src: string, width: number): string => src.replace(/\.webp$/, `-${width}.webp`);

/** srcset string: the given smaller widths plus the 800px original. */
export const srcSet = (src: string, widths: readonly number[], baseWidth = 800): string =>
  [...widths.map((w) => `${variantSrc(src, w)} ${w}w`), `${src} ${baseWidth}w`].join(', ');
