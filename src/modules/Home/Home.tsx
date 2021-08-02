import { useState } from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { PlusIcon, TrashIcon } from '@heroicons/react/solid'
import { useDebouncedCallback } from 'use-debounce'

import InputField from '@components/InputField'
import Table from '@components/Table'
import SelectOptionFields from '@components/SelectOptionFields'
import Modal from '@components/Modal'
import { getMovies, deleteMovieById } from './api'
import { MovieProps } from './types'

type Params = {
  q?: string
  active?: string
}

function Home() {
  const { query, ...router } = useRouter()
  const [searchText, setSearchText] = useState<string | string[]>(query['q'] || '')
  const [params, setParams] = useState<Params | null>(query || null)
  const [modal, setModal] = useState(false)
  const [deleteItems, setDeleteItems] = useState<number[]>([])

  const { data, refetch } = useQuery(['movies', query], () => getMovies<MovieProps>(query))

  const handleOpenModal = () => {
    setModal(true)
  }

  const handleEdit = async (id: number) => {
    await router.push({
      pathname: `/movies/${id}/edit`,
    })
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

  const handleCloseModal = () => {
    setModal(false)
  }

  const handleTriggerDeleteApi = async (id: string) => {
    await deleteMovieById<string>(id)
  }

  const handleDeleteAll = (): Promise<void> => {
    return Promise.all(deleteItems.map((currentId) => handleTriggerDeleteApi(`${currentId}`))).then(
      () => {
        handleReset()
      }
    )
  }

  const handleReset = () => {
    setDeleteItems([])
    setModal(true)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refetch()
  }

  const toggleCheckbox = (event: React.FormEvent) => {
    const { name, checked } = event.currentTarget as HTMLInputElement

    const selectedValue: number = parseInt(name.replace(/movie-/g, ''), 10)

    if (checked) {
      setDeleteItems((prevState) => [...prevState, selectedValue])
    } else {
      setDeleteItems((prevState) => prevState.filter((item) => item !== selectedValue))
    }
  }

  const isDisabledButton = deleteItems.length > 0 ? false : true

  return (
    <div>
      <Modal
        open={modal}
        setOpen={setModal}
        message={`Are sure you want to delete selected items(${deleteItems.length})`}
        title="Delete Selected Item"
        actionButton={[
          {
            label: 'Yes',
            type: 'primary',
            onClick: handleDeleteAll,
          },
          {
            label: 'Cancel',
            type: 'secondary',
            onClick: handleCloseModal,
            cancel: true,
          },
        ]}
      />
      <Table data={data} onEdit={handleEdit} toggleCheckbox={toggleCheckbox}>
        <>
          <div className="mb-4 space-x-4 text-right">
            <button
              type="button"
              onClick={handleOpenModal}
              disabled={isDisabledButton}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium leading-4  border border-transparent rounded-md shadow-sm   focus:outline-none focus:ring-2 focus:ring-offset-2 text-white   ${
                isDisabledButton
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
              }`}
            >
              <TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Delete all ({deleteItems.length})
            </button>
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
