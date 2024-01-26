// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdeRM1eNC2uvXffodqsgOPwY6fFinxlIw",
  authDomain: "crypto-site-83cd6.firebaseapp.com",
  projectId: "crypto-site-83cd6",
  storageBucket: "crypto-site-83cd6.appspot.com",
  messagingSenderId: "1029839952895",
  appId: "1:1029839952895:web:575dffa5634c25c1a525ca",
  measurementId: "G-3BKHRFGB76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

const dataBase = getFirestore(app);


const auth = getAuth(app);


export { dataBase };

export {auth};

