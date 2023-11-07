import type { HTMLAttributes, PropsWithChildren } from 'react'

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {}

export default function ButtonGroup({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonGroupProps>) {
  return (
    <div {...props} className={`flex ${className || ''}`}>
      {children}
    </div>
  )
}
