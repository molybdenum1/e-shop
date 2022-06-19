import React from 'react'
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'

export default function IndividualCart({cartProduct}){
    return (
        <div className='product'>
            <img src={cartProduct.productImg} alt="product-img" className='productImg'/>
            <div className='productName'>{cartProduct.productName}</div>
            <div className='productPrice'>{cartProduct.productPrice}$</div>
            <div className='productDesc'>{cartProduct.productDesc}</div>
            <span>Quantity</span>
            <div className='product-text quantity-box'>
                <div className='action-btns minus' >
                    <Icon icon={minus} size={20}/>
                </div>                
                <div>{cartProduct.qty}</div>               
                <div className='action-btns plus' >
                    <Icon icon={plus} size={20}/>
                </div>
            </div>
            <div className='product-text cart-price'>$ {cartProduct.TotalProductPrice}</div>
            <div className='btn btn-danger btn-md cart-btn'>DELETE</div>            
        </div>
    )
}
