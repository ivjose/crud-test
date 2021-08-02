import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Table, { DataProps } from './Table'

// import {} from '@modules/Home/types'

const sampleData = [
  {
    id: 1,
    name: 'The Tomorrow War',
    active: true,
    description:
      'The world is stunned when a group of time travelers arrive from the year 2051 to deliver an urgent message: Thirty years in the future, mankind is losing a global war against a deadly alien species. The only hope for survival is for soldiers and civilians from the present to be transported to the future and join the fight. Among those recruited is high school teacher and family man Dan Forester. Determined to save the world for his young daughter, Dan teams up with a brilliant scientist and his estranged father in a desperate quest to rewrite the fate of the planet.',
    category: 'fantasy',
  },
  {
    id: 2,
    name: 'Dirty Grandpa',
    active: true,
    description:
      "Jason Kelly is one week away from marrying his boss's uber-controlling daughter, putting him on the fast track for a partnership at the law firm. However, when the straight-laced Jason is tricked into driving his foul-mouthed grandfather, Dick, to Daytona for spring break, his pending nuptials are suddenly in jeopardy. Between riotous frat parties, bar fights, and an epic night of karaoke, Dick is on a quest to live his life to the fullest and bring Jason along for the ride.",
    category: 'comedy',
  },
  {
    id: 3,
    name: 'Love, Rosie ',
    active: false,
    description:
      'Since the moment they met at age 5, Rosie and Alex have been best friends, facing the highs and lows of growing up side by side. A fleeting shared moment, one missed opportunity, and the decisions that follow send their lives in completely different directions. As each navigates the complexities of life, love, and everything in between, they always find their way back to each other - but is it just friendship, or something more?',
    category: 'drama',
  },
  {
    id: 4,
    name: 'Kingdom: Ashin of the North',
    active: true,
    description:
      "Tragedy, betrayal and a mysterious discovery fuel a woman's vengeance for the loss of her tribe and family in this special episode of Kingdom.",
    category: 'thriller',
  },
]

describe('Table Component', () => {
  test('should display with data', () => {
    const handleEdit = jest.fn()
    render(<Table data={sampleData} onEdit={handleEdit} />)

    const tableRow = screen.getAllByRole('row')
    expect(tableRow).toHaveLength(5)

    const colName = within(tableRow[0]).getByText('Title')
    expect(colName).toBeInTheDocument()

    const colStatus = within(tableRow[0]).getByText('Status')
    expect(colStatus).toBeInTheDocument()

    const colAction = within(tableRow[0]).getByText('Action')
    expect(colAction).toBeInTheDocument()

    const colTitle = within(tableRow[1]).getByText('The Tomorrow War')
    expect(colTitle).toBeInTheDocument()

    const colActive = within(tableRow[1]).getByText('active')
    expect(colActive).toHaveClass('text-green-800 bg-green-100')

    const colInActive = within(tableRow[3]).getByText('inactive')
    expect(colInActive).toHaveClass('text-red-800 bg-red-100')
  })

  test('should display no data results', () => {
    const handleEdit = jest.fn()
    render(<Table data={[] as DataProps[]} onEdit={handleEdit} />)

    const noResult = screen.getByText(/...No data Results/)
    expect(noResult).toBeInTheDocument()
  })

  test('should have clickable action button', () => {
    const handleEdit = jest.fn()
    render(<Table data={sampleData} onEdit={handleEdit} />)

    const tableRow = screen.getAllByRole('row')
    expect(tableRow).toHaveLength(5)

    const colAction = within(tableRow[0]).getByText('Action')
    expect(colAction).toBeInTheDocument()

    const colOnEdit = within(tableRow[1]).getByText('edit')
    userEvent.click(colOnEdit)
    expect(handleEdit).toHaveBeenCalled()
  })

  test('should display with children component', () => {
    const handleEdit = jest.fn()
    render(
      <Table data={sampleData} onEdit={handleEdit}>
        <div>Child Component</div>
      </Table>
    )

    const childComponent = screen.getByText(/Child Component/)
    expect(childComponent).toBeInTheDocument()

    // const checkBox = screen.getByTestId('checkbox-element')
    // expect(checkBox).not.toBeInTheDocument()
  })

  test('should display checkbox', () => {
    const handleEdit = jest.fn()

    const handleToggleCheckbox = jest.fn()

    const props = {
      data: sampleData,
      onEdit: handleEdit,
      checkedIds: [1],
      toggleCheckbox: handleToggleCheckbox,
    }
    render(
      <Table {...props}>
        <div>Child Component</div>
      </Table>
    )

    const checkBoxOne = screen.getByLabelText('movie-1')
    expect(checkBoxOne).toBeChecked()

    const checkBoxTwo = screen.getByLabelText('movie-2')
    expect(checkBoxTwo).not.toBeChecked()

    userEvent.click(checkBoxTwo)
    expect(handleToggleCheckbox).toHaveBeenCalled()
  })
})
