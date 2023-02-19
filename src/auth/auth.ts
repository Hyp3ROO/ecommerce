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
      const errorCode = error.code
      const errorMessage = error.message
      console.warn(`${errorCode} ${errorMessage}`)
    })
}

const signInUser = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then()
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      console.warn(`${errorCode} ${errorMessage}`)
    })
}

const signOutUser = () => {
  signOut(auth)
    .then()
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      console.warn(`${errorCode} ${errorMessage}`)
    })
}

export { createUser, signInUser, signOutUser }
