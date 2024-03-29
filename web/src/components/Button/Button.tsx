import { DetailedHTMLProps } from 'react'

interface ButtonProps
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: 'full' | 'outline' | 'bare' | 'custom'
  children?: React.ReactNode
}

const Button = ({ variant, className, children, ...props }: ButtonProps) => {
  if (variant === 'custom') {
    return (
      <button
        className={`px-5 py-1 text-off-white transition-all duration-100 rounded-sm font-Roboto ${className} `}
        {...props}
      >
        {children}
      </button>
    )
  }

  if (variant === 'outline') {
    return (
      <button
        className="px-5 py-1 font-medium tracking-wider transition-all duration-100 border rounded-sm bg-none text-dark-blue hover:text-accent active:text-light-blue border-dark-blue hover:border-accent active:border-light-blue font-Roboto dark:text-sky-blue-dark dark:border-sky-blue-dark/80 dark:hover:text-accent-dark"
        {...props}
      >
        {children}
      </button>
    )
  }

  if (variant === 'bare') {
    return (
      <button
        className="flex items-center px-5 py-1 font-medium tracking-wider transition-all duration-100 rounded-sm bg-none text-dark-blue dark:text-sky-blue-dark hover:text-accent dark:hover:text-accent-dark active:text-light-blue font-Roboto"
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      className="px-5 py-1 font-medium tracking-wider text-off-white transition-all duration-100 rounded-sm min-h-[39px] active:bg-light-blue bg-dark-blue dark:bg-dark-blue-dark hover:bg-accent dark:hover:bg-accent-dark font-Roboto"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
