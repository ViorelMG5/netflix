// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxqO43JlsvvmjhfOSq3QbmaaaynIk3ztw",
  authDomain: "netflix-c7630.firebaseapp.com",
  projectId: "netflix-c7630",
  storageBucket: "netflix-c7630.appspot.com",
  messagingSenderId: "327449960142",
  appId: "1:327449960142:web:c317656df6235a910e3a9f",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
export const auth = getAuth();
