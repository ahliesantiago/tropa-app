import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom"

import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import AuthPage from './pages/Auth/AuthPage'
import ProfilePage from './pages/ProfilePage'
import NotFound from './pages/NotFound'
import MainLayout from './components/Layout/MainLayout'
import NewProfile from './components/Profile/NewProfile'
import Logout from './components/Auth/Logout'

const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route path='/' element={<MainLayout />}>
    <Route path="/" element={
        <MainLayout />
        // <SessionContext.Provider value={storedSession}>
        //     <MainLayout />
        // </SessionContext.Provider>
    }>
      <Route path="*" element={<NotFound />}></Route>
      <Route index element={<HomePage />} />
      <Route path='/profile/:username' element={<ProfilePage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/new-user' element={<NewProfile />} />
      <Route path='/logout' element={<Logout />} />
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App