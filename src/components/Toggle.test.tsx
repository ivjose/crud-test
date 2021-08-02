import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Toggle from './Toggle'

const CustomToggle = () => {
  const [value, setValue] = useState(false)

  return <Toggle checked={value} onChange={(status) => setValue(status)} label="toggle" />
}
describe('Toggle', () => {
  test('should render', () => {
    render(<CustomToggle />)

    const toggleBtn = screen.getByTestId('toggle-btn')
    expect(toggleBtn).toBeInTheDocument()

    expect(toggleBtn).toHaveAttribute('aria-checked', 'false')
    expect(toggleBtn).toHaveClass('bg-gray-200')

    userEvent.click(toggleBtn)
    // debug()
    expect(toggleBtn).toHaveAttribute('aria-checked', 'true')
    expect(toggleBtn).toHaveClass('bg-indigo-600')
  })

  test('default value', () => {
    render(<Toggle onChange={() => jest.fn()} label="toggle" />)

    const toggleBtn = screen.getByTestId('toggle-btn')
    expect(toggleBtn).toBeInTheDocument()

    expect(toggleBtn).toHaveAttribute('aria-checked', 'false')
    expect(toggleBtn).toHaveClass('bg-gray-200')
  })
})
