import { Link, useFetcher } from 'react-router-dom'

import auth from '../lib/auth'
import Button, { buttonVariants } from './ui/Button'

const Header = () => {
  const isAuthenticated = auth.isSignedIn()
  const fetcher = useFetcher()

  return (
    <header className='main py-4 flex justify-between items-center'>
      <h1 className='text-2xl font-bold'>Threadit</h1>
      <div className='space-x-4'>
        {isAuthenticated ? (
          <fetcher.Form method='post' action='/sign-out'>
            <Button type='submit' variant='ghost' size='sm'>sign out</Button>
          </fetcher.Form>
        ) : (
          <Link to='/sign-in' className={buttonVariants({ variant: 'secondary', size: 'sm' })}>sign in</Link>
        )}
      </div>
    </header>
  )
}

export default Header