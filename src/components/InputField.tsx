import { SearchIcon } from '@heroicons/react/solid'

type Props = {
  value?: string | string[]
  defaultValue?: string | string[]
  label?: string
  name: string
  type?: string
  onChange: (event: React.FormEvent<Element>) => void
  rows?: number
  placeholder?: string
  error?: string
}

function InputField({
  label,
  name,
  type = 'text',
  onChange,
  rows = 3,
  placeholder,
  error,
  ...res
}: Props) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        {type === 'search' && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
              data-testid="searchIcon"
            />
          </div>
        )}

        {type === 'textarea' ? (
          <textarea
            {...res}
            name={name}
            id={name}
            rows={rows}
            placeholder={placeholder}
            onChange={onChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ) : (
          <input
            {...res}
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={onChange}
            className={`block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              type === 'search' ? 'pl-10' : ''
            }`}
          />
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default InputField
