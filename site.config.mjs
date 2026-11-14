// Where the site is published: a GitHub Pages project site at
// https://kaniick.github.io/Thryve-docs/. Every root-relative URL needs BASE_PATH in
// front of it; next/link and Nextra add it to page links, `asset()` adds it to files
// in public/. Build with BASE_PATH= (empty) for a custom domain or a user site.
export const SITE_ORIGIN = 'https://kaniick.github.io'
export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.BASE_PATH ?? '/Thryve-docs'
export const SITE_URL = SITE_ORIGIN + BASE_PATH
/** A file in public/, e.g. asset('/media/core-home.webp'). */
export const asset = (path) =>
  path.startsWith('/') && !path.startsWith('//') ? BASE_PATH + path : path
