import {auth, db} from '../config/config';
import './css/Cart.css';
import React, {useState, useEffect}  from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartProducts from './CartProducts';

export default function Cart() {

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

    // state of cart products
  const [cartProducts, setCartProducts] = useState([]);
    // getting cart products from firestore collection and updating the state
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('Cart ' + user.uid).onSnapshot(snapshot => {
                    const newCartProduct = snapshot.docs.map(doc => ({
                        ID: doc.id,
                        ...doc.data(),                     
                    })); 
                    setCartProducts(newCartProduct);
                })

            }else{
                console.log('user is not signed in')
            }
        })
    },[])
  
    console.log(cartProducts)

  return (
    <div>
      <Navbar user={user}/>
      <div className='cart'>
          <h1>Cart</h1>
          {cartProducts.length > 0 && (
              <div className='container-fluid'>
                  <div className='products-cart'>
                      <CartProducts cartProducts={cartProducts}/>
                  </div>
              </div>
          )}
          {cartProducts.length < 1 && (
              <div className='container-fluid'>No products to show</div>
          )}
      </div>
      <Footer/>
    </div>
  )
}
