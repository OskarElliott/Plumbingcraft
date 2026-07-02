import { Phone, Mail, MapPin } from 'lucide-react'
import { Logo } from '@/components/atoms/Logo'
import { site } from '@/lib/siteData'

const b = site.business
const f = site.footer

export function Footer({ logoAvailable }: { logoAvailable: boolean }) {
  const year = new Date().getFullYear()
  return (
    // Logo lives on a light bone surface only.
    <footer className="border-t border-ink/10 bg-bone" aria-label="Stopka">
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <a href="#" aria-label="PlumbingCraft, strona główna">
              <Logo available={logoAvailable} showSubtitle />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/60">{f.tagline}</p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-blue">Nawigacja</h3>
            <ul className="mt-4 flex flex-col gap-2.5" role="list">
              {f.quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-ink/70 transition-colors hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-blue">Kontakt</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-ink/70" role="list">
              <li>
                <a href={`tel:${b.phoneHref}`} className="flex items-center gap-2.5 transition-colors hover:text-ink">
                  <Phone size={15} className="text-blue" aria-hidden="true" /> {b.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${b.email}`} className="flex items-center gap-2.5 transition-colors hover:text-ink">
                  <Mail size={15} className="text-blue" aria-hidden="true" /> {b.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={15} className="text-blue" aria-hidden="true" />
                {b.address.street}, {b.address.postal} {b.address.city}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-ink/10 pt-6 text-xs text-ink/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {b.name}. Wszelkie prawa zastrzeżone.</p>
          <p>NIP: {b.nip}</p>
        </div>
      </div>
    </footer>
  )
}
