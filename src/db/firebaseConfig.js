import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAxTGBAwP6HwaWCN4-PAMFhsVLYZnn0J1c",
  authDomain: "whatsappclone-65d3a.firebaseapp.com",
  projectId: "whatsappclone-65d3a",
  storageBucket: "whatsappclone-65d3a.appspot.com",
  messagingSenderId: "44093790458",
  appId: "1:44093790458:web:cc55c2757cc6aa6c485143",
  measurementId: "G-YF8Y261RZF"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
export { auth, firebaseApp, db, storage, firebaseConfig };