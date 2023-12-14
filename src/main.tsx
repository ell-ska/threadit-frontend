import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'

import auth from './lib/auth.ts'
import Layout from './Layout.tsx'
import Home from './routes/Home.tsx'
import SignIn from './routes/SignIn.tsx'
import { signInAction } from './actions/sign-in.ts'
import SignUp from './routes/SignUp.tsx'
import { signUpAction } from './actions/sign-up.ts'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
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
