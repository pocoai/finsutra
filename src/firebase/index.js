// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZM8TTAc6mJZX80trg8kjPr1gAwIAJa7s",
  authDomain: "favcy-navigator.firebaseapp.com",
  databaseURL: "https://favcy-navigator-default-rtdb.firebaseio.com",
  projectId: "favcy-navigator",
  storageBucket: "favcy-navigator.appspot.com",
  messagingSenderId: "13183305233",
  appId: "1:13183305233:web:cf47d7535fcc446e2ed3b0",
  measurementId: "G-053C5DF4P2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
