import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBdGhygCmfbO0KYINI2k2awlfBd2vZ2xL0",
  authDomain: "chat-9f834.firebaseapp.com",
  projectId: "chat-9f834",
  storageBucket: "chat-9f834.appspot.com",
  messagingSenderId: "397040527105",
  appId: "1:397040527105:web:f91a6b4839065bd3599d00"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()