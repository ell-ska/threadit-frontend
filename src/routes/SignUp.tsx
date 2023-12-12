import { Link } from 'react-router-dom'

import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const SignUp = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <main className='main max-w-lg flex flex-col items-center mt-28'>
      <img className='mb-12' src='/logo.svg' alt='threadit logo' />
      <div className='mb-14 space-y-2'>
        <h1 className='text-3xl font-bold'>Welcome to Threadit!</h1>
        <p className='text-zinc-600 text-center'>Please enter your details</p>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col w-full'>
        <Input className='mb-8' type="text" name="username" id="username" placeholder="Username" />
        <Input className='mb-12' type="password" name="password" id="password" placeholder="Password" />
        <Button variant='secondary'>Sign up</Button>
      </form>
      <Link to='/sign-in' className='absolute text-zinc-600 bottom-8'>
        Already have an account?{' '}
        <span className='text-zinc-800'>Sign in</span>
      </Link>
    </main>
  )
}

export default SignUp