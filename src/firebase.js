import firebase from 'firebase/app';
import 'firebase/auth'; // For authentication
import 'firebase/database'; // For realtime database
import 'firebase/firestore'; // For Firestore database
import 'firebase/storage'; // For storage

const firebaseConfig = {
    apiKey: "AIzaSyAIhN2rKdzRum24bxN1oFfOrS0r7POzFrU",
    authDomain: "hsinfohs.firebaseapp.com",
    projectId: "hsinfohs",
    storageBucket: "hsinfohs.appspot.com",
    messagingSenderId: "94732520226",
    appId: "1:94732520226:web:6ffda594e09049de12337b"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;