import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB4JrrR8ORyczN916rtSKJlrf5xn3_vTew",
    authDomain: "beautywebsite-8fcff.firebaseapp.com",
    projectId: "beautywebsite-8fcff",
    storageBucket: "beautywebsite-8fcff.firebasestorage.app",
    messagingSenderId: "203488558978",
    appId: "1:203488558978:web:bdbfee5b05031d55d8199b",
    measurementId: "G-FKXZ4CLP0P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, db };
