import { useSelector } from 'react-redux'
import Select from 'react-select'

import type { RootState } from '@/common/models'

export interface Option {
  value: number
  label: string
}
interface DropdownProps {
  options: Option[]
  value?: Option
  onChange?: (value: Option) => void
}

const Dropdown = ({ options, value, onChange }: DropdownProps) => {
  const criteria = useSelector((state: RootState) => state.app.criteria)
  return (
    <Select
      value={value}
      // defaultValue={options[0]}
      defaultValue={options.find(
        (e) => e.value === (criteria.criteria.listing_price_order || 1),
      )}
      options={options}
      onChange={(value) => {
        onChange?.(value!)
      }}
      className="w-40 z-20"
    />
  )
}
export default Dropdown
