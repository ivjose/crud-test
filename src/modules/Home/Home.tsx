import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { SearchIcon } from '@heroicons/react/solid'

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
      <Table data={data} onDelete={handleDelete} onEdit={handleEdit}>
        <div className="flex flex-col mb-4 lg:flex-row">
          <div className="flex-1 mb-4 lg:mb-0">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Search
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full pl-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="lg:w-52 lg:ml-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="location"
              name="location"
              className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              defaultValue="Canada"
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </Table>
    </div>
  )
}

export default Home
