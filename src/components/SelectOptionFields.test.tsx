import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SelectOptionFields from './SelectOptionFields'

test('should render select option fields', () => {
  const props = {
    onChange: () => jest.fn(),
    defaultValue: '',
    label: 'Status',
    name: 'status',
    options: [
      { value: '', label: 'Default' },
      { value: 'one', label: 'One' },
    ],
  }

  render(<SelectOptionFields {...props} />)

  const SelectField = screen.getByLabelText(/Status/)
  expect(SelectField).toBeInTheDocument()

  const OptionField = screen.getAllByRole('option')
  expect(OptionField).toHaveLength(2)

  userEvent.selectOptions(SelectField, 'One')

  const oneOption = screen.getByRole('option', { name: 'One' }) as HTMLOptionElement
  expect(oneOption.selected).toBe(true)

  userEvent.selectOptions(SelectField, 'Default')

  expect(oneOption.selected).toBe(false)

  const defaultOption = screen.getByRole('option', { name: 'Default' }) as HTMLOptionElement
  expect(defaultOption.selected).toBe(true)
})
