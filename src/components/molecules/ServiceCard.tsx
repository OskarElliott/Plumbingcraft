'use client'

import { motion } from 'framer-motion'
import { Fan, ThermometerSun, Flame, Droplets, Gauge, Filter, type LucideIcon } from 'lucide-react'
import { fadeUpVariant } from '@/lib/animations'
import { cn } from '@/lib/utils'
import type { ServiceItem } from '@/types'

const ICONS: Record<string, LucideIcon> = {
  Fan,
  ThermometerSun,
  Flame,
  Droplets,
  Gauge,
  Filter,
}

export function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = ICONS[service.icon] ?? Flame

  return (
    <motion.article
      variants={fadeUpVariant}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn(
        'group relative flex flex-col rounded-2xl border bg-ink-800/40 p-7 transition-colors duration-500 ease-editorial',
        'hover:bg-ink-800/70 hover:shadow-card-hover',
        service.featured ? 'border-blue/40' : 'border-line hover:border-blue/40',
      )}
    >
      {service.featured && (
        <span className="absolute right-5 top-5 rounded-full border border-blue/40 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-blue">
          Specjalność
        </span>
      )}

      <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue/10 text-blue transition-colors duration-500 group-hover:bg-blue group-hover:text-bone">
        <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
      </span>

      <h3 className="font-display text-xl font-medium text-bone">{service.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
    </motion.article>
  )
}
