import 'styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'content.[creators]',
  description:
    'Aquí encontrarás a los mejores creadores de contenido que impulsarán tu carrera en tecnología.',
  openGraph: {
    title: 'content.[creators]',
    description:
      'Aquí encontrarás a los mejores creadores de contenido que impulsarán tu carrera en tecnología.',
    url: 'https://contentcreators.vercel.app/',
    siteName: 'content.[creators]',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/img/banner.png',
        width: 1920,
        height: 1080,
        type: 'image/png'
      }
    ]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es'>
      <body>
        <>
          {children}
          <Analytics />
        </>
      </body>
    </html>
  )
}
