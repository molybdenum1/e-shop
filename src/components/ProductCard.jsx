import React from 'react';
import './css/ProductCard.css';

const ProductCard = (props) => {

  const handleAddToCart = () => {
    props.addToCart(props.info);
  }

  return (
    <div className='productCard'>
      <img src={props.info.productImg} 
      alt="krossivki"
      className='productImg'/>
      <div className='product-info'>
        <div className='productName'>{props.info.productName}</div>
        <div className='productPrice'>{props.info.productPrice}$</div>
        <div className='productDesc'>{props.info.productDesc}</div>
        <div className='mybtn' onClick={handleAddToCart}>ADD TO CART</div>
      </div>
    </div>
  )
}

export default ProductCard
