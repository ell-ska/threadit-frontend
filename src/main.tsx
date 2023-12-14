import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'

import auth from './lib/auth.ts'
import Layout from './Layout.tsx'
import Home from './routes/Home.tsx'
import { homeLoader } from './loaders/home.ts'
import Post from './routes/Post.tsx'
import { postLoader } from './loaders/post.ts'
import CreatePost from './routes/CreatePost.tsx'
import { createPostAction } from './actions/create-post.ts'
import SignIn from './routes/SignIn.tsx'
import { signInAction } from './actions/sign-in.ts'
import SignUp from './routes/SignUp.tsx'
import { signUpAction } from './actions/sign-up.ts'
import './index.css'
import RequireAuth from './components/RequireAuth.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        loader: homeLoader,
        element: <Home />
      },
      {
        path: '/post/:id',
        loader: postLoader,
        element: <Post />
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: '/create-post',
            action: createPostAction,
            element: <CreatePost />
          }
        ]
      }
    ]
  },
  {
    path: '/sign-in',
    action: signInAction,
    element: <SignIn />
  },
  {
    path: '/sign-up',
    action: signUpAction,
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
    <RouterProvider router={router} />
  </React.StrictMode>,
)
