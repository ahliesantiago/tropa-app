import { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../assets/styles/Navbar.css'

const Navbar = () => {
  const[activePage, setActivePage] = useState();

  return (
    <nav className='flex justify-between p-3'>
      <div className='nav flex grow justify-around'>
      <Link to="/">Home</Link>
      <Link to="/">Browse</Link>
        <Link to="/admin">Admin</Link>
      </div>
      <div className='account flex grow justify-around'>
        <Link to="/profile">Account</Link>
      </div>
    </nav>
  );
}

export default Navbar;