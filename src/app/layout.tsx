import 'styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { AUTH_REDIRECT } from 'global/constants'

export const metadata: Metadata = {
  metadataBase: new URL(AUTH_REDIRECT),
  title: 'content.[creators]',
  description:
    'Aquí encontrarás a los mejores creadores de contenido en español que te ayudarán en tu crecimiento como profesional.',
  openGraph: {
    title: 'content.[creators]',
    description:
      'Aquí encontrarás a los mejores creadores de contenido en español que te ayudarán en tu crecimiento como profesional.',
    url: 'https://contentcreators.vercel.app/',
    siteName: 'content.[creators]',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/img/banner.png',
        width: 1578,
        height: 849,
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
