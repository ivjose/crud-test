import { GetServerSideProps } from 'next'

import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import Home from '@modules/Home'
import { getMovies } from '@modules/Home/api'
import Layout from '@components/Layout'

export default function HomePage() {
  return (
    <Layout title="Movies">
      <Home />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['movies', query], () => getMovies(query))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
