import firebase from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2uzVBEP2Vu77fuW3ISQpq4jsL_62XXiI",
  authDomain: "bakery-1ab54.firebaseapp.com",
  projectId: "bakery-1ab54",
  storageBucket: "bakery-1ab54.appspot.com",
  messagingSenderId: "218173403663",
  appId: "1:218173403663:web:bb7cce4bb920ddb6efa97a",
  measurementId: "G-TH3MYQ7H1D"
};

firebase.initializeApp(firebaseConfig);
export const storage = getStorage();