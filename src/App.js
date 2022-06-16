import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './components/Main';
import AddProducts from './components/AddProducts';
import Signup from './components/Signup';
import { Login } from './components/Login';

export default function App(){

    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/addproducts' element={<AddProducts/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    )

}


