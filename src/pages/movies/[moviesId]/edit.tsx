import { GetServerSideProps } from 'next'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import Layout from '@components/Layout'

import MoviesCreate from '@modules/Movies/MoviesCreate'

import { MoviesCreateProps } from '@modules/Movies/MoviesCreate/types'
import { getMovieById } from '@modules/Home/api'

const MoviesEditPage = ({ moviesId }: MoviesCreateProps) => {
  console.log(moviesId)

  return (
    <Layout title="Edit movie">
      <MoviesCreate moviesId={moviesId} />{' '}
    </Layout>
  )
}

type Params = {
  moviesId: string
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { moviesId } = params as Params

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['moviesId', moviesId], () => getMovieById(moviesId))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      moviesId,
    },
  }
}

export default MoviesEditPage
