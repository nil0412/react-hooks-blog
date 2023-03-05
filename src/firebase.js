// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjez65YYhEgMsscV9Hq4C8UOmely98GUo",
  authDomain: "react-hooks-blog-5bd0a.firebaseapp.com",
  projectId: "react-hooks-blog-5bd0a",
  storageBucket: "react-hooks-blog-5bd0a.appspot.com",
  messagingSenderId: "627801511363",
  appId: "1:627801511363:web:d5707e7137ebe1dd961976"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore(app);