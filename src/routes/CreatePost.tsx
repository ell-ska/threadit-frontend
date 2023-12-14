import { Form, useActionData } from 'react-router-dom'

import Button from '../components/ui/Button'
import Input, { inputVariants } from '../components/ui/Input'
import { ActionData } from '../types'

const CreatePost = () => {
  const error = useActionData() as ActionData

  return (
    <div className='mt-12'>
      <h1 className='text-3xl font-bold mb-8'>Create a post</h1>
      <Form method='post' className='flex flex-col items-center gap-6'>
          {error && <p className='absolute -top-8 left-1/2 -translate-x-1/2 text-primary whitespace-nowrap'>{error.message}</p>}
          <label htmlFor='title' hidden>Title</label>
          <Input
            className='w-2/3'
            type='text'
            name='title'
            id='title'
            placeholder='Title'
            required
          />
          <label htmlFor='link' hidden>Link</label>
          <Input
            className='w-2/3'
            type='url'
            name='link'
            id='link'
            placeholder='Link'
          />
          <label htmlFor='text' hidden>Text</label>
          <textarea
            className={inputVariants({ className: 'w-2/3 min-h-[12rem]' })}
            name='text'
            id='text'
            placeholder='Text'
          />
          <Button type='submit'>Create post</Button>
      </Form>
    </div>
  )
}

export default CreatePost