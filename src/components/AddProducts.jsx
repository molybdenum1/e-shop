import React, {useState} from 'react';
import Navbar from './Navbar';
import Products from './Products';
import {storage, db} from '../config/config';

const AddProducts = () => {
    const [productName, setProductName] = useState(' ');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpg']

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if(selectedFile && types.includes(selectedFile.type)){
            setProductImg(selectedFile);
            setError('');
        }else{
            setProductImg(null);
            setError('Please select a valid image type png or jpg');
        }
    }

    const addProduct = (e) => {
        e.preventDefault();
        // console.log(productName, productPrice, productImg);
        const uploadTask = storage.ref(`product-image/${productImg.name}`).put(productImg);
        uploadTask.on('state_change', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => {
            setError(err.message);
        }, () => {
            storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                db.collection('Product').add({
                    productName: productName,
                    productPrice: Number(productPrice),
                    productImg: url
                }).then(() => {
                    setProductName('');
                    setProductPrice(0);
                    setProductImg('');
                    setError('');
                    document.getElementById('file').value = '';
                }).catch(err => setError(err.message));
            } )
        })
    }


  return (
    <div className='wrapper'>
      <Navbar/>
      <Products page={'Add Product'}/>
      <div  className='add-products-container'>
        <hr/>
        <form autoComplete='off' className='form-group'
        onSubmit={addProduct}>
            <label htmlFor="product-name">Product name</label>
            <br/>
            <input type="text" className='form-control' required
            onChange={(e) => setProductName(e.target.value)} 
            value={productName}/>
            <br/>
            <label htmlFor="product-price">Product price</label>
            <br/>
            <input type="number" className='form-control' required
            onChange={(e) => setProductPrice(e.target.value)} 
            value={productPrice}/>
            <br/>
            <label htmlFor="product-img">Product Image</label>
            <br/>
            <input type="file" className='form-control' 
            onChange={productImgHandler} id='file'/>
            <br/>
            <button type='submit' className='mybtn'>ADD</button>
        </form>
        {error && <span>{error}</span>}
      </div>
    </div>
    
  )
}

export default AddProducts
