import { clsx, type ClassValue } from 'clsx'
import type { CSSProperties } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Delay for `.hf-reveal` / `.hf-rise` animations, so siblings enter one after another. */
export function stagger(index: number, step = 90, base = 0): CSSProperties {
  return { '--d': `${base + index * step}ms` } as CSSProperties
}
