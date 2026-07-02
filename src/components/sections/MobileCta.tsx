'use client'

import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { site } from '@/lib/siteData'

const b = site.business

/** Sticky phone CTA, mobile only, appears after the user scrolls past the hero. */
export function MobileCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 p-3 transition-transform duration-500 ease-editorial lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <a
        href={`tel:${b.phoneHref}`}
        className="flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-blue text-base font-semibold text-bone shadow-blue"
      >
        <Phone size={18} aria-hidden="true" />
        Zadzwoń: {b.phone}
      </a>
    </div>
  )
}
