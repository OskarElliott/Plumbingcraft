import type { Metadata } from 'next'
import { site } from './siteData'

// Intended production domain (not live yet). Safe as metadataBase for the demo.
const SITE_URL = 'https://plumbingcraft.pl'

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PlumbingCraft | Instalacje sanitarne i grzewcze Wrocław, kotłownie i ogrzewanie podłogowe',
    template: '%s | PlumbingCraft',
  },
  description:
    'PlumbingCraft. Kompleksowe wykonawstwo instalacji sanitarnych i grzewczych we Wrocławiu. Kotłownie, ogrzewanie podłogowe, instalacje wodno-kanalizacyjne, uzdatnianie wody. Jakość i terminowość gwarantowane. Tel. 795 601 140.',
  keywords: [
    'instalacje sanitarne Wrocław',
    'ogrzewanie podłogowe Wrocław',
    'kotłownie Wrocław',
    'instalacje grzewcze Wrocław',
    'instalacje wodno-kanalizacyjne Wrocław',
    'uzdatnianie wody Wrocław',
    'zmiękczanie wody Wrocław',
    'wiercenie diamentowe Wrocław',
    'hydraulik Wrocław',
    'instalacje c.o. Wrocław',
  ],
  authors: [{ name: site.business.name }],
  creator: site.business.name,
  publisher: site.business.name,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'PlumbingCraft | Instalacje sanitarne i grzewcze we Wrocławiu',
    description:
      'Kompleksowe wykonawstwo instalacji grzewczych i sanitarnych: kotłownie, ogrzewanie podłogowe, wod-kan, uzdatnianie wody. Jakość i terminowość gwarantowane.',
    url: SITE_URL,
    siteName: site.business.name,
    images: [
      {
        url: '/realizacje/hero-kotlownia.jpg',
        width: 1200,
        height: 630,
        alt: 'PlumbingCraft, kotłownia z miedzianym rozdzielaczem',
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlumbingCraft | Instalacje sanitarne i grzewcze Wrocław',
    description:
      'Kotłownie, ogrzewanie podłogowe, instalacje wod-kan i uzdatnianie wody we Wrocławiu.',
    images: ['/realizacje/hero-kotlownia.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Plumbing & Heating Installation',
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Plumber', 'LocalBusiness'],
  '@id': `${SITE_URL}/#business`,
  name: site.business.name,
  description:
    'Kompleksowe wykonawstwo instalacji sanitarnych i grzewczych w budynkach i mieszkaniach: kotłownie, ogrzewanie podłogowe, instalacje wodno-kanalizacyjne, uzdatnianie wody. Wrocław.',
  url: SITE_URL,
  telephone: site.business.phoneHref,
  email: site.business.email,
  image: `${SITE_URL}/realizacje/hero-kotlownia.jpg`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.business.address.street,
    postalCode: site.business.address.postal,
    addressLocality: site.business.address.city,
    addressRegion: 'Dolnośląskie',
    addressCountry: 'PL',
  },
  areaServed: [{ '@type': 'City', name: 'Wrocław' }],
  geo: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: 51.1079, longitude: 17.0385 },
    geoRadius: '15000',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '17:00',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Usługi PlumbingCraft',
    itemListElement: site.services.items.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        areaServed: { '@type': 'City', name: 'Wrocław' },
      },
    })),
  },
}
