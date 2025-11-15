// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFLyhtbFFsCqRygj6aGPo_m-55asOSPnY",
  authDomain: "colorado-25.firebaseapp.com",
  projectId: "colorado-25",
  storageBucket: "colorado-25.firebasestorage.app",
  messagingSenderId: "198537098852",
  appId: "1:198537098852:web:545ac47fb31dd01fdad171",
  measurementId: "G-BNMGT0BMX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { app, analytics, db, storage };
