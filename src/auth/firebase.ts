// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD_UXxygYWruUuZoJbHtJcg9gOOpxtVTYc',
  authDomain: 'ecommerce-3935c.firebaseapp.com',
  projectId: 'ecommerce-3935c',
  storageBucket: 'ecommerce-3935c.appspot.com',
  messagingSenderId: '178803925080',
  appId: '1:178803925080:web:6343b8aa3f86125f4fea2d',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()

export { auth }
