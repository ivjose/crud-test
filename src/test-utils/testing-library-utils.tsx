/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react'

import { QueryClient, QueryClientProvider } from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})
const wrapper = ({ children }: { children: JSX.Element }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const renderWithContext = (ui: JSX.Element, options?: any) => render(ui, { wrapper, ...options })

export * from '@testing-library/react'
export { renderWithContext as render }
