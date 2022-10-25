import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title='content.[creators]'
        description='Aquí encontrarás a los mejores creadores de contenido que impulsarán tu carrera en tecnología.'
        defaultTitle='content.[creators]'
        titleTemplate='%s | 🚀'
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
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
