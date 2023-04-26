// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmiBtuwH2sk7_FAEgXpZjIiJon9wxvEUU",
  authDomain: "restorans-ff417.firebaseapp.com",
  projectId: "restorans-ff417",
  storageBucket: "restorans-ff417.appspot.com",
  messagingSenderId: "146086570952",
  appId: "1:146086570952:web:b9115b6aeb0cd8fee76efd"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;