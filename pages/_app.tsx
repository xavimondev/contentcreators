import 'styles/globals.css'
import { useState } from 'react'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'

function MyApp({
  Component,
  pageProps
}: AppProps<{
  initialSession: Session
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <>
      <DefaultSeo
        title='content.[creators]'
        description='Aquí encontrarás a los mejores creadores de contenido que impulsarán tu carrera en tecnología.'
        defaultTitle='content.[creators]'
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/icons/favicon.ico'
          }
        ]}
        openGraph={{
          type: 'website',
          url: 'https://contentcreators.vercel.app/',
          site_name: 'content.[creators]',
          locale: 'es_ES',
          images: [
            {
              url: '/img/banner.png',
              width: 1920,
              height: 1080,
              type: 'image/png'
            }
          ]
        }}
      />
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Component {...pageProps} />
      </SessionContextProvider>
    </>
  )
}

export default MyApp
