import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import InputField from './InputField'

describe('Input Field', () => {
  test('should render input', () => {
    const props = {
      onChange: () => jest.fn(),
      defaultValue: '',
      label: 'Full Name',
      name: 'name',
      placeholder: 'Enter your full name',
    }

    render(<InputField {...props} />)

    const placeholderText = screen.queryByPlaceholderText(/enter your full name/i)
    expect(placeholderText).toBeInTheDocument()

    const textField = screen.getByLabelText(/Full Name/) as HTMLInputElement
    expect(textField).toBeInTheDocument()

    userEvent.type(textField, 'John Doe')
    expect(textField.value).toBe('John Doe')

    userEvent.clear(textField)
    expect(textField.value).toBe('')
  })

  test('should render error message', () => {
    const props = {
      onChange: () => jest.fn(),
      defaultValue: '',
      label: 'Full Name',
      name: 'name',
      error: 'Required field',
    }

    render(<InputField {...props} />)

    const errorText = screen.getByText('Required field')

    expect(errorText).toBeInTheDocument()
    expect(errorText).toHaveClass('text-red-600')
  })

  test('should render search input', () => {
    const props = {
      onChange: () => jest.fn(),
      defaultValue: '',
      label: 'Search',
      name: 'search',
      type: 'search',
    }

    render(<InputField {...props} />)

    const searchField = screen.getByLabelText(/search/i) as HTMLInputElement
    expect(searchField).toBeInTheDocument()

    const searchIcon = screen.getByTestId('searchIcon')
    expect(searchIcon).toBeInTheDocument()
  })

  test('should render textarea input', () => {
    const props = {
      onChange: () => jest.fn(),
      defaultValue: '',
      label: 'Comments',
      name: 'comments',
      type: 'textarea',
      rows: 4,
    }

    render(<InputField {...props} />)

    const commentsField = screen.getByLabelText(/comments/i) as HTMLTextAreaElement
    expect(commentsField).toHaveAttribute('rows', '4')
  })
})
