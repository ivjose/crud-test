import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Table, { DataProps } from './Table'

// import {} from '@modules/Home/types'

const sampleData = [
  {
    id: 1,
    title: 'The Tomorrow War',
    status: 'active',
    description:
      'The world is stunned when a group of time travelers arrive from the year 2051 to deliver an urgent message: Thirty years in the future, mankind is losing a global war against a deadly alien species. The only hope for survival is for soldiers and civilians from the present to be transported to the future and join the fight. Among those recruited is high school teacher and family man Dan Forester. Determined to save the world for his young daughter, Dan teams up with a brilliant scientist and his estranged father in a desperate quest to rewrite the fate of the planet.',
    year: '2021',
  },
  {
    id: 2,
    title: 'Dirty Grandpa',
    status: 'active',
    description:
      "Jason Kelly is one week away from marrying his boss's uber-controlling daughter, putting him on the fast track for a partnership at the law firm. However, when the straight-laced Jason is tricked into driving his foul-mouthed grandfather, Dick, to Daytona for spring break, his pending nuptials are suddenly in jeopardy. Between riotous frat parties, bar fights, and an epic night of karaoke, Dick is on a quest to live his life to the fullest and bring Jason along for the ride.",
    year: '2016',
  },
  {
    id: 3,
    title: 'Love, Rosie ',
    status: 'inactive',
    description:
      'Since the moment they met at age 5, Rosie and Alex have been best friends, facing the highs and lows of growing up side by side. A fleeting shared moment, one missed opportunity, and the decisions that follow send their lives in completely different directions. As each navigates the complexities of life, love, and everything in between, they always find their way back to each other - but is it just friendship, or something more?',
    year: '2014',
  },
  {
    id: 4,
    title: 'Kingdom: Ashin of the North',
    status: 'active',
    description:
      "Tragedy, betrayal and a mysterious discovery fuel a woman's vengeance for the loss of her tribe and family in this special episode of Kingdom.",
    year: '2021',
  },
]

test('Should Table Render', () => {
  const handleDelete = jest.fn()
  const handleEdit = jest.fn()
  render(<Table data={sampleData as DataProps[]} onDelete={handleDelete} onEdit={handleEdit} />)

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

  const colOnDelete = within(tableRow[1]).getByText('delete')
  userEvent.click(colOnDelete)
  expect(handleDelete).toHaveBeenCalled()

  const colOnEdit = within(tableRow[1]).getByText('edit')
  userEvent.click(colOnEdit)
  expect(handleEdit).toHaveBeenCalled()
})
