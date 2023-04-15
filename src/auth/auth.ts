import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from './firebase'
import toast from 'react-hot-toast'

const createUser = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => toast.success('Created user'))
    .catch(() => {
      toast.error('Unable to create user. Try again!')
    })
}

const signInUser = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => toast.success('Signed in'))
    .catch(() => {
      toast.error('Unable to sign in. Try again!')
    })
}

const signOutUser = () => {
  signOut(auth)
    .then(() => toast.success('Signed out'))
    .catch(() => {
      toast.error('Unable to sign out. Try again!')
    })
}

export { createUser, signInUser, signOutUser }
