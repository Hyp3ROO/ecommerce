import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from './firebase'

const createUser = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then()
    .catch(error => {
      const errorMessage = error.message
      alert(errorMessage)
    })
}

const signInUser = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then()
    .catch(error => {
      const errorMessage = error.message
      alert(errorMessage)
    })
}

const signOutUser = () => {
  signOut(auth)
    .then()
    .catch(error => {
      const errorMessage = error.message
      alert(errorMessage)
    })
}

export { createUser, signInUser, signOutUser }
