import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SelectOptionFields from './SelectOptionFields'

describe('Select Option Field', () => {
  test('should render select option fields', () => {
    const props = {
      onChange: () => jest.fn(),
      defaultValue: '',
      label: 'Status',
      name: 'status',
      options: [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
      ],
      defaultOption: {
        label: 'Default',
        value: '',
      },
    }

    render(<SelectOptionFields {...props} />)

    const SelectField = screen.getByLabelText(/Status/)
    expect(SelectField).toBeInTheDocument()

    const OptionField = screen.getAllByRole('option')
    expect(OptionField).toHaveLength(3)

    userEvent.selectOptions(SelectField, 'One')

    const oneOption = screen.getByRole('option', { name: 'One' }) as HTMLOptionElement
    expect(oneOption.selected).toBe(true)

    userEvent.selectOptions(SelectField, 'Default')

    expect(oneOption.selected).toBe(false)

    const defaultOption = screen.getByRole('option', { name: 'Default' }) as HTMLOptionElement
    expect(defaultOption.selected).toBe(true)
  })
  test('should render error message', () => {
    const props = {
      onChange: () => jest.fn(),
      defaultValue: '',
      label: 'Status',
      name: 'status',
      options: [
        { value: '', label: 'Default' },
        { value: 'one', label: 'One' },
      ],
      error: 'Required field',
    }

    render(<SelectOptionFields {...props} />)

    const errorText = screen.getByText('Required field')

    expect(errorText).toBeInTheDocument()
    expect(errorText).toHaveClass('text-red-600')
  })
})
