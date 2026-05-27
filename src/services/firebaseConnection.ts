import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAs69pGIaV4VIotJRx2tp_Jx-GfGVlctSY",
  authDomain: "reactlinkks.firebaseapp.com",
  projectId: "reactlinkks",
  storageBucket: "reactlinkks.firebasestorage.app",
  messagingSenderId: "427470692542",
  appId: "1:427470692542:web:7e918ef3b6ef8a6bb9beef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db};