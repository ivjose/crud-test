/* eslint-disable jest/no-export */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import userEvent from '@testing-library/user-event'
import 'intersection-observer'
import { screen, render, waitFor, act, within } from '../../test-utils/testing-library-utils'

import Home from './Home'

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('next/router', () => require('next-router-mock'))
// jest.useFakeTimers('modern')

describe('Home', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('render home with initial value', async () => {
    render(<Home />)

    expect(screen.getByLabelText('Search')).toBeInTheDocument()
    expect(screen.getByLabelText('Status')).toBeInTheDocument()

    expect(screen.getByRole('link', { name: /Movie/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /delete all/i })).toBeDisabled()

    const defaultTable = await screen.findAllByRole('row')

    const defaultMessage = within(defaultTable[1]).getByText('...No data Results')
    expect(defaultMessage).toBeInTheDocument()

    await waitFor(async () => {
      const tableData = await screen.findAllByRole('row')

      expect(tableData).toHaveLength(4)
    })
  })

  test('search movies', async () => {
    render(<Home />)

    await waitFor(async () => {
      const tableData = await screen.findAllByRole('row')
      expect(tableData).toHaveLength(4)
    })

    const searchField = screen.getByLabelText('Search')
    userEvent.type(searchField, 'The Tomorrow War')

    await waitFor(
      async () => {
        const newTableData = await screen.findAllByRole('row')
        expect(newTableData).toHaveLength(2)

        const searchData = within(newTableData[1]).getByText('The Tomorrow War')
        expect(searchData).toBeInTheDocument()
      },
      { timeout: 1200 }
    )

    userEvent.clear(searchField)

    await waitFor(
      async () => {
        const newTableData = await screen.findAllByRole('row')
        expect(newTableData).toHaveLength(4)
      },
      { timeout: 1200 }
    )
  })

  test('filter status active', async () => {
    await act(async () => {
      render(<Home />)

      const SelectField = screen.getByLabelText(/Status/)
      expect(SelectField).toBeInTheDocument()

      userEvent.selectOptions(SelectField, 'Active')

      await waitFor(
        async () => {
          const tableData = await screen.findAllByRole('row')
          expect(tableData).toHaveLength(3)

          const firstDataActive = within(tableData[1]).getByText('active')
          expect(firstDataActive).toHaveClass('text-green-800 bg-green-100')

          const secondDataActive = within(tableData[2]).getByText('active')
          expect(secondDataActive).toHaveClass('text-green-800 bg-green-100')
        },
        { timeout: 1200 }
      )

      userEvent.selectOptions(SelectField, '')

      await waitFor(
        async () => {
          const newTableData = await screen.findAllByRole('row')
          expect(newTableData).toHaveLength(4)
        },
        { timeout: 1200 }
      )
    })
  })

  test('Delete item successfully', async () => {
    render(<Home />)

    const deleteAllButton = screen.getByRole('button', { name: /delete all/i })
    expect(deleteAllButton).toBeDisabled()

    await waitFor(async () => {
      const tableData = await screen.findAllByRole('row')
      expect(tableData).toHaveLength(4)
    })

    const checkBox = screen.getByLabelText('movie-1')
    expect(checkBox).not.toBeChecked()
    userEvent.click(checkBox)
    expect(checkBox).toBeChecked()

    const checkBox2 = screen.getByLabelText('movie-2')
    expect(checkBox2).not.toBeChecked()
    userEvent.click(checkBox2)
    expect(checkBox2).toBeChecked()

    expect(deleteAllButton).not.toBeDisabled()
    userEvent.click(deleteAllButton)

    const modalContainer = screen.getByRole('dialog')
    expect(modalContainer).toBeInTheDocument()

    const deleteModalButton = screen.getByRole('button', { name: 'Yes' })
    expect(deleteModalButton).toBeInTheDocument()

    const cancelModalButton = screen.getByRole('button', { name: 'Cancel' })
    expect(cancelModalButton).toBeInTheDocument()

    userEvent.click(deleteModalButton)

    await waitFor(
      async () => {
        const successMessage = await screen.findByText('Successfully Delete')
        expect(successMessage).toBeInTheDocument()
      },
      { timeout: 1200 }
    )
  })

  test('Toggle modal delete and reselect checkbox', async () => {
    render(<Home />)

    const deleteAllButton = screen.getByRole('button', { name: /delete all/i })
    expect(deleteAllButton).toBeInTheDocument()

    await waitFor(async () => {
      const tableData = await screen.findAllByRole('row')
      expect(tableData).toHaveLength(4)
    })

    const checkBoxAll = screen.getAllByRole('checkbox')
    expect(checkBoxAll).toHaveLength(3)

    userEvent.click(checkBoxAll[1])
    expect(checkBoxAll[1]).toBeChecked()

    userEvent.click(checkBoxAll[1])

    expect(checkBoxAll[1]).not.toBeChecked()

    userEvent.click(checkBoxAll[2])
    expect(checkBoxAll[2]).toBeChecked()

    userEvent.click(deleteAllButton)

    const modalDialog = screen.getByRole('dialog')
    expect(modalDialog).toBeInTheDocument()

    const cancelModalButton = screen.getByRole('button', { name: 'Cancel' })
    expect(cancelModalButton).toBeInTheDocument()

    userEvent.click(cancelModalButton)

    expect(modalDialog).not.toBeInTheDocument()
  })

  test('filter status inactive', async () => {
    render(<Home />)

    const initialTable = screen.getAllByRole('row')
    expect(initialTable).toHaveLength(2)

    const SelectField = screen.getByLabelText(/Status/)
    expect(SelectField).toBeInTheDocument()

    userEvent.selectOptions(SelectField, 'Inactive')

    await waitFor(
      async () => {
        const tableData = await screen.findAllByRole('row')
        expect(tableData).toHaveLength(2)

        const firstDataActive = within(tableData[1]).getByText('inactive')
        expect(firstDataActive).toHaveClass('text-red-800 bg-red-100')
      },
      { timeout: 1200 }
    )
  })
})
