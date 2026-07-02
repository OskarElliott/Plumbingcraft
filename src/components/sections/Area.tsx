'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import { staggerFast, fadeUpVariant, slideLeftVariant, viewportConfig } from '@/lib/animations'
import { site } from '@/lib/siteData'

const data = site.area

export function Area() {
  return (
    <section className="bg-ink-900 py-20 md:py-28" aria-label="Obszar działania">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
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
          <p className="mt-5 text-base leading-relaxed text-muted">{data.intro}</p>
        </motion.div>

        <div className="flex flex-col gap-8">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-blue">
              <MapPin size={16} aria-hidden="true" /> Dzielnice Wrocławia
            </h3>
            <motion.ul
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="mt-4 flex flex-wrap gap-2.5"
              role="list"
            >
              {data.districts.map((d) => (
                <motion.li
                  key={d}
                  variants={fadeUpVariant}
                  className="rounded-full border border-line bg-ink-800/50 px-4 py-2 text-sm text-bone/80 transition-colors duration-300 hover:border-blue/50 hover:text-bone"
                >
                  {d}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  )
}
