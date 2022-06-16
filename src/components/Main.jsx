import './css/Main.css';
import React, {useState, useEffect}  from 'react';
import Navbar from './Navbar';
import Products from './Products';
import {auth, db} from '../config/config'

export default function Main() {

  // getting current user function
  function GetCurrentUser(){
    const [user, setUser]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                  db.collection('users').doc(user.uid).get().then(snapshot=>{
                    setUser(snapshot.data().FullName);
                })
            }
            else{
                setUser(null);
            }
        })
    },[])
    return user;
}

const user = GetCurrentUser();

  return (
    <div className='wrapper'>
      <Navbar user={user}/>
      <Products page={'Products'}/>
    </div>
  )
}
