import { render, screen } from '@testing-library/react'
import Layout from './Layout'

describe('Layout', () => {
  it('renders "Layout with Title"', () => {
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

  it('renders "Layout without Title"', () => {
    render(<Layout />)
    const pageTitle = screen.getByRole('heading', { name: /Dashboard/ })
    expect(pageTitle).toBeInTheDocument()
  })
})
