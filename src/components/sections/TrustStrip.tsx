'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUpVariant, viewportConfig } from '@/lib/animations'
import { site } from '@/lib/siteData'

const trust = site.trust

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-ink-900" aria-label="Zaufanie w liczbach">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mx-auto grid max-w-content grid-cols-2 gap-px overflow-hidden px-4 sm:px-6 lg:grid-cols-4 lg:px-8"
      >
        {trust.items.map((item) => (
          <motion.div
            key={item.label}
            variants={fadeUpVariant}
            className="flex flex-col items-center py-10 text-center"
          >
            <span className="font-display text-4xl font-semibold text-copper md:text-5xl">{item.value}</span>
            <span className="mt-2 max-w-[12rem] text-sm text-muted">{item.label}</span>
            {item.placeholder && (
              <span className="mt-1 text-[10px] uppercase tracking-wider text-copper/50">dane poglądowe</span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
