import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from './firebase'
import toast from 'react-hot-toast'

const notify = (text: string, color: string) =>
  toast(text, {
    style: { color },
  })

const createUser = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => notify('Created user', 'green'))
    .catch(() => {
      notify('Unable to create user. Try again!', 'red')
    })
}

const signInUser = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => notify('Signed in', 'green'))
    .catch(() => {
      notify('Unable to sign in. Try again!', 'red')
    })
}

const signOutUser = () => {
  signOut(auth)
    .then(() => notify('Signed out', 'red'))
    .catch(() => {
      notify('Unable to sign out. Try again!', 'red')
    })
}

export { createUser, signInUser, signOutUser }
