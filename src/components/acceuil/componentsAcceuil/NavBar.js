import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

const NavBar = () => {

  return (
    <div>
        <nav>
            <ul>
                <li>wish opgg</li>
                <Link className='Link' to="Page2">Page2</Link>
                <Link className='Link' to="About">About</Link>
            </ul>
        </nav>
    </div>
  )
}

export default NavBar;