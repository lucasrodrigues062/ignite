import { AppProps } from "next/app"
import { Header } from "../components/Header"
import  "../styles/global.scss"
import { Provider as NexAuthProvider } from 'next-auth/client'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NexAuthProvider session={pageProps.session}>
      <Header/>
      <Component {...pageProps} />
    </NexAuthProvider>
  ) 
}

export default MyApp
