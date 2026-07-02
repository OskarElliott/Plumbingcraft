'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import { SafeImage } from '@/components/molecules/SafeImage'
import { slideLeftVariant, slideRightVariant, viewportConfig } from '@/lib/animations'
import { site } from '@/lib/siteData'
import type { GalleryImage } from '@/types'

const data = site.about

export function About({ image }: { image: GalleryImage }) {
  return (
    <section id="o-firmie" className="bg-ink py-20 md:py-28" aria-label="O firmie">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          variants={slideLeftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <SectionLabel>{data.eyebrow}</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-bone md:text-[2.75rem]">
            {data.heading}
          </h2>
          {data.paragraphs.map((p, i) => (
            <p key={i} className="mt-5 text-base leading-relaxed text-muted">
              {p}
            </p>
          ))}

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2" role="list">
            {data.highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 text-sm text-bone/85">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue/15 text-blue">
                  <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={slideRightVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
            <SafeImage
              src={image.src}
              alt={image.alt}
              available={image.available}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              placeholderLabel={image.src.split('/').pop()}
            />
          </div>
          {/* Copper corner accent */}
          <div className="absolute -bottom-3 -left-3 h-24 w-24 rounded-bl-2xl border-b-2 border-l-2 border-blue/60" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  )
}
