import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  text?: ReactNode
  className?: string
  dark?: boolean
}

export function SectionHeading({ eyebrow, title, text, className, dark }: SectionHeadingProps) {
  return (
    <div className={cn('hf-reveal', className)}>
      <p className={cn('eyebrow', dark && 'text-hf-lime')}>{eyebrow}</p>
      <h2 className="mt-3 max-w-2xl text-[1.875rem] font-semibold leading-[1.05] tracking-[-0.05em] sm:mt-5 sm:text-5xl">{title}</h2>
      {text && <p className={cn('mt-3 max-w-xl text-[1rem] leading-6 sm:mt-5 sm:text-base sm:leading-7', dark ? 'text-white/65' : 'text-hf-sage')}>{text}</p>}
    </div>
  )
}
