import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title='Content creators'
        description='Aquí encontrarás a los mejores creadores de contenido que impulsarán tu carrera en tecnología'
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
