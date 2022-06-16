import React, {useState} from 'react';
import Navbar from './Navbar';
import Products from './Products';
import {storage, db} from '../config/config';

const AddProducts = () => {
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    
    const types =['image/jpg','image/jpeg','image/png','image/PNG'];
    const handleProductImg=(e)=>{
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&&types.includes(selectedFile.type)){
                setProductImg(selectedFile);
                setError('');
            }
            else{
                setProductImg(null);
                setError('please select a valid image file type (png or jpg)')
            }
        }
        else{
            console.log('please select your file');
        }
    }

    const handleAddProducts=(e)=>{
        e.preventDefault();
        // console.log(title, description, price);
        // console.log(image);
        const uploadTask=storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed',snapshot=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(progress);
        },error=>setError(error.message),()=>{
            storage.ref('product-images').child(productImg.name).getDownloadURL().then(url=>{
                db.collection('Products').add({
                    productName,
                    productDesc,
                    productPrice: Number(productPrice),
                    url
                }).then(()=>{
                    setError('Product added successfully');
                    setProductName('');
                    setProductDesc('');
                    setProductPrice('');
                    document.getElementById('file').value='';
                    setError('');
                    setError('');
                    setTimeout(()=>{
                        setError('');
                    },3000)
                }).catch(error=>setError(error.message));
            })
        })
    }


  return (
    <div className='wrapper'>
      <Navbar/>
      <Products page={'Add Product'}/>
      <div  className='add-products-container'>
        <hr/>
        <form autoComplete='off' className='form-group'
        onSubmit={handleAddProducts}>
            <label htmlFor="product-name">Product name</label>
            <br/>
            <input type="text" className='form-control' required
            onChange={(e) => setProductName(e.target.value)} 
            value={productName}/>
            <br/>
            <label htmlFor="product-name">Product Description</label>
            <br/>
            <input type="text" className='form-control' required
            onChange={(e) => setProductDesc(e.target.value)} 
            value={productDesc}/>
            <br/>
            <label htmlFor="product-price">Product price</label>
            <br/>
            <input type="number" className='form-control' required
            onChange={(e) => setProductPrice(e.target.value)} 
            value={productPrice} />
            <br/>
            <label htmlFor="product-img">Product Image</label>
            <br/>
            <input type="file" className='form-control' 
            onChange={handleProductImg} id='file'/>
            <br/>
            <button type='submit' className='mybtn'>ADD</button>
        </form>
        {error && <span>{error}</span>}
      </div>
    </div>
    
  )
}

export default AddProducts
