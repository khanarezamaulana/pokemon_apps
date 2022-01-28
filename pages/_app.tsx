import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Header from '../components/Header'
import Head from 'next/head'
import { AppsProvider } from '../context/AppsContext'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pokemon Trip</title>
        <meta name='description' content='Pokemons App by Khana Reza Maulana' />
        <link rel='icon' href='/favicon.ico' />
        <meta  name='viewport' content='width=device-width, initial-scale-1' />
      </Head>
      <AppsProvider>
        <div className='max-w-md mx-auto shadow-lg'>
          <Header />
          <Component {...pageProps} />
        </div>
      </AppsProvider>
    </>
  )
}

export default MyApp
