import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Login from '../../components/Auth/Login'
import Register from '../../components/Auth/Register'
import ResetPassword from '../../components/Auth/ResetPassword'

import '../../assets/styles/Auth.css'

const AuthPage = () => {
  const [action, setAction] = useState('register')
  const signedInUser = localStorage.getItem('username')
  const navigate = useNavigate()

  useEffect(() => {
    if (signedInUser) {
      navigate('/')
    }
  }, [])

  return(
    <>
    {
      action === 'register'
      ? (
        <>
          <Register />
          <div className='text-center'>
            <Link onClick={() => setAction('login')}>Already have an account? Sign-in here.</Link>
          </div>
        </>
      )
      : action === 'login'
      ? (
        <>
          <Login setAction={setAction} />
          <div className='text-center'>
            <Link onClick={() => setAction('register')}>No account yet? Register here.</Link>
          </div>
        </>
      )
      : (
        <>
        <ResetPassword />
          <div className='text-center'>
            <Link onClick={() => setAction('login')}>Go back to login here.</Link>
          </div>
        </>
      )
    }
    </>
  )
}

export default AuthPage