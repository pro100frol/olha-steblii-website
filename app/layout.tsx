import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://olhasteblii.com'),
  title: 'Olha Steblii | Fine Line Tattoo Artist in London',
  description: 'Fine line, blackwork and botanical tattoos by Olha Steblii at Origin Tattoo in London Bridge. Explore her work and request a booking.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Olha Steblii | Fine Line Tattoo Artist in London',
    description: 'Fine line, blackwork and botanical tattoos by Olha Steblii at Origin Tattoo in London Bridge.',
    url: 'https://olhasteblii.com/',
    siteName: 'Olha Steblii Tattoo',
    locale: 'en_GB',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && <SpeedInsights />}
      </body>
    </html>
  )
}
