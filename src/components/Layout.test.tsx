import { render, screen } from '@testing-library/react'
import Layout from './Layout'

it('renders "Layout"', () => {
  render(
    <Layout title="Page Title">
      <div>My Content</div>
    </Layout>
  )
  const pageTitle = screen.getByRole('heading', { name: /Page Title/ })
  expect(pageTitle).toBeInTheDocument()

  const childComponent = screen.getByText(/My Content/)
  expect(childComponent).toBeInTheDocument()
})
