import Image from 'next/image'
import { cn } from '@/lib/utils'
import { site } from '@/lib/siteData'

interface LogoProps {
  /** Server-checked: true when /public/logo.png exists. Renders a blue fallback mark when false. */
  available: boolean
  showSubtitle?: boolean
  className?: string
}

/**
 * Brand lockup: the client's water-drop/flame icon (logo.png) next to a cleanly
 * typeset "PlumbingCraft" wordmark, with an optional "Instalacje" subtitle.
 * Designed for LIGHT (bone) surfaces only so the blue/red mark stays crisp.
 * A little padding around the icon keeps any faint PNG fringe off the edges.
 */
export function Logo({ available, showSubtitle = false, className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="relative inline-flex h-10 w-9 shrink-0 items-center justify-center p-0.5">
        {available ? (
          <Image
            src="/logo.png"
            alt="PlumbingCraft"
            width={44}
            height={60}
            priority
            className="h-full w-auto object-contain"
          />
        ) : (
          // Fallback mark (blue droplet) until logo.png is dropped into /public.
          <svg viewBox="0 0 24 32" className="h-full w-auto" aria-hidden="true">
            <path
              d="M12 1C12 1 3 12.5 3 20a9 9 0 0 0 18 0C21 12.5 12 1 12 1Z"
              fill="none"
              stroke="#1F63C4"
              strokeWidth="2"
            />
            <path d="M12 9c0 0-4 5.2-4 9a4 4 0 0 0 8 0c0-3.8-4-9-4-9Z" fill="#1F63C4" />
          </svg>
        )}
      </span>

      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tightest text-ink md:text-xl">
          Plumbing<span className="text-blue">Craft</span>
        </span>
        {showSubtitle && (
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.28em] text-ink/50">
            {site.business.wordmarkSubtitle}
          </span>
        )}
      </span>
    </span>
  )
}
