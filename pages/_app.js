import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'

export default function MyApp({ Component, pageProps}) {
  return ( <div className='bg-slate-200 h-screen'><SessionProvider session={pageProps.session}>
  
    <Component {...pageProps} /> 
 
  </SessionProvider></div>)
}
