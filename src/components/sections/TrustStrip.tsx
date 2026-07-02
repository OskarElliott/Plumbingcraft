'use client'

import { motion } from 'framer-motion'
import { MapPin, Ruler, CalendarCheck, ShieldCheck, type LucideIcon } from 'lucide-react'
import { staggerContainer, fadeUpVariant, viewportConfig } from '@/lib/animations'
import { site } from '@/lib/siteData'

const ICONS: Record<string, LucideIcon> = { MapPin, Ruler, CalendarCheck, ShieldCheck }

const trust = site.trust

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-ink-900" aria-label="Dlaczego PlumbingCraft">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mx-auto grid max-w-content grid-cols-1 gap-px px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8"
      >
        {trust.items.map((item) => {
          const Icon = ICONS[item.icon] ?? ShieldCheck
          return (
            <motion.div
              key={item.label}
              variants={fadeUpVariant}
              className="flex items-center justify-center gap-3 py-8 text-center"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue">
                <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <span className="text-left text-sm font-medium text-bone/85">{item.label}</span>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
