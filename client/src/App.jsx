/*eslint-disable-next-line no-unused-vars */
import React from 'react'
import {Routes, Route} from 'react-router-dom'

import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import ProfilePage from './pages/ProfilePage'
import EditInterest from './components/Admin/EditInterest'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/profile/:username' element={<ProfilePage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/admin/interests/:id/edit' element={<EditInterest />} />
    </Routes>
  )
}

export default App