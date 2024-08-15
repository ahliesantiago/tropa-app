/* eslint-disable */ // temporary
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import '../../assets/styles/Navbar.css'

const Navbar = () => {
  const [activePage, setActivePage] = useState()
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [signedInUser, setSignedInUser] = useState()

  useEffect(() => {
    setSignedInUser(localStorage.getItem('username'))
    if (signedInUser) {
      setIsSignedIn(true)
    }
  }, [signedInUser])

  return (
    <nav className='flex justify-between p-3'>
      <div className='nav flex grow justify-around'>
        <Link to="/">{isSignedIn ? 'Dashboard' : 'Home'}</Link>
        <Link to="/tba">Browse</Link>
        <Link to="/admin">Admin</Link>
      </div>
      <div className='account flex grow justify-around'>
        {isSignedIn ? (
          <>
          <Link to={"/profile/" + signedInUser}>Profile</Link>
          <Link to="/logout">Sign out</Link>
          </>
        ) : (
          <>
          <Link to="/auth">Join</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar