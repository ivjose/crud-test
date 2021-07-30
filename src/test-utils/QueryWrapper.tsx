import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
const Wrapper = ({ children }: { children: JSX.Element }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

export default Wrapper
