import React from 'react'
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import {auth, db} from '../config/config'

export default function IndividualCart({cartProduct, cartProductIncrease, cartProductDecrease}){
    
    const handleCartProductIncrease = () => {
        cartProductIncrease(cartProduct);
    }
    const handleCartProductDecrease = () => {
        cartProductDecrease(cartProduct);
    }
    const handleCartProductDelete = () => {
        auth.onAuthStateChanged(user => {
            if(user){
                db.collection('Cart ' + user.uid).doc(cartProduct.ID).delete().then(() => {
                    console.log('successfully deleted');
                })
            }
        })
    }
    
    return (
        <div className='product'>
            <img src={cartProduct.productImg} alt="product-img" className='productImg'/>
            <div className='productName'>{cartProduct.productName}</div>
            <div className='productPrice'>{cartProduct.productPrice}$</div>
            <div className='productDesc'>{cartProduct.productDesc}</div>
            <div className='product-text'>
                <span>Quantity</span>
                <div className='action-btns minus' 
                     onClick={handleCartProductDecrease}>
                    <Icon icon={minus} size={20}/>
                </div>                
                <div>{cartProduct.qty}</div>               
                <div className='action-btns plus'
                    onClick={handleCartProductIncrease} >
                    <Icon icon={plus} size={20}/>
                </div>
            </div>
            <div className='product-text cart-price'>$ {cartProduct.TotalProductPrice}</div>
            <div className='delete-from-cart'
            onClick={handleCartProductDelete}
            >DELETE</div>            
        </div>
    )
}
