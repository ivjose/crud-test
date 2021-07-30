type OptionsProps = {
  value: string
  label: string
}

type Props = {
  value?: string | string[]
  defaultValue?: string | string[]
  label?: string
  name: string
  onChange: (event: React.FormEvent<HTMLSelectElement>) => void
  options: OptionsProps[]
  defaultOption?: OptionsProps
  error?: string
}

const SelectOptionFields = ({
  label,
  name,
  onChange,
  options,
  defaultOption,
  error,
  ...res
}: Props) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        {...res}
        id={name}
        name={name}
        className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={onChange}
      >
        {defaultOption && <option value={defaultOption.value}>{defaultOption.label}</option>}
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default SelectOptionFields
