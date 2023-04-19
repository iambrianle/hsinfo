
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAIhN2rKdzRum24bxN1oFfOrS0r7POzFrU",
  authDomain: "hsinfohs.firebaseapp.com",
  projectId: "hsinfohs",
  storageBucket: "hsinfohs.appspot.com",
  messagingSenderId: "94732520226",
  appId: "1:94732520226:web:6ffda594e09049de12337b"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, db, storage };