import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@material-tailwind/react'
import Header from '../components/Navbar'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
        <div className='bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200'>
          <Header />
          <Component {...pageProps} />
        </div>
    </ThemeProvider>
  )
} 
