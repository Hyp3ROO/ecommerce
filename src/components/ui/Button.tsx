import { PropsWithChildren } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends PropsWithChildren {
  [rest: string]: unknown
  sm?: boolean
  md?: boolean
  lg?: boolean
  mt?: boolean
}

const Button = ({ children, sm, md, lg, mt, ...rest }: ButtonProps) => {
  const classes = clsx(
    'rounded-lg border border-blue-700 text-center text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800',
    sm && 'px-6 py-2.5 text-sm',
    md && 'px-8 py-3',
    lg && 'px-10 py-2.5 text-lg',
    mt && 'mt-4'
  )
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
export default Button
