import { useEffect } from 'react'
import About from '../components/About'
import Dashboard from '../components/Dashboard'

const HomePage = () => {
  const signedInUser = localStorage.getItem('username')

  return (
    signedInUser ? <Dashboard /> : <About />
  )
}

export default HomePage