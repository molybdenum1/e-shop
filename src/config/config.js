import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBKeZ1oTDkQlxvWRx3cM5Uf3amRZal-Myo",
  authDomain: "eshop-react-5df83.firebaseapp.com",
  projectId: "eshop-react-5df83",
  storageBucket: "eshop-react-5df83.appspot.com",
  messagingSenderId: "930112669572",
  appId: "1:930112669572:web:4e1ca0e1de7f533eee3fd1",
  measurementId: "G-WME1PF63K4"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }