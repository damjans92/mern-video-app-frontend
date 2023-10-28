// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyCIVapzXpW-wzP-mvpnMg-aXJQcxQubal8',
  authDomain: 'app-b3747.firebaseapp.com',
  projectId: 'app-b3747',
  storageBucket: 'app-b3747.appspot.com',
  messagingSenderId: '966870723297',
  appId: '1:966870723297:web:36fd2c8596e969795765a0',
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app
