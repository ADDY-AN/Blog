import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { RouterProvider } from 'react-router-dom'
import Navbar from './components/navbar'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

import YourBlogs from './pages/YourBlogs'
import WriteBlog from './pages/WriteBlog'
import UpdateBlog from './pages/UpdateBlog'
import BlogPages from './pages/BlogPages'


const router = createBrowserRouter([
  {
    path: '/',
    element: <><Navbar /><Home /></>,
  },
  {
    path: '/blogs',
    element: <><Navbar /><Blogs /></>,
  },
  {
    path: '/blog/:blogId',
    element: <><Navbar /><BlogPages /></>,
  },
  {
    path: '/about',
    element: <><Navbar /><About /></>,
  },
  {
    path: '/login',
    element: <><Navbar /><Login /></>,
  },
  {
    path: '/signup',
    element: <><Navbar /><Signup /></>,
  },
  {
    path: '/dashboard',
    element: <><Navbar /><Dashboard /></>,
    children: [
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'your-blogs',
        element: <YourBlogs />,
      },
      {
        path: 'write-blog',
        element: <WriteBlog />,
      },
      {
        path: 'write-blog/:blogId',
        element: <UpdateBlog />
      }
    ]
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App