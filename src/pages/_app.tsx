import '@/styles/globals.css'
import { AppProps } from 'next/app'


const App = ({ Component, pageProps, ...appProps }: AppProps) => {
  return (
    <div className="App">
      <header className="App-header">        
          <Component {...pageProps}/>        
      </header>
    </div>
  )  
}

export default App;