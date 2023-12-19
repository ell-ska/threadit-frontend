import { Form, Link, useActionData } from 'react-router-dom'

import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { ActionData } from '../types'

const SignIn = () => {
  const error = useActionData() as ActionData

  return (
    <main className='main max-w-lg flex flex-col items-center mt-28'>
      <img className='mb-12' src='/logo.svg' alt='threadit logo' />
      <div className='mb-14 space-y-2'>
        <h1 className='text-3xl font-bold text-center'>Welcome back!</h1>
        <p className='text-zinc-600 text-center'>Please enter your details</p>
      </div>
      <Form method='post' className='flex flex-col w-full relative'>
        {error && <p className='absolute -top-8 left-1/2 -translate-x-1/2 text-primary whitespace-nowrap'>{error.message}</p>}
        <label htmlFor='username' hidden>Enter your username</label>
        <Input
          className='mb-8'
          type='text'
          name='username'
          id='username'
          placeholder='Username'
          required
        />
        <label htmlFor='password' hidden>Enter your password</label>
        <Input
          className='mb-8'
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          required
        />
        <Button variant='secondary'>Sign in</Button>
      </Form>
      <Link to='/sign-up' className='absolute text-zinc-600 bottom-8'>
        Don't have an account?{' '}
        <span className='text-zinc-800'>Sign up</span>
      </Link>
    </main>
  )
}

export default SignIn