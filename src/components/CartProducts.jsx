import React from 'react';
import IndividualCart from './IndividualCart';

export default function CartProducts({cartProducts}) {
  return cartProducts.map(cartProduct => (
    <IndividualCart key={cartProduct.ID} cartProduct={cartProduct}/>
  ))
}
