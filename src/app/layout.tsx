import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { siteMetadata, jsonLd } from '@/lib/metadata'

export const metadata = siteMetadata

// Body: Inter (clean, highly readable). Headings: Space Grotesk (refined grotesk).
// NOTE: To match the exact brief (Satoshi / General Sans), swap the display font for a
// self-hosted Fontshare face via next/font/local, keeping the `--font-grotesk` variable.
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${inter.variable} ${grotesk.variable}`}>
      <head>
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="overflow-x-hidden">
        <a href="#main-content" className="skip-link">
          Przejdź do treści
        </a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  )
}
