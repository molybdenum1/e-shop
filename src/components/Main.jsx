import './css/Main.css';
import React, {useState, useEffect}  from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Products from './Products';
import {useNavigate} from 'react-router-dom';
import svg from '../static/svg/three-dots.svg';
import {auth, db} from '../config/config';

export default function Main(props) {

  const history = useNavigate();

  function GetUserId() {
    const [uid, setUID]=useState(null);
    useEffect(() => {
      auth.onAuthStateChanged(user=>{
        if(user){
          setUID(user.uid);
        }
      })
    }, [])
    return uid;
  }

  const uid = GetUserId();

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

  // state of totalProducts
  const [totalProducts, setTotalProducts]=useState(0);
  // getting cart products   
  useEffect(()=>{        
      auth.onAuthStateChanged(user=>{
          if(user){
              db.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                  const qty = snapshot.docs.length;
                  setTotalProducts(qty);
              })
          }
      })       
  },[])  


  let Product;

  const addToCart = (product) => {
    if(uid !== null){
      // console.log(product);
      Product = product;
      Product['qty'] = 1;
      Product['TotalProductPrice'] = +(Product.qty) * +(Product.productPrice);
      db.collection('Cart ' + uid).doc(product.ID).set(Product).then(() => {
        console.log('successfully added ');
      })

    }else{
      history('/login');
    }
    
  }

  return (
    <>
      <div className='wrapper'>
        <Navbar user={user} totalQty={totalProducts}/>
        {products.length > 0 && (
          <div className='container-fluid'>
            <h1>Products</h1>
            <div className='products-box'>
              <Products products={products} addToCart={addToCart}/>
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
