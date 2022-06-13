import './css/Main.css';
import React from 'react';
import Navbar from './Navbar';
import Products from './Products';

export default function Main() {
  return (
    <div className='wrapper'>
      <Navbar/>
      <Products/>
    </div>
  )
}
