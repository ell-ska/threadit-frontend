import { ArrowBigDown, ArrowBigUp, MessageCircle } from 'lucide-react'

import Button from './ui/Button'

type ToolbarProps = {
  upvotes: number
  comments: number
}

const Toolbar = ({ upvotes, comments }: ToolbarProps) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
  }

  return (
    <div className='flex gap-4 items-center'>
      <div className='flex gap-1 items-center rounded-full bg-zinc-100 group-hover:bg-zinc-200 transition'>
        <Button
          onClick={e => onClick(e)}
          size='icon'
          variant='ghost'
          className='hover:text-secondary hover:bg-zinc-50'
        >
          <ArrowBigUp />
        </Button>
        <span>{upvotes}</span>
        <Button
          onClick={e => onClick(e)}
          size='icon'
          variant='ghost'
          className='hover:text-primary hover:bg-zinc-50'
        >
          <ArrowBigDown />
        </Button>
      </div>

      <div className='bg-zinc-100 rounded-full group-hover:bg-zinc-200 transition'>
        <Button
          onClick={e => onClick(e)}
          size='icon'
          variant='ghost'
          className='hover:bg-zinc-50'
        >
          <MessageCircle />
          <span>{comments}</span>
        </Button>
      </div>
    </div>
  )
}

export default Toolbar