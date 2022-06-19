import React from 'react';
import ProductCard from './ProductCard';

export default function Products(props) {
  return (
    <div className='product-container'>
     {props.products.map(card => <ProductCard  key={card.ID} info={card} 
                                  addToCart={props.addToCart}/>)}
    </div>
  )
}
