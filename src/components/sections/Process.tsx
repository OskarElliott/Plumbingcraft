'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import { staggerContainer, fadeUpVariant, revealHeading, viewportConfig } from '@/lib/animations'
import { site } from '@/lib/siteData'

const data = site.process

export function Process() {
  return (
    <section id="proces" className="bg-bone py-20 md:py-28" aria-label="Jak pracujemy">
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
          <p className="mt-5 text-base leading-relaxed text-ink/60">{data.intro}</p>
        </motion.div>

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {data.steps.map((step) => (
            <motion.li key={step.number} variants={fadeUpVariant} className="relative">
              <span className="font-display text-5xl font-semibold text-copper/25">{step.number}</span>
              <div className="mt-3 h-px w-full bg-ink/10">
                <div className="h-px w-10 bg-copper" />
              </div>
              <h3 className="mt-4 font-display text-lg font-medium text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{step.description}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
