/*eslint-disable-next-line no-unused-vars */
import React from 'react'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"

import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import ProfilePage from './pages/ProfilePage'
import NotFound from './pages/NotFound'
import MainLayout from './components/Layout/MainLayout'
import EditInterest from './components/Admin/EditInterest'

// const storedSession = JSON.parse(localStorage.getItem('session'))
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
    {/* <Route path="/" element={
        <SessionContext.Provider value={storedSession}>
            <MainLayout />
        </SessionContext.Provider>
    }> */}
      <Route path="*" element={<NotFound />}></Route>
      <Route index element={<HomePage />} />
      <Route path='/profile/:username' element={<ProfilePage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/admin/interests/:id/edit' element={<EditInterest />} />
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App