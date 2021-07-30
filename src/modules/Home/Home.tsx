import { useState } from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/solid'
import { useDebouncedCallback } from 'use-debounce'

import InputField from '@components/InputField'
import Table from '@components/Table'
import SelectOptionFields from '@components/SelectOptionFields'
import { getMovies } from './api'
import { MovieProps } from './types'

type Params = {
  q?: string
  active?: string
}

function Home() {
  const { query, ...router } = useRouter()
  const [searchText, setSearchText] = useState<string | string[]>(query['q'] || '')
  const [params, setParams] = useState<Params | null>(query || null)

  const { data } = useQuery(['movies', query], () => getMovies<MovieProps>(query))

  const handleDelete = (id: number) => {
    console.log(id, 'Delete')
  }

  const handleEdit = (id: number) => {
    console.log(id, 'Edit')
  }

  const handleFilterStatus = async (event: React.FormEvent<HTMLSelectElement>): Promise<void> => {
    const { value } = event.target as HTMLSelectElement
    if (value) {
      await router.push({
        pathname: '/',
        query: { ...params, active: `${value}` },
      })

      setParams((prevState) => ({
        ...prevState,
        active: `${value}`,
      }))
    } else {
      const newParams = { ...params }
      delete newParams['active']

      await router.push({
        pathname: '/',
        query: { ...newParams },
      })
      setParams({ ...newParams })
    }
  }

  const handleSearchText = useDebouncedCallback(async (event: React.FormEvent): Promise<void> => {
    const { value } = event.target as HTMLInputElement

    if (value.trim()) {
      await router.push({
        pathname: '/',
        query: { ...params, q: `${value}` },
      })

      setSearchText(value)
      setParams((prevState) => ({
        ...prevState,
        q: `${value}`,
      }))
    } else {
      const newParams = { ...params }
      delete newParams['q']

      await router.push({
        pathname: '/',
        query: { ...newParams },
      })
      setSearchText('')
      setParams({ ...newParams })
    }
  }, 1000)

  // console.log(data, 'data')

  return (
    <div>
      <Table data={data} onDelete={handleDelete} onEdit={handleEdit}>
        <>
          <div className="mb-4 text-right">
            <Link href="/movies/create">
              <a className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                Movie
              </a>
            </Link>
          </div>
          <div className="flex flex-col mb-4 lg:flex-row">
            <div className="flex-1 mb-4 lg:mb-0">
              <InputField
                label="Search"
                name="search"
                type="search"
                defaultValue={searchText}
                onChange={handleSearchText}
              />
            </div>
            <div className="lg:w-52 lg:ml-4">
              <SelectOptionFields
                label="Status"
                name="active"
                defaultValue={params?.active}
                onChange={handleFilterStatus}
                options={[
                  {
                    label: 'All',
                    value: '',
                  },
                  {
                    label: 'Active',
                    value: 'true',
                  },
                  {
                    label: 'Inactive',
                    value: 'false',
                  },
                ]}
              />
            </div>
          </div>
        </>
      </Table>
    </div>
  )
}

export default Home
