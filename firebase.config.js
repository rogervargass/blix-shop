import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC79O5h_IpH-GWRSs1jgj22xcJQr3YTtbI",
  authDomain: "blix-shop.firebaseapp.com",
  projectId: "blix-shop",
  storageBucket: "blix-shop.appspot.com",
  messagingSenderId: "569971218077",
  appId: "1:569971218077:web:c27a3fabdfa7311ef9a674",
  measurementId: "G-MMJK5CQ3FT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database
export const db = getDatabase(app);