'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import { SafeImage } from '@/components/molecules/SafeImage'
import { staggerFast, fadeUpVariant, fadeInVariant, revealHeading, viewportConfig } from '@/lib/animations'
import { site } from '@/lib/siteData'
import type { GalleryImage } from '@/types'

const data = site.gallery

// Editorial rhythm: a couple of tiles span 2 rows so the grid breathes without going messy.
const SPAN = new Set([0, 5]) // hero-kotlownia + podlogowka-petle read as landscape features

export function Realizacje({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Lightbox only cycles through images that actually exist.
  const viewable = images.map((img, i) => ({ img, i })).filter(({ img }) => img.available)
  const viewablePos = openIndex === null ? -1 : viewable.findIndex(({ i }) => i === openIndex)

  const close = useCallback(() => setOpenIndex(null), [])
  const go = useCallback(
    (dir: 1 | -1) => {
      if (viewablePos === -1) return
      const next = (viewablePos + dir + viewable.length) % viewable.length
      setOpenIndex(viewable[next].i)
    },
    [viewablePos, viewable],
  )

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [openIndex, close, go])

  const active = openIndex === null ? null : images[openIndex]

  return (
    <section id="realizacje" className="bg-ink-900 py-20 md:py-28" aria-label="Realizacje">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={revealHeading}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="max-w-2xl"
        >
          <SectionLabel>{data.eyebrow}</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-bone md:text-[2.75rem]">
            {data.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">{data.intro}</p>
        </motion.div>

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[240px] lg:grid-cols-4"
        >
          {images.map((img, i) => {
            const span = SPAN.has(i)
            return (
              <motion.button
                key={img.src}
                variants={fadeUpVariant}
                type="button"
                onClick={() => img.available && setOpenIndex(i)}
                aria-label={img.available ? `Powiększ: ${img.alt}` : img.alt}
                disabled={!img.available}
                className={[
                  'group relative overflow-hidden rounded-xl border border-line',
                  span ? 'sm:col-span-2 sm:row-span-1' : '',
                  img.available ? 'cursor-zoom-in' : 'cursor-default',
                ].join(' ')}
              >
                <SafeImage
                  src={img.src}
                  alt={img.alt}
                  available={img.available}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                  placeholderLabel={img.src.split('/').pop()}
                />
                {img.available && (
                  <>
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-ink/70 text-bone opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <Plus size={16} />
                    </span>
                    <span className="pointer-events-none absolute inset-x-4 bottom-3 translate-y-2 text-left text-xs font-medium text-bone/90 opacity-0 transition-all duration-500 ease-editorial group-hover:translate-y-0 group-hover:opacity-100">
                      {img.alt}
                    </span>
                  </>
                )}
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      {/* Lightbox */}
      {active && (
        <motion.div
          variants={fadeInVariant}
          initial="hidden"
          animate="visible"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Zamknij"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone transition-colors hover:bg-bone/10"
          >
            <X size={22} />
          </button>

          {viewable.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(-1) }}
                aria-label="Poprzednie"
                className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/20 text-bone transition-colors hover:bg-bone/10 md:left-8"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(1) }}
                aria-label="Następne"
                className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/20 text-bone transition-colors hover:bg-bone/10 md:right-8"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <figure className="relative flex max-h-[85vh] w-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[70vh] w-full">
              <Image src={active.src} alt={active.alt} fill sizes="90vw" className="object-contain" />
            </div>
            <figcaption className="mt-4 text-center text-sm text-bone/70">
              {active.alt}
              {viewablePos > -1 && (
                <span className="ml-2 text-muted">
                  · {viewablePos + 1} / {viewable.length}
                </span>
              )}
            </figcaption>
          </figure>
        </motion.div>
      )}
    </section>
  )
}
