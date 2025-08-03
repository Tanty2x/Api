import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dotenv from 'dotenv';
dotenv.config();

// import { collection, getDocs, doc, getDoc } from "firebase/firestore"; 

const apiKey = process.env.apiKey;
// console.log(apiKey);

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.appId,
  appId: process.env.measurementId,
  measurementId: process.env.measurementId
};
console.log(firebaseConfig)
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Khởi tạo Firestore

export { db };