import { DetailedHTMLProps } from 'react'

interface ButtonProps
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: 'full' | 'outline' | 'bare' | 'custom'
  colors?: {
    base: string
    hover: string
    active: string
  }
  children?: React.ReactNode
}

const Button = ({ variant, colors, children, ...props }: ButtonProps) => {
  if (variant === 'custom') {
    return (
      <button
        className={`px-5 py-1 text-white transition-all duration-100 rounded-sm ${colors.base} hover:${colors.hover} active:${colors.active} font-Roboto `}
        {...props}
      >
        {children}
      </button>
    )
  }

  if (variant === 'outline') {
    return (
      <button
        className="px-5 py-1 transition-all duration-100 border rounded-sm bg-none text-dark-blue hover:text-accent active:text-light-blue border-dark-blue hover:border-accent active:border-light-blue font-Roboto"
        {...props}
      >
        {children}
      </button>
    )
  }

  if (variant === 'bare') {
    return (
      <button
        className="px-5 py-1 transition-all duration-100 rounded-sm bg-none text-dark-blue hover:text-accent active:text-light-blue font-Roboto "
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      className="px-5 py-1 text-white transition-all duration-100 rounded-sm active:bg-light-blue bg-dark-blue hover:bg-accent font-Roboto"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
