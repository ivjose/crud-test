import { PencilAltIcon } from '@heroicons/react/solid'

export type DataProps = {
  id: number
  name: string
  active: boolean
}

type TableProps<T> = {
  data?: T[]
  onEdit?: (id: number) => void
  children?: JSX.Element
  toggleCheckbox?: (event: React.FormEvent<Element>) => void
  checkedIds?: number[]
}

function Table<T extends DataProps>({
  data = [],
  onEdit,
  toggleCheckbox,
  checkedIds = [],
  children,
}: TableProps<T>) {
  return (
    <div>
      {children}
      <div className="overflow-auto border-b border-gray-200 shadow sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {toggleCheckbox && (
                <th className="w-12">
                  <span className="sr-only">checkbox</span>
                </th>
              )}

              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Title
              </th>
              <th
                scope="col"
                className="w-32 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((item: T) => (
                <tr key={item.id}>
                  {toggleCheckbox && (
                    <td className="px-6 py-4 ">
                      <input
                        id={`movie-${item.id}`}
                        name={`movie-${item.id}`}
                        type="checkbox"
                        className="w-4 border-gray-300 rounded cursor-pointer h-4text-indigo-600 focus:ring-indigo-500"
                        onChange={toggleCheckbox}
                        checked={checkedIds.includes(item.id)}
                        data-testid="checkbox-element"
                      />
                      <label
                        htmlFor={`movie-${item.id}`}
                        className="sr-only"
                      >{`movie-${item.id}`}</label>
                    </td>
                  )}

                  <td className="px-6 py-4 text-lg font-medium text-gray-900 whitespace-nowrap">
                    {item.name}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 text-xs font-semibold leading-5  rounded-full  ${
                        item.active ? 'text-green-800 bg-green-100 ' : 'text-red-800 bg-red-100 '
                      }`}
                    >
                      {item.active ? 'active' : 'inactive'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <span className="relative z-0 inline-flex rounded-md shadow-sm">
                      <button
                        onClick={() => onEdit && onEdit(item.id)}
                        type="button"
                        className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:text-indigo-500 focus:border-indigo-500"
                      >
                        <span className="sr-only">edit</span>
                        <PencilAltIcon className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 text-lg font-medium text-center text-gray-500 whitespace-nowrap"
                >
                  ...No data Results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
