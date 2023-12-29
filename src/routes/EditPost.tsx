import { Form, useLoaderData } from 'react-router-dom'

import Button from '../components/ui/Button'
import Input, { inputVariants } from '../components/ui/Input'
import { Post } from '../types'

const EditPost = () => {
  const post = useLoaderData() as Post | null

  if (!post) return <p>hmm... can't find this post</p>

  return (
    <Form method='put' className='flex flex-col items-center gap-6 mt-12'>
        <h1 className='w-2/3 text-3xl font-bold mb-8'>Edit post</h1>
        <label htmlFor='title' hidden>Title</label>
        <Input
          className='w-2/3'
          type='text'
          name='title'
          id='title'
          placeholder='Title'
          defaultValue={post.title}
          required
        />
        <label htmlFor='link' hidden>Link</label>
        <Input
          className='w-2/3'
          type='url'
          name='link'
          id='link'
          placeholder='Link'
          defaultValue={post.link?.url}
        />
        <label htmlFor='body' hidden>Text</label>
        <textarea
          className={inputVariants({ className: 'w-2/3 min-h-[12rem]' })}
          name='body'
          id='body'
          placeholder='Text'
          defaultValue={post.body}
        />
        <Button type='submit'>Save post</Button>
    </Form>
  )
}

export default EditPost