/* eslint-disable @typescript-eslint/no-unsafe-call */
import userEvent from '@testing-library/user-event'
import 'intersection-observer'
import { rest } from 'msw'

import { screen, render, waitFor, act } from '../../../test-utils/testing-library-utils'

import { server } from '../../../mocks/server'
import MoviesCreate from './MoviesCreate'

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('next/router', () => require('next-router-mock'))

describe('MoviesCreate', () => {
  test('Render Create forms', async () => {
    render(<MoviesCreate />)

    const fieldName = screen.getByLabelText(/name/i)
    expect(fieldName).toBeInTheDocument()

    const fieldDescription = screen.getByLabelText(/description/i)
    expect(fieldDescription).toBeInTheDocument()

    const selectionCategory = screen.getByLabelText(/category/i)
    expect(selectionCategory).toBeInTheDocument()

    const statusToggle = screen.getByTestId(/toggle-btn/i)
    expect(statusToggle).toBeInTheDocument()

    const submitButton = screen.getByRole('button', { name: /submit/i })
    expect(submitButton).toBeInTheDocument()

    userEvent.click(submitButton)

    const errorMessages = screen.getAllByText('This is a Required Field')
    expect(errorMessages).toHaveLength(3)

    userEvent.type(fieldName, 'John Doe')
    userEvent.type(fieldDescription, 'Hello World')
    await waitFor(async () => {
      userEvent.selectOptions(selectionCategory, 'Fantasy')

      const optionSelected = (await screen.findByRole('option', {
        name: 'Fantasy',
      })) as HTMLOptionElement
      expect(optionSelected.selected).toBe(true)
    })

    const checkErrorMessage = screen.queryByText('This is a Required Field')
    expect(checkErrorMessage).not.toBeInTheDocument()
  })

  test('Submit Create forms', async () => {
    render(<MoviesCreate />)

    const fieldName = screen.getByLabelText(/name/i) as HTMLInputElement
    userEvent.type(fieldName, 'John Doe')
    expect(fieldName.value).toBe('John Doe')

    const fieldDescription = screen.getByLabelText(/description/i) as HTMLTextAreaElement
    userEvent.type(fieldDescription, 'Hello World')
    expect(fieldDescription.value).toBe('Hello World')

    const selectionCategory = screen.getByLabelText(/category/i)

    await waitFor(async () => {
      userEvent.selectOptions(selectionCategory, 'Fantasy')

      const optionSelected = (await screen.findByRole('option', {
        name: 'Fantasy',
      })) as HTMLOptionElement
      expect(optionSelected.selected).toBe(true)
    })

    const OptionField = screen.getAllByRole('option')
    expect(OptionField).toHaveLength(8)

    const statusToggle = screen.getByTestId(/toggle-btn/i)
    userEvent.click(statusToggle)
    expect(statusToggle).toHaveAttribute('aria-checked', 'true')
    expect(statusToggle).toHaveClass('bg-indigo-600')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    userEvent.click(submitButton)

    await waitFor(
      async () => {
        const displayMessageSuccess = await screen.findByText('Successfully save')

        expect(displayMessageSuccess).toBeInTheDocument()
      },
      { timeout: 1200 }
    )

    expect(fieldName.value).toBe('')

    expect(fieldDescription.value).toBe('')

    expect(statusToggle).toHaveAttribute('aria-checked', 'false')
    expect(statusToggle).toHaveClass('bg-gray-200')

    const optionUnSelected = screen.getByRole('option', {
      name: 'Fantasy',
    }) as HTMLOptionElement
    expect(optionUnSelected.selected).toBe(false)
  })

  test('Submit Update forms success', async () => {
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => render(<MoviesCreate moviesId="2" />))

    const fieldName = (await screen.findByLabelText(/name/i)) as HTMLInputElement
    expect(fieldName).toHaveValue('Dirty Grandpa')

    const fieldDescription = (await screen.findByLabelText(/description/i)) as HTMLTextAreaElement
    expect(fieldDescription).toHaveValue('Short description')

    const statusToggle = (await screen.findByTestId('toggle-btn')) as HTMLInputElement
    expect(statusToggle).toHaveAttribute('aria-checked', 'true')
    expect(statusToggle).toHaveClass('bg-indigo-600')

    const optionSelected = (await screen.findByRole('option', {
      name: 'Comedy',
    })) as HTMLOptionElement
    expect(optionSelected.selected).toBe(true)

    userEvent.clear(fieldName)
    userEvent.type(fieldName, 'Sam Smith')
    expect(fieldName).toHaveValue('Sam Smith')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    userEvent.click(submitButton)

    await waitFor(
      async () => {
        const displayMessageSuccess = await screen.findByText('Successfully updated')

        expect(displayMessageSuccess).toBeInTheDocument()
      },
      { timeout: 1200 }
    )
  })

  test('Submit Update forms failed', async () => {
    // eslint-disable-next-line @typescript-eslint/require-await

    server.resetHandlers(
      //   rest.put('http://localhost:3030/movies/2', (req, res, ctx) => res(ctx.status(400)))
      rest.get('http://localhost:3030/category', (req, res, ctx) => {
        return res(
          ctx.json([
            {
              id: 1,
              name: 'Action',
            },
            {
              id: 2,
              name: 'Comedy',
            },
            {
              id: 3,
              name: 'Drama',
            },
            {
              id: 4,
              name: 'Fantasy',
            },
            {
              id: 5,
              name: 'Horror',
            },
            {
              id: 6,
              name: 'Mystery',
            },
            {
              id: 6,
              name: 'Thriller',
            },
          ])
        )
      }),
      rest.put('http://localhost:3030/movies/2', (req, res, ctx) => {
        return res(ctx.status(400))
      }),
      rest.get('http://localhost:3030/movies/2', (req, res, ctx) => {
        return res(
          ctx.json({
            id: 2,
            name: 'Dirty Grandpa',
            active: true,
            description: 'Short description',
            category: 'comedy',
          })
        )
      })
    )
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => render(<MoviesCreate moviesId="2" />))

    const fieldName = (await screen.findByLabelText(/name/i)) as HTMLInputElement
    expect(fieldName).toHaveValue('Dirty Grandpa')

    const fieldDescription = (await screen.findByLabelText(/description/i)) as HTMLTextAreaElement
    expect(fieldDescription).toHaveValue('Short description')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    userEvent.click(submitButton)

    await waitFor(
      async () => {
        const displayMessageError = await screen.findByText('Failed to update')

        expect(displayMessageError).toBeInTheDocument()
      },
      { timeout: 1200 }
    )

    userEvent.clear(fieldName)
    userEvent.type(fieldName, 'Sam Smith')

    const noErrorMessage = screen.queryByText('Failed to update')
    expect(noErrorMessage).not.toBeInTheDocument()
  })

  test('Delete movie success', async () => {
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => render(<MoviesCreate moviesId="2" />))

    const deleteButton = screen.getByRole('button', { name: 'Delete' })
    expect(deleteButton).toBeInTheDocument()

    userEvent.click(deleteButton)

    const modalContainer = screen.getByRole('dialog')
    expect(modalContainer).toBeInTheDocument()

    const deleteModalButton = screen.getByRole('button', { name: 'Yes' })
    expect(deleteModalButton).toBeInTheDocument()

    const cancelModalButton = screen.getByRole('button', { name: 'Cancel' })
    expect(cancelModalButton).toBeInTheDocument()

    userEvent.click(deleteModalButton)

    await waitFor(
      async () => {
        const displayMessageError = await screen.findByText('Successfully Delete')
        expect(displayMessageError).toBeInTheDocument()
      },
      { timeout: 1200 }
    )
  })

  test('Delete movie failed', async () => {
    server.resetHandlers(
      //   rest.put('http://localhost:3030/movies/2', (req, res, ctx) => res(ctx.status(400)))
      rest.get('http://localhost:3030/category', (req, res, ctx) => {
        return res(
          ctx.json([
            {
              id: 1,
              name: 'Action',
            },
            {
              id: 2,
              name: 'Comedy',
            },
            {
              id: 3,
              name: 'Drama',
            },
            {
              id: 4,
              name: 'Fantasy',
            },
            {
              id: 5,
              name: 'Horror',
            },
            {
              id: 6,
              name: 'Mystery',
            },
            {
              id: 6,
              name: 'Thriller',
            },
          ])
        )
      }),
      rest.get('http://localhost:3030/movies/2', (req, res, ctx) => {
        return res(
          ctx.json({
            id: 2,
            name: 'Dirty Grandpa',
            active: true,
            description: 'Short description',
            category: 'comedy',
          })
        )
      }),
      rest.delete('http://localhost:3030/movies/2', (req, res, ctx) => {
        return res(ctx.status(400))
      })
    )
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => render(<MoviesCreate moviesId="2" />))

    const deleteButton = screen.getByRole('button', { name: 'Delete' })
    expect(deleteButton).toBeInTheDocument()

    userEvent.click(deleteButton)

    const modalContainer = screen.getByRole('dialog')
    expect(modalContainer).toBeInTheDocument()

    const deleteModalButton = screen.getByRole('button', { name: 'Yes' })
    expect(deleteModalButton).toBeInTheDocument()

    const cancelModalButton = screen.getByRole('button', { name: 'Cancel' })
    expect(cancelModalButton).toBeInTheDocument()

    userEvent.click(deleteModalButton)

    await waitFor(
      async () => {
        const displayMessageError = await screen.findByText('Failed to Delete')
        expect(displayMessageError).toBeInTheDocument()
      },
      { timeout: 1200 }
    )
  })
})
