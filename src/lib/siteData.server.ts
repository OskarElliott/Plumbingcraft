import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import raw from './siteData.json'
import type { GalleryImage } from '@/types'

/**
 * Server-side augmentation of siteData.
 *
 * Marks each gallery image (and the hero image) with an `available` flag by checking
 * whether the file exists in /public. Missing files render as deliberate slate
 * placeholders (never stock photos) so gaps are obvious until the real photography lands.
 */

function fileExists(publicPath: string): boolean {
  try {
    const clean = publicPath.replace(/^\//, '')
    return fs.existsSync(path.join(process.cwd(), 'public', clean))
  } catch {
    return false
  }
}

export type SiteData = typeof raw & {
  gallery: (typeof raw)['gallery'] & { images: GalleryImage[] }
  hero: (typeof raw)['hero'] & { imageAvailable: boolean }
  logoAvailable: boolean
}

export function getSiteData(): SiteData {
  const images: GalleryImage[] = raw.gallery.images.map((img) => ({
    ...(img as Omit<GalleryImage, 'available'>),
    available: fileExists(img.src),
  }))

  return {
    ...raw,
    logoAvailable: fileExists('/logo.png'),
    hero: { ...raw.hero, imageAvailable: fileExists(raw.hero.image) },
    gallery: { ...raw.gallery, images },
  } as SiteData
}
