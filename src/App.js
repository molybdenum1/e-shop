import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './components/Main';
import AddProducts from './components/AddProducts';

export default function App(){

    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/addproducts' element={<AddProducts/>}/>
        </Routes>
      </BrowserRouter>
    )

}


