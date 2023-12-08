import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='main py-4 flex justify-between items-center'>
      <h1 className='text-2xl font-bold'>Threadit</h1>
      <div className='space-x-4'>
        <Link to='/sign-up'>sign up</Link>
        <Link to='/sign-in'>sign in</Link>
      </div>
    </header>
  )
}

export default Header