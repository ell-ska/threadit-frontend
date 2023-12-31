import { Form } from 'react-router-dom'

import Button from '../components/ui/Button'
import Input, { inputVariants } from '../components/ui/Input'

const CreatePost = () => {
  return (
    <Form method='post' className='flex flex-col items-center gap-6 mt-12'>
        <h1 className='w-2/3 text-3xl font-bold mb-8'>Create a post</h1>
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
        <label htmlFor='body' hidden>Text</label>
        <textarea
          className={inputVariants({ className: 'w-2/3 min-h-[12rem]' })}
          name='body'
          id='body'
          placeholder='Text'
        />
        <Button type='submit'>Create post</Button>
    </Form>
  )
}

export default CreatePost