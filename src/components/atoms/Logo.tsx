import Image from 'next/image'
import { cn } from '@/lib/utils'
import { site } from '@/lib/siteData'

interface LogoProps {
  /** Server-checked: true when /public/logo.png exists. Renders a blue fallback mark when false. */
  available: boolean
  /** Surface behind the wordmark text: 'light' for dark backgrounds (bone text), 'dark' for light backgrounds (ink text). */
  tone?: 'light' | 'dark'
  showSubtitle?: boolean
  className?: string
}

/**
 * Brand lockup: the client's water-drop/flame icon (logo.png) sits inside its own
 * light badge so the blue/red mark stays crisp on ANY surface, next to a cleanly
 * typeset "PlumbingCraft" wordmark whose colour adapts to the background. Optional
 * "Instalacje" subtitle. A little padding keeps any faint PNG fringe off the edges.
 */
export function Logo({ available, tone = 'dark', showSubtitle = false, className }: LogoProps) {
  const textColor = tone === 'light' ? 'text-bone' : 'text-ink'
  const subColor = tone === 'light' ? 'text-bone/60' : 'text-ink/50'

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      {/* Icon always on a light badge — never directly on dark slate. */}
      <span
        className={cn(
          'relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bone p-1',
          tone === 'light' && 'shadow-[0_4px_16px_rgba(15,27,42,0.18)]',
        )}
      >
        {available ? (
          <Image src="/logo.png" alt="PlumbingCraft" width={44} height={60} priority className="h-full w-auto object-contain" />
        ) : (
          // Fallback mark (blue droplet) until logo.png is dropped into /public.
          <svg viewBox="0 0 24 32" className="h-full w-auto" aria-hidden="true">
            <path d="M12 1C12 1 3 12.5 3 20a9 9 0 0 0 18 0C21 12.5 12 1 12 1Z" fill="none" stroke="#1F63C4" strokeWidth="2" />
            <path d="M12 9c0 0-4 5.2-4 9a4 4 0 0 0 8 0c0-3.8-4-9-4-9Z" fill="#1F63C4" />
          </svg>
        )}
      </span>

      <span className="flex flex-col leading-none">
        <span className={cn('font-display text-lg font-semibold tracking-tightest md:text-xl', textColor)}>
          Plumbing<span className="text-blue">Craft</span>
        </span>
        {showSubtitle && (
          <span className={cn('mt-0.5 text-[10px] font-medium uppercase tracking-[0.28em]', subColor)}>
            {site.business.wordmarkSubtitle}
          </span>
        )}
      </span>
    </span>
  )
}
