import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from './firebase'
import toast from 'react-hot-toast'

const createUser = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    toast.success('Created user')
  } catch (err) {
    toast.error(`Unable to create user. Try again! Error: ${err}`)
  }
}

const signInUser = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    toast.success('Signed in')
  } catch (err) {
    toast.error(`Unable to sign in. Try again! Error: ${err}`)
  }
}

const signOutUser = async () => {
  try {
    await signOut(auth)
    toast.success('Signed out')
  } catch (err) {
    toast.error(`Unable to sign out. Try again! Error: ${err}`)
  }
}

export { createUser, signInUser, signOutUser }
