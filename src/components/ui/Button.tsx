import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '../../utils/classnames'

const buttonVariants = cva(
  'rounded-full transition hover:scale-[1.025] text-center px-8 py-4 inline-flex items-center justify-center gap-2',
  {
    variants: {
      variant: {
        primary: 'bg-zinc-800 text-white',
        secondary: 'bg-primary text-white',
      }
    },
    defaultVariants: {
      variant: 'primary'
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({
  children,
  variant,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button