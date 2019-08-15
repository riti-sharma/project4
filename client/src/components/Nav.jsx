import React from 'react'
import { Link } from 'react-router-dom'

const Nav = (props) => {

  return (
    <header>
      <nav id="nav-bar">
        <Link to="/home">Home</Link>
        <Link to="/mygroups">My Study Groups</Link>
        <Link to="/allgroups">All Study Groups</Link>
        <button onClick={props.handleLogout}>Log Out</button>
      </nav>
    </header>
  )
}


export default Nav;
