import './css/Main.css';
import React, {useState, useEffect}  from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Products from './Products';
import svg from '../static/svg/three-dots.svg';
import {auth, db} from '../config/config';

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

  //state of products
  const [products, setProducts] = useState([]);
  //get products from db
  const getProducts = async() => {
    const products = await db.collection('Products').get();
    const productsArr = [];
    for(let snap of products.docs){
      let data = snap.data();
      data.ID = snap.id;
      productsArr.push({...data});
      if(productsArr.length === products.docs.length) setProducts(productsArr)
    }
  }
  useEffect(() => {
    getProducts(); 
  }, [])

  return (
    <>
      <div className='wrapper'>
        <Navbar user={user}/>
        {products.length > 0 && (
          <div className='container-fluid'>
            <h1>Products</h1>
            <div className='products-box'>
              <Products products={products}/>
            </div>
          </div>
        )}
        {products.length < 1 && (
          <div className='container-fluid'>
            <img src={svg} alt="loader"/>
          </div>
        )}
      </div>
      <Footer/>
    </>
  )
}
