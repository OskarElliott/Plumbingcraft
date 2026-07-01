import type { Variants } from 'framer-motion'

// Editorial easing: slow-out, gentle settle.
const ease = [0.22, 1, 0.36, 1] as const

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease } },
}

// Premium heading reveal: soft blur + lift that settles crisply.
export const revealHeading: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease },
  },
}

export const slideLeftVariant: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
}

export const slideRightVariant: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

export const viewportConfig = {
  once: true,
  margin: '-80px',
} as const
