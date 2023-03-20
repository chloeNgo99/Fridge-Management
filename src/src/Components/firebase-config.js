// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  
  apiKey: "AIzaSyAV3v2LMVe71hYEKKYP7gW-PPXkMDYMJi4",
  authDomain: "frigde-c786f.firebaseapp.com",
  databaseURL: "https://frigde-c786f-default-rtdb.firebaseio.com",
  projectId: "frigde-c786f",
  storageBucket: "frigde-c786f.appspot.com",
  messagingSenderId: "343146359497",
  appId: "1:343146359497:web:4ba02a49c2caa8d9303b18",
  measurementId: "G-WWXM7J95Q4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);