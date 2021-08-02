/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate, DehydratedState } from 'react-query/hydration'
import type { AppProps } from 'next/app'

import '../styles/globals.css'

type Props = AppProps & DehydratedState
function MyApp({ Component, pageProps }: Props) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}
export default MyApp
