import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

export function SectionLabel({ children, tone = 'dark', className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-blue',
        className,
      )}
    >
      <span className="h-px w-8 bg-blue/60" aria-hidden="true" />
      {children}
    </span>
  )
}
