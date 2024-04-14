import { FC, ReactNode } from 'react'

import { classNames } from 'utils/helper'

export interface ButtonProps {
  width?: string
  height?: string
  isTransparent?: boolean
  bgColor?: string
  color?: string
  border?: string
  borderRadius?: string
  isDisabled?: boolean
  className?: string
  onClick?: () => void
  children?: string | ReactNode
}

const Button: FC<ButtonProps> = ({
  width = 'w-full',
  height = 'h-[38px]',
  isTransparent = false,
  bgColor = 'amber',
  color = '',
  border = '',
  borderRadius = 'rounded-[5px]',
  isDisabled = false,
  className = '',
  children = [],
  onClick = undefined,
}) => {
  const btnClassName = classNames(
    'flex justify-center items-center p-[0px_5px]',
    width,
    height,
    borderRadius,
    isTransparent ? 'bg-transparent' : `bg-${bgColor}`,
    isDisabled
      ? `cursor-not-allowed ${isTransparent ? 'text-gray-300 border border-gray-400' : 'opacity-30'}`
      : `cursor-pointer text-${color} ${border} hover:shadow-[inset_40rem_0_0_0] hover:shadow-amber-800 hover:text-black duration-[300ms,500ms] transition-[color,box-shadow]`,
    className
  )

  return (
    <div className={btnClassName} onClick={onClick}>
      {children}
    </div>
  )
}

export default Button
