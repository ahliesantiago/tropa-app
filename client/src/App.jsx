/*eslint-disable-next-line no-unused-vars */
import React from 'react'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"

import SessionContext from './contexts/SessionContext'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import ProfilePage from './pages/ProfilePage'
import NotFound from './pages/NotFound'
import MainLayout from './components/Layout/MainLayout'
import EditInterest from './components/Admin/EditInterest'
import Auth from './components/Auth/Auth'

// const storedSession = JSON.parse(localStorage.getItem('session'))
// temporary
const storedSession = {
  isLoggedIn: true,
  user: {
    username: 'ahliesantiago',
    firstName: 'Ahlie',
    lastName: 'Santiago',
    isAdmin: true,
  }
}
const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route path='/' element={<MainLayout />}>
    <Route path="/" element={
        <SessionContext.Provider value={storedSession}>
            <MainLayout />
        </SessionContext.Provider>
    }>
      <Route path="*" element={<NotFound />}></Route>
      <Route index element={<HomePage />} />
      <Route path='/profile/:username' element={<ProfilePage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/admin/interests/:id/edit' element={<EditInterest />} />
      <Route path='/auth' element={<Auth />} />
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App