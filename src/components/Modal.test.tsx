import { useState } from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Modal from './Modal'

const CustomModal = ({ handleAction }: { handleAction: () => void }) => {
  const [open, setOpen] = useState(false)
  const toggleModal = () => setOpen((prevState) => !prevState)

  return (
    <>
      <button type="button" onClick={toggleModal}>
        open modal
      </button>
      <Modal
        open={open}
        setOpen={toggleModal}
        message="Sample message"
        title="Hello world"
        actionButton={[
          {
            label: 'Button primary',
            type: 'primary',
            onClick: handleAction,
          },
          {
            label: 'Button secondary',
            type: 'secondary',
            onClick: handleAction,
          },
        ]}
      />
    </>
  )
}

describe('Modal', () => {
  test('Render', () => {
    const actionEvent = jest.fn()
    render(<CustomModal handleAction={actionEvent} />)

    const openModalButton = screen.getByRole('button', { name: /open modal/i })
    userEvent.click(openModalButton)

    const modalContainer = screen.getByRole('dialog')
    expect(modalContainer).toBeInTheDocument()

    const modalHeader = screen.getByRole('heading', { name: 'Hello world' })
    expect(modalHeader).toBeInTheDocument()

    const modalDescription = screen.getByText('Hello world')
    expect(modalDescription).toBeInTheDocument()

    const modalPrimaryButton = screen.getByRole('button', { name: 'Button primary' })
    expect(modalPrimaryButton).toHaveClass(
      'bg-red-600 focus:ring-red-500 hover:bg-red-700 border-transparent'
    )

    userEvent.click(modalPrimaryButton)

    expect(actionEvent).toHaveBeenCalled()

    const modalSecondaryButton = screen.getByRole('button', { name: 'Button secondary' })
    expect(modalSecondaryButton).toHaveClass(
      'text-gray-700 bg-white border-gray-300 hover:bg-gray-50 focus:ring-indigo-500'
    )
  })
})
