import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import InputField from './InputField'

test('should render input', () => {
  const props = {
    onChange: () => jest.fn(),
    value: '',
    label: 'Full Name',
    name: 'name',
  }

  render(<InputField {...props} />)

  const textField = screen.getByLabelText(/Full Name/) as HTMLInputElement
  expect(textField).toBeInTheDocument()

  userEvent.type(textField, 'John Doe')
  expect(textField.value).toBe('John Doe')

  userEvent.clear(textField)
  expect(textField.value).toBe('')
})
