import raw from './siteData.json'

/**
 * Single source of truth (client-safe).
 *
 * Every component reads copy/contact/services from here. This module must stay free of
 * Node built-ins (fs/path) so it can be imported into client components. The server-only
 * image-existence check lives in `siteData.server.ts`.
 */
export const site = raw
export type RawSiteData = typeof raw
