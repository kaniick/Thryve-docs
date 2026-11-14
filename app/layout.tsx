import type { Metadata } from 'next'
import { Head } from 'nextra/components'
import 'nextra-theme-docs/style.css'
import './global.css'
import { SITE_URL, asset } from '../site.config.mjs'
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Thryve — Your garden, your rules.', template: '%s — Thryve' },
  description:
    'Local, cloud-free control for Gardyn hydroponic towers: a Rust hardware daemon, a tRPC/REST/MCP server, a web UI, and Home Assistant.',
  openGraph: { siteName: 'Thryve', type: 'website' },
  icons: {
    icon: [
      { url: asset('/brand/thryve-icon-32.png'), sizes: '32x32', type: 'image/png' },
      { url: asset('/brand/thryve-icon-192.png'), sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: asset('/brand/thryve-icon-180.png'), sizes: '180x180', type: 'image/png' }],
  },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head color={{ hue: 145, saturation: 52, lightness: { light: 32, dark: 58 } }} />
      <body>{children}</body>
    </html>
  )
}
