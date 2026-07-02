import Image from 'next/image'
import { cn } from '@/lib/utils'

interface SafeImageProps {
  src: string
  alt: string
  available: boolean
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
  className?: string
  /** Short label shown on the placeholder so the client knows which photo goes here. */
  placeholderLabel?: string
}

/**
 * Renders next/image when the file exists in /public; otherwise a neutral slate
 * placeholder (crosshatch), never a stock plumbing photo, so missing photography
 * is obvious at a glance.
 */
export function SafeImage({
  src,
  alt,
  available,
  fill,
  width,
  height,
  sizes,
  priority,
  className,
  placeholderLabel,
}: SafeImageProps) {
  if (available) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    )
  }

  return (
    <div
      className={cn('placeholder-hatch flex items-center justify-center', fill && 'absolute inset-0', className)}
      role="img"
      aria-label={`${alt} (zdjęcie w przygotowaniu)`}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-blue/70" aria-hidden="true">
          <path d="M3 16.5V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.5Z" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="m4 17 5-4.5L14 17m-1.5-2 3-2.5L20 16.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
        <span className="text-[11px] font-medium uppercase tracking-widest text-blue/80">
          {placeholderLabel ?? 'Zdjęcie w przygotowaniu'}
        </span>
      </div>
    </div>
  )
}
