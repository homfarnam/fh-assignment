import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string
  placeholder?: string
  className?: React.HTMLAttributes<HTMLInputElement>["className"]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  firstIcon?: React.ReactNode
  secondIcon?: React.ReactNode
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  className = "",
  onChange,
  value = "",
  firstIcon,
  secondIcon,
  ...props
}) => {
  return (
    <>
      {firstIcon}
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        value={value}
        {...props}
      />
      {secondIcon}
    </>
  )
}

export default Input
