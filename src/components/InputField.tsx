import { SearchIcon } from '@heroicons/react/solid'

type Props = {
  value?: string | string[]
  label?: string
  name?: string
  type?: string
  onChange: (event: React.FormEvent<Element>) => void
}

function InputField({ value, label, name, type = 'text', onChange }: Props) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        {type === 'search' && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </div>
        )}

        <input
          defaultValue={value}
          type={type}
          name={name}
          id={name}
          className={`block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            type === 'search' ? 'pl-10' : ''
          }`}
          placeholder="you@example.com"
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default InputField
