import type { CSSProperties, ElementType, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLElement> { as?: ElementType; i?: number; noValidate?: boolean }

/**
 * Plain wrapper kept so pages can swap in motion later. Sections deliberately do not fade in on scroll:
 * motion on this site is reserved for the hero, the weeks timeline and responses to what you do.
 */
export function Reveal({ as: Tag = 'div', i: _i, className, children, ...rest }: Props) {
  return <Tag {...rest} className={className}>{children}</Tag>;
}

/** Page-load entrance for titles and intros. `i` sets the order. */
export const stagger = (i: number) => ({ 'data-s': '', style: { '--i': i } as CSSProperties });
