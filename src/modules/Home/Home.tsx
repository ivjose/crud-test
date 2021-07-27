import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

import Table from '@components/Table'
import { getMovies } from './api'
import { MovieProps } from './types'

function Home() {
  const { query } = useRouter()

  const { data } = useQuery(['movies', query], () => getMovies<MovieProps>(query))

  const handleDelete = (id: number) => {
    console.log(id, 'Delete')
  }

  const handleEdit = (id: number) => {
    console.log(id, 'Edit')
  }

  return (
    <div>
      <Table data={data} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  )
}

export default Home
