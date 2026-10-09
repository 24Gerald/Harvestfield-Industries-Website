import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Manrope } from 'next/font/google'
import { MotionProvider } from '@/components/motion-provider'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { basePath } from '@/lib/site-data'
import './globals.css'

const sans = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-instrument', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'Harvestfield | Growing a better tomorrow',
    template: '%s | Harvestfield',
  },
  description: 'Harvestfield connects Africa\'s finest farmers to the world through responsible sourcing and exceptional agricultural products.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: `${basePath}/icon-light-32x32.png`,
        media: '(prefers-color-scheme: light)',
      },
      {
        url: `${basePath}/icon-dark-32x32.png`,
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: `${basePath}/icon.svg`,
        type: 'image/svg+xml',
      },
    ],
    apple: `${basePath}/apple-icon.png`,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#173c2b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable}`}>
      <body className="antialiased">
        <SiteHeader />
        <main id="main" className="min-h-screen overflow-x-clip">{children}</main>
        <SiteFooter />
        <MotionProvider />
        {/* Vercel Analytics only exists on Vercel; the GitHub Pages build (which has a base path) skips it */}
        {process.env.NODE_ENV === 'production' && !basePath && <Analytics />}
      </body>
    </html>
  )
}
