'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import { staggerContainer, fadeUpVariant, revealHeading, viewportConfig } from '@/lib/animations'
import { site } from '@/lib/siteData'

const data = site.testimonials

export function Testimonials() {
  return (
    <section className="bg-bone py-20 md:py-28" aria-label="Opinie">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={revealHeading}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="max-w-2xl"
        >
          <SectionLabel>{data.eyebrow}</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink md:text-[2.75rem]">
            {data.heading}
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {data.items.map((t, i) => (
            <motion.figure
              key={i}
              variants={fadeUpVariant}
              className="relative flex flex-col rounded-2xl border border-ink/10 bg-white p-7 shadow-card"
            >
              <Quote size={28} className="text-blue/40" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink/70">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-ink/10 pt-4 text-sm font-medium text-ink/50">
                {t.author}
              </figcaption>
              {t.placeholder && (
                <span className="absolute right-5 top-5 rounded-full bg-blue/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-blue">
                  do uzupełnienia
                </span>
              )}
            </motion.figure>
          ))}
        </motion.div>

        <p className="mt-6 text-center text-xs text-ink/40">
          Miejsca na prawdziwe opinie klientów. Dodamy je za zgodą inwestorów.
        </p>
      </div>
    </section>
  )
}
