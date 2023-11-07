import { IoMdClose } from 'react-icons/io'

interface ChipProps {
  bgColor?: string
  label?: string
  onClick?: (e: any) => void
}
const Chip = (props: ChipProps) => {
  return (
    <button
      className={`rounded-full ${props.bgColor} text-white flex m-0 px-3 py-2 text-sm gap-4 items-center`}
    >
      {props.label}
      <span onClick={props.onClick}>
        <IoMdClose className="w-4 h-4" />
      </span>
    </button>
  )
}

export default Chip
