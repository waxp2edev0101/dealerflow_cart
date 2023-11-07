import type { PropsWithChildren } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import './tooltip.css'

interface ModalProps {
  showText?: string
  fullText?: string
  onClick?: () => void
}

export default function Tooltip({
  showText,
  fullText,
  onClick,
}: PropsWithChildren<ModalProps>) {
  return (
    <>
      <p
        className="cursor-pointer"
        data-tooltip-id="tooltip"
        data-tooltip-content={fullText}
        onClick={onClick}
      >
        {showText}
        <span> ...</span>
      </p>
      <ReactTooltip id="tooltip" />
    </>
  )
}
