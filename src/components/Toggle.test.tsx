import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Toggle from './Toggle'

const CustomToggle = () => {
  const [value, setValue] = useState(false)

  return <Toggle checked={value} onChange={(status) => setValue(status)} label="toggle" />
}
test('toggle', () => {
  render(<CustomToggle />)

  const toggleBtn = screen.getByTestId('toggle-btn')
  expect(toggleBtn).toBeInTheDocument()
  expect(toggleBtn).toHaveClass('bg-gray-200')

  userEvent.click(toggleBtn)

  expect(toggleBtn).toHaveClass('bg-indigo-600')
})
