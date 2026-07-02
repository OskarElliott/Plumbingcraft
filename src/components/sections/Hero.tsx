'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Phone, ArrowRight } from 'lucide-react'
import { SafeImage } from '@/components/molecules/SafeImage'
import { revealHeading, fadeUpVariant, fadeInVariant } from '@/lib/animations'
import { site } from '@/lib/siteData'

const hero = site.hero
const PHONE_HREF = site.business.phoneHref

export function Hero({ imageAvailable }: { imageAvailable: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Subtle parallax: photo drifts up and dims as the hero scrolls away.
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08])
  const overlay = useTransform(scrollYProgress, [0, 1], [0, 0.35])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink" aria-label="Sekcja główna">
      {/* Background photo (or slate placeholder) with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <SafeImage
          src={hero.image}
          alt="Kotłownia PlumbingCraft ze zbiornikiem buforowym i miedzianym rozdzielaczem"
          available={imageAvailable}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          placeholderLabel="hero-kotlownia.jpg"
        />
      </motion.div>

      {/* Slate gradient scrim keeps blue/bone text legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink/95" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(169,116,79,0.18),transparent_55%)]" aria-hidden="true" />
      {/* Scroll-driven dim */}
      <motion.div className="absolute inset-0 bg-ink" style={{ opacity: overlay }} aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-content px-4 py-28 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div variants={fadeInVariant} initial="hidden" animate="visible" transition={{ delay: 0.15 }}>
            <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-blue-light">
              <motion.span
                className="h-px bg-blue"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              />
              {hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            variants={revealHeading}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.25 }}
            className="mt-6 font-display text-display text-bone"
          >
            {hero.headlineLead}{' '}
            <span className="text-blue">{hero.headlineAccent}</span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.45 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-bone/75 sm:text-lg"
          >
            {hero.subhead}
          </motion.p>

          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <motion.button
              onClick={() => scrollTo('kontakt')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-blue px-8 text-base font-semibold text-bone shadow-blue transition-colors duration-300 hover:bg-blue-dark"
            >
              {hero.ctaPrimary}
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </motion.button>
            <motion.a
              href={`tel:${PHONE_HREF}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-bone/25 px-8 text-base font-medium text-bone transition-colors duration-300 hover:border-bone/50 hover:bg-bone/10"
            >
              <Phone size={17} aria-hidden="true" />
              {hero.ctaSecondary}
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        aria-hidden="true"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-bone/25 p-1.5">
          <span className="scroll-cue-dot h-2 w-1 rounded-full bg-blue" />
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue/40 to-transparent" aria-hidden="true" />
    </section>
  )
}
