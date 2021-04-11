import '../styles/globals.css'
import {FronteggProvider} from "@frontegg/react-hooks";
import {initialize} from "@frontegg/admin-portal";

const options = {
  baseUrl: 'https://[YOUR-SUBDOMAIN].frontegg.com',
  requestCredentials: 'include'
};

const app = initialize({
  contextOptions: options,
  version: 'next'
})


function MyApp({ Component, pageProps }) {
  return <FronteggProvider app={app}>
    <Component {...pageProps} />
  </FronteggProvider>
}

export default MyApp
