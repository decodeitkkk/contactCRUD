// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFndmnuqlmGg2SpaOKt3Vet0cNqIPixXc",
  authDomain: "crud-91707.firebaseapp.com",
  projectId: "crud-91707",
  storageBucket: "crud-91707.appspot.com",
  messagingSenderId: "73800048094",
  appId: "1:73800048094:web:8fd04730f90c26c872114f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);