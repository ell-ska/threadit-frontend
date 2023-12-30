import { Link, useFetcher } from 'react-router-dom'

import auth from '../lib/auth'
import Button, { buttonVariants } from './ui/Button'

const Header = () => {
  const isAuthenticated = auth.isSignedIn()
  const fetcher = useFetcher()

  return (
    <header className='main py-4 flex justify-between items-center'>
      <Link to='/' className='text-2xl font-bold'>Threadit</Link>
      <div className='flex gap-4 items-center'>
        {isAuthenticated ? (
          <>
            <Link to='/create-post' className={buttonVariants({ variant: 'secondary', size: 'sm' })}>New post</Link>
            <fetcher.Form method='post' action='/sign-out'>
              <Button type='submit' variant='ghost' size='sm'>sign out</Button>
            </fetcher.Form>
          </>
        ) : (
          <Link
            to='/sign-in'
            className={buttonVariants({ variant: 'secondary', size: 'sm' })}
          >sign in</Link>
        )}
      </div>
    </header>
  )
}

export default Header