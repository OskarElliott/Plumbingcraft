import { cn } from '@/lib/utils'

interface WordmarkProps {
  /** 'light' for dark backgrounds (bone text), 'dark' for light backgrounds (ink text). */
  tone?: 'light' | 'dark'
  showMark?: boolean
  className?: string
}

/**
 * Typographic wordmark, no logo asset needed. "Plumbing" in the base tone,
 * "Craft" in copper, with an optional small copper pipe-joint mark.
 */
export function Wordmark({ tone = 'light', showMark = true, className }: WordmarkProps) {
  const base = tone === 'light' ? 'text-bone' : 'text-ink'
  return (
    <span className={cn('inline-flex items-center gap-2 font-display font-semibold tracking-tightest', className)}>
      {showMark && (
        <span
          aria-hidden="true"
          className="relative inline-block h-[1.05em] w-[1.05em] shrink-0"
        >
          <span className="absolute inset-0 rotate-45 rounded-[3px] border border-copper" />
          <span className="absolute inset-[30%] rotate-45 rounded-[1px] bg-copper" />
        </span>
      )}
      <span className={cn('leading-none', base)}>
        Plumbing<span className="text-copper">Craft</span>
      </span>
    </span>
  )
}
