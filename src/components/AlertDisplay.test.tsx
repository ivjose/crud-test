import { render, screen } from '@testing-library/react'

import AlertDisplay from './AlertDisplay'

test('should render default AlertDisplay', () => {
  render(<AlertDisplay />)

  const textDisplay = screen.getByText('default message')
  expect(textDisplay).toBeInTheDocument()

  expect(textDisplay).toHaveClass('text-gray-800')
})

test('should render success AlertDisplay', () => {
  render(<AlertDisplay status="success" message="Success message" />)

  const textDisplay = screen.getByText('Success message')
  expect(textDisplay).toBeInTheDocument()

  expect(textDisplay).toHaveClass('text-green-700')
})

test('should render error AlertDisplay', () => {
  render(<AlertDisplay status="error" message="Error message" />)

  const textDisplay = screen.getByText('Error message')
  expect(textDisplay).toBeInTheDocument()

  expect(textDisplay).toHaveClass('text-red-800')
})
