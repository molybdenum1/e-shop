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

    let Product;
  
    //cart product increase function
    const cartProductIncrease = (cartProduct) => {
        // console.log(cartProduct)
        Product = cartProduct;
        Product.qty = Product.qty + 1;
        Product.TotalProductPrice = Product.qty * Product.productPrice;
        //update database 
        auth.onAuthStateChanged(user => {
            if(user){
                db.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(() => {
                    console.log('incremented')
                })
            }else{
                console.log('not sighed in');
            }
        })
    }
    //cart product decrease function
    const cartProductDecrease = (cartProduct) => {
        // console.log(cartProduct)
        Product = cartProduct;
        if(Product.qty > 1){
            Product.qty = Product.qty - 1;
            Product.TotalProductPrice = Product.qty * Product.productPrice;
        }
        //update database 
        auth.onAuthStateChanged(user => {
            if(user){
                db.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(() => {
                    console.log('decreamented')
                })
            }else{
                console.log('not signed in');
            }
        })
    }

  return (
    <div>
      <div className='wrapper'>
        <Navbar user={user}/>

          {cartProducts.length > 0 && (
              <div className='container-fluid'>
                  <div className='products-cart'>
                    <h1>Cart</h1>
                    <CartProducts cartProducts={cartProducts}
                    cartProductIncrease={cartProductIncrease}
                    cartProductDecrease={cartProductDecrease}/>
                  </div>
              </div>
          )}
          {cartProducts.length < 1 && (
              <div className='container-fluid'>
                  <h1>No products to show</h1>
              </div>
          )}
      </div>
      <Footer/>
    </div>
  )
}
