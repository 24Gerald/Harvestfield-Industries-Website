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
      <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-5xl">{title}</h2>
      {text && <p className={cn('mt-5 max-w-xl leading-7', dark ? 'text-white/65' : 'text-hf-sage')}>{text}</p>}
    </div>
  )
}
