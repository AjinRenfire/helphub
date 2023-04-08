// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCITg7Uxvlxd2gfIWcFnF-l6qvdU8mHr5U",
  authDomain: "help-hub-2229d.firebaseapp.com",
  projectId: "help-hub-2229d",
  storageBucket: "help-hub-2229d.appspot.com",
  messagingSenderId: "812080856305",
  appId: "1:812080856305:web:affd9dae04e787bd9bbd50",
  measurementId: "G-6MV2M7LB5L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const database = getFirestore(app)

export default app