import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { Toaster } from 'sonner'

import loaders from './loaders/index.ts'
import actions from './actions/index.ts'
import auth from './lib/auth.ts'
import Layout from './Layout.tsx'
import RequireAuth from './components/RequireAuth.tsx'
import Home from './routes/Home.tsx'
import Post from './routes/Post.tsx'
import CreatePost from './routes/CreatePost.tsx'
import SignIn from './routes/SignIn.tsx'
import SignUp from './routes/SignUp.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        loader: loaders.home,
        element: <Home />
      },
      {
        path: '/post/:id',
        loader: loaders.post,
        element: <Post />
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: '/create-post',
            action: actions.createPost,
            element: <CreatePost />
          },
          {
            path: '/posts/:postId/comments',
            action: actions.addComment
          },
          {
            path: '/posts/:postId/comments/:commentId',
            action: actions.deleteComment
          },
          {
            path: '/posts/:postId/vote',
            action: actions.vote
          }
        ]
      }
    ]
  },
  {
    path: '/sign-in',
    action: actions.signIn,
    element: <SignIn />
  },
  {
    path: '/sign-up',
    action: actions.signUp,
    element: <SignUp />
  },
  {
    path: '/sign-out',
    action: () => {
      auth.signOut()
      return redirect('/')
    }
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster toastOptions={{
      className: 'font-primary text-base bg-primary w-full p-4 rounded-lg text-white shadow-md',
      unstyled: true
    }} />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
