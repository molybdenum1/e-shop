import './css/Navbar.css';
import logo from '../static/img/logo.jpg';
import {Link} from 'react-router-dom';
import React from 'react';

export default function Navbar() {
  return (
    <div className='navbox'>
      <div className='leftside'>
        <img src={logo} alt="" className='logo'/>
      </div>
      <div className='rightside'>
        <Link to='/signup' className='navlinks'>SIGN UP</Link>
        <Link to='/login' className='navlinks'>LOGIN</Link>
      </div>
    </div>
  )
}
