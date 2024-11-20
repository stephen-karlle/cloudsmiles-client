import { ReactNode } from "react"

type LabelProps = {
  children: ReactNode
  className?: string
}

const Label = ({ children, className }: LabelProps) => {
  return (
    <label className={`text-sm text-gray-500 font-normal tracking-normal ${className}`}>
      {children}
    </label>
  )
}

export default Label