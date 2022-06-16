import React,{useState} from 'react'
import { auth , db} from '../config/config.js'
import Navbar from './Navbar';
import {Link, useNavigate} from 'react-router-dom'


export default function Signup () {

    const history = useNavigate();

    const [fullName, setFullname]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

    const handleSignup=(e)=>{
        e.preventDefault();
        // console.log(fullName, email, password);
        auth.createUserWithEmailAndPassword(email,password).then((credetials)=>{
            console.log(credetials);
            db.collection('users').doc(credetials.user.uid).set({
                FullName: fullName,
                Email: email,
                Password: password
            }).then(()=>{
                setSuccessMsg('Signup Successful. You will redirected to login');
                setFullname('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setSuccessMsg('');
                    history('/login');
                },3000)
            }).catch(error=>setErrorMsg(error.message));
        }).catch((error)=>{
            setErrorMsg(error.message)
        })
    }

    return (
        <div className='wrapper'>
        <Navbar/>
        <div  className='add-products-container'>
            <br></br>
            <br></br>
            <h1>Sign Up</h1>
            <hr></hr>
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form className='form-group' autoComplete="off" onSubmit={handleSignup}>
                <label>Full Name</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setFullname(e.target.value)} value={fullName}></input>
                <br></br>
                <label>Email</label>
                <input type="email" className='form-control' required
                 onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                <br></br>
                <label>Password</label>
                <input type="password" className='form-control' required
                 onChange={(e)=>setPassword(e.target.value)} value={password}></input>
                <br></br>
                <div className='btn-box'>
                    <span>Already have an account?  
                    <Link to="login" className='link'>Login Here</Link></span>
                    <br/>
                    <button type='submit' className='mybtn'>Sign Up</button>
                </div>
            </form>
            {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>                
            </>}
        </div>
        </div>
    )
}
