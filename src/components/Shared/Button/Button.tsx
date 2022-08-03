import React, { FC, ButtonHTMLAttributes } from "react"
import { ButtonSpinner } from "components"

export type AppButtonProps = {
  type: "submit" | "reset" | "button"
  variant:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
  children: React.ReactNode
  extendClass?: string
  isLoading?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
} & ButtonHTMLAttributes<HTMLButtonElement>

const PrimaryClasses =
  "w-full p-2 mt-2 text-center text-white transition-colors rounded-md cursor-pointer bg-primary hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300 text-body-3"

const AppButton: FC<AppButtonProps> = ({
  onClick,
  variant,
  type,
  children,
  extendClass,
  isLoading,
  ...otherProps
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isLoading}
      className={`${
        variant === "primary" ? PrimaryClasses : ""
      } ${extendClass} ${
        isLoading ? " cursor-not-allowed opacity-75 p-0" : ""
      }`}
      {...otherProps}
    >
      {isLoading ? <ButtonSpinner /> : children}
    </button>
  )
}

export default AppButton
