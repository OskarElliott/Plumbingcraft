'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import { ServiceCard } from '@/components/molecules/ServiceCard'
import { staggerContainer, fadeUpVariant, revealHeading, viewportConfig } from '@/lib/animations'
import { site } from '@/lib/siteData'
import type { ServiceItem } from '@/types'

const data = site.services

export function Services() {
  return (
    <section id="uslugi" className="bg-ink py-20 md:py-28" aria-label="Usługi">
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
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {(data.items as ServiceItem[]).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
