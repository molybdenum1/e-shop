import './css/Navbar.css';
import logo from '../static/img/logo.jpg';
import {Link, useNavigate} from 'react-router-dom';
import {Icon} from 'react-icons-kit';
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart';
import React from 'react';
import {auth} from '../config/config';

export default function Navbar(props) {

  const history = useNavigate();

  const handleLogout=()=>{
    auth.signOut().then(()=>{
        history('/login');
    })
  }

  return (
    <div className='navbox'>
      <div className='leftside'>
        <Link to='/' className='navlinks'>
          <img src={logo} alt="" className='logo'/>
        </Link>
        
      </div>
      <div className='rightside'>
       
        {!props.user &&<>
            <Link to='/signup' className='navlinks'>SIGN UP</Link>
            <Link to='/login' className='navlinks'>LOGIN</Link>
        </>} 

        {props.user&&<>
             <Link className='navlinks' to="/">{props.user}</Link>      
              <Link className='navlinks' to="/cart">
                <Icon icon={shoppingCart} size={20}/>
              </Link>
             <sup><span className='cart-indicator'>{props.totalQty}</span></sup>
              <button className='logout-btn'
                  onClick={handleLogout}>LOGOUT</button>
        </>}         
      </div>
    </div>
  )
}
