import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '../../utils/classnames'

export const buttonVariants = cva(
  'rounded-full transition text-center inline-flex items-center justify-center gap-2',
  {
    variants: {
      variant: {
        primary: 'bg-zinc-800 text-white hover:scale-[1.025]',
        secondary: 'bg-primary text-white hover:scale-[1.025]',
        ghost: 'bg-transparent hover:bg-zinc-100'
      },
      size: {
        md: 'px-8 py-4',
        sm: 'px-4 py-2',
        xs: 'px-2 py-1',
        icon: 'p-2'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button