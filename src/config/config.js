import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDz4Lxl95sLX428qygVc6jBvCheNbS5Bpc",
    authDomain: "e-shop-769d7.firebaseapp.com",
    projectId: "e-shop-769d7",
    storageBucket: "e-shop-769d7.appspot.com",
    messagingSenderId: "742120543739",
    appId: "1:742120543739:web:58a57b700e81fdd560a75e",
    measurementId: "G-SG2F8NMEH6"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export {auth, db, storage}