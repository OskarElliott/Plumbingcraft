export interface GalleryImage {
  src: string
  alt: string
  orientation: 'portrait' | 'landscape'
  /** Set server-side: true when the file exists in /public, false when it must render as a placeholder. */
  available: boolean
}

export interface ServiceItem {
  id: string
  icon: string
  title: string
  description: string
  featured?: boolean
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface Testimonial {
  quote: string
  author: string
  placeholder?: boolean
}

export interface TrustItem {
  value: string
  label: string
  placeholder?: boolean
}
