'use client'

import { useEffect, useState } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import { Wordmark } from '@/components/atoms/Wordmark'
import { cn } from '@/lib/utils'
import { site } from '@/lib/siteData'

const NAV = site.nav
const PHONE = site.business.phone
const PHONE_HREF = site.business.phoneHref

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-editorial',
        scrolled || open
          ? 'bg-ink/90 backdrop-blur-md border-b border-line'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20">
        <a href="#" aria-label="PlumbingCraft, strona główna" className="text-lg md:text-xl">
          <Wordmark tone="light" />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-bone/70 transition-colors hover:text-bone"
            >
              {item.label}
            </a>
          ))}
          <a
            href={`tel:${PHONE_HREF}`}
            className="inline-flex items-center gap-2 rounded-full bg-copper px-5 py-2.5 text-sm font-semibold text-bone shadow-copper transition-colors hover:bg-copper-dark"
          >
            <Phone size={15} aria-hidden="true" />
            {PHONE}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-bone lg:hidden"
          aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-ink/95 backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-bone/80 transition-colors hover:bg-bone/5 hover:text-bone"
              >
                {item.label}
              </a>
            ))}
            <a
              href={`tel:${PHONE_HREF}`}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-copper px-5 py-3 text-base font-semibold text-bone"
            >
              <Phone size={16} aria-hidden="true" />
              {PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
