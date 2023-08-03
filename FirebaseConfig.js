// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getAuth } from '@react-native-firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAHUE_xc3gL3Vh3E37j5rlZqsq8paYvAE",
  authDomain: "picssaveauth.firebaseapp.com",
  projectId: "picssaveauth",
  storageBucket: "picssaveauth.appspot.com",
  messagingSenderId: "683340102865",
  appId: "1:683340102865:web:c017a581fffdb18dc2d9f0",
  measurementId: "G-YS65H1XS7K"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
// const FIREBASE_AUTH = getAuth(FIREBASE_APP);