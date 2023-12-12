import { cn } from "../../utils/classnames"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({
  className,
  ...props
}: InputProps) => {
  return (
    <input
      className={cn(
        'placeholder:text-zinc-500 border border-zinc-500 rounded-lg py-2 px-4 outline-none focus-visible:border-secondary shadow-[0_0_0_9999px_white_inset]',
        className
      )}
      {...props}
    />
  )
}

export default Input