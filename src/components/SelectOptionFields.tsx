type OptionsProps = {
  value: string
  label: string
}

type Props = {
  value?: string | string[]
  label?: string
  name?: string
  onChange: (event: React.FormEvent<HTMLSelectElement>) => void
  options: OptionsProps[]
}

const SelectOptionFields = ({ value, label, name, onChange, options }: Props) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        defaultValue={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectOptionFields
