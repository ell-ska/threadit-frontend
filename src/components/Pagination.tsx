import { cn } from '../utils/classnames'
import Button from './ui/Button'

type PaginationProps = {
  currentPage: number
  totalPages: number
  setPage: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, setPage }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className='flex gap-2 justify-center items-center'>
      {pages.map(page => (
        <Button
          variant='ghost'
          size='sm'
          key={page}
          onClick={() => setPage(page)}
          className={cn('bg-zinc-100 hover:bg-zinc-200', currentPage === page && 'bg-zinc-200')}
        >
          {page}
        </Button>
      ))}
    </div>
  )
}

export default Pagination