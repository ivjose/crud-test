import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/solid'

import InputField from '@components/InputField'
import SelectOptionFields from '@components/SelectOptionFields'
import AlertDisplay from '@components/AlertDisplay'

import Toggle from '@components/Toggle'

import { MovieProps } from '@modules/Home/types'
import { getMovieById } from '@modules/Home/api'
import { getCategory } from './api'

import { MoviesCreateProps, FieldTypes } from './types'

const DEFAULT_VALUE = {
  id: 1,
  name: '',
  description: '',
  category: '',
}

function MoviesCreate({ moviesId }: MoviesCreateProps) {
  const { data: dataCategory } = useQuery(['category'], getCategory)

  const { data: dataMovieById } = useQuery(['moviesId', moviesId], () =>
    getMovieById<MovieProps>(moviesId)
  )

  const [fields, setFields] = useState<FieldTypes>(
    moviesId ? { ...dataMovieById } : { ...DEFAULT_VALUE, active: false }
  )
  const [errorFields, setErrorFields] = useState(DEFAULT_VALUE)
  const [status, setStatus] = useState<{
    state?: 'error' | 'success' | 'default' | '' | 'loading'
    message: string
  }>({
    state: '',
    message: '',
  })

  const checkError = (name: string, value: string | number | boolean): string => {
    let errorMessage = ''

    if (!value) {
      errorMessage = 'This is a Required Field'
    }

    return errorMessage
  }

  const updateErrors = (name: string, value: string | number | boolean): void | null => {
    if (name === 'active') return null
    const error = checkError(name, value)

    setErrorFields((prevState) => ({ ...prevState, [name]: error }))
    if (status.state) {
      setStatus({ state: '', message: '' })
    }
  }

  const updateField = (event: React.FormEvent): void | null => {
    const { name, value } = event.target as HTMLInputElement

    setFields((prevState) => ({ ...prevState, [name]: value }))

    updateErrors(name, value)
  }

  const toggleStatus = (status: boolean) => {
    setFields((prevState) => ({ ...prevState, active: status }))
  }

  const handleSubmit = async (e: React.FormEvent): Promise<null | void> => {
    e.preventDefault()

    const propertyNames = Object.entries(fields)
    const errorCheck = []

    propertyNames.forEach(([name, value]) => {
      updateErrors(name, value)
      const error = checkError(name, value)
      if (error) errorCheck.push({ name, error })
    })

    if (errorCheck.length > 1) {
      return null
    }

    console.log(errorFields, fields, 'DDDDDDDDDdd')
    setStatus({ state: 'loading', message: '' })
    try {
      const response = await axios.get<MovieProps[]>('http://localhost:3030/movies')

      if (moviesId) {
        await axios.put(`http://localhost:3030/movies/${moviesId}`, {
          ...fields,
        })
      } else {
        await axios.post('http://localhost:3030/movies', {
          ...fields,
          id: response.data.length + 1,
        })
      }

      setStatus({ state: 'success', message: 'Successfully save' })

      !moviesId && setFields({ ...DEFAULT_VALUE, active: false })
    } catch (error) {
      setStatus({ state: 'error', message: 'Failed to save' })
    }
  }

  console.log(fields, 'DDDDDDDDDDDDd')

  return (
    <div>
      <div className="mb-4">
        <Link href="/">
          <a className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <ChevronLeftIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Back
          </a>
        </Link>
      </div>
      {status.state && status.message && (
        <AlertDisplay status={status.state} message={status.message} />
      )}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <InputField
            name="name"
            label="Name"
            type="text"
            onChange={updateField}
            value={fields.name}
            error={errorFields.name}
          />
        </div>

        <div>
          <InputField
            name="description"
            label="Description"
            type="textarea"
            onChange={updateField}
            value={fields.description}
            error={errorFields.description}
          />
        </div>

        <div>
          <Toggle label="Status" checked={fields.active} onChange={toggleStatus} />
        </div>

        <div>
          <SelectOptionFields
            label="Category"
            name="category"
            value={fields.category}
            onChange={updateField}
            options={dataCategory || []}
            defaultOption={{
              label: 'Select Category',
              value: '',
            }}
            error={errorFields.category}
          />
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default MoviesCreate
