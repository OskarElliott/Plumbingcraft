import { Phone, Mail, MapPin } from 'lucide-react'
import { Wordmark } from '@/components/atoms/Wordmark'
import { site } from '@/lib/siteData'

const b = site.business
const f = site.footer

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-ink-900" aria-label="Stopka">
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <a href="#" aria-label="PlumbingCraft, strona główna" className="text-xl">
              <Wordmark tone="light" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{f.tagline}</p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-copper">Nawigacja</h3>
            <ul className="mt-4 flex flex-col gap-2.5" role="list">
              {f.quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-bone/70 transition-colors hover:text-bone">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-copper">Kontakt</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-bone/70" role="list">
              <li>
                <a href={`tel:${b.phoneHref}`} className="flex items-center gap-2.5 transition-colors hover:text-bone">
                  <Phone size={15} className="text-copper" aria-hidden="true" /> {b.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${b.email}`} className="flex items-center gap-2.5 transition-colors hover:text-bone">
                  <Mail size={15} className="text-copper" aria-hidden="true" /> {b.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={15} className="text-copper" aria-hidden="true" />
                {b.address.street}, {b.address.postal} {b.address.city}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {b.name}. Wszelkie prawa zastrzeżone.</p>
          <p>NIP: {b.nip}</p>
        </div>
      </div>
    </footer>
  )
}
