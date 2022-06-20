import React from 'react';
import IndividualCart from './IndividualCart';

export default function CartProducts({cartProducts,cartProductIncrease,cartProductDecrease}) {
  return cartProducts.map(cartProduct => (
    <IndividualCart key={cartProduct.ID} 
    cartProduct={cartProduct}
    cartProductIncrease={cartProductIncrease}
    cartProductDecrease={cartProductDecrease}/>
  ))
}
