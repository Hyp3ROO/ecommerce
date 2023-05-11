import { useState } from 'react'
import { createUser, signInUser } from '../../auth/auth'
import { IoMdMail, IoMdClose } from 'react-icons/io'
import { AiFillLock } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { auth } from '../../auth/firebase'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import Button from '../ui/Button'
import { toast } from 'react-hot-toast'

type FormProps = {
  formProps: {
    title: string
    btnText: string
    googleBtnText: string
    text: string
    linkText: string
    link: string
  }
}

const LoginForm = ({ formProps }: FormProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const [form, setForm] = useState({
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  })
  const emailRegExp = new RegExp(
    '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
  )

  if (user) {
    return <Navigate to='/' replace />
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailRegExp.test(form.email)) {
      setForm(prev => {
        return { ...prev, emailError: 'A valid email is required' }
      })
    } else {
      setForm(prev => {
        return { ...prev, emailError: '' }
      })
    }
    if (form.password.length < 6) {
      setForm(prev => {
        return {
          ...prev,
          passwordError: 'Password must be at least 6 characters',
        }
      })
    } else {
      setForm(prev => {
        return {
          ...prev,
          passwordError: '',
        }
      })
    }
    if (emailRegExp.test(form.email) && form.password.length >= 6)
      if (location.pathname === '/sign-up') {
        createUser(form.email, form.password)
      } else if (location.pathname === '/sign-in') {
        signInUser(form.email, form.password)
      }
  }

  return (
    <div className='flex flex-col items-center justify-center bg-white text-center text-black dark:bg-gray-900 dark:text-white lg:pt-12'>
      <button
        className='group absolute right-5 top-5'
        onClick={() => navigate('/')}>
        <IoMdClose className='text-3xl duration-200 group-hover:text-blue-500' />
      </button>
      <form
        className='flex flex-col items-center justify-center gap-3'
        onSubmit={e => handleSubmit(e)}>
        <h3 className='mb-3 text-2xl font-bold md:mb-10'>{formProps.title}</h3>
        <label>Email</label>
        <div className='relative'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <IoMdMail className='h-5 w-5 text-gray-500 dark:text-gray-400' />
          </div>
          <input
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            type='text'
            value={form.email}
            onChange={e => setForm({ ...form, email: e.currentTarget.value })}
          />
        </div>
        <p className='text-sm font-bold text-red-500'>
          {form.emailError !== '' ? form.emailError : ''}
        </p>
        <label>Password</label>
        <div className='relative'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <AiFillLock className='h-5 w-5 text-gray-500 dark:text-gray-400' />
          </div>
          <input
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            type='password'
            value={form.password}
            onChange={e =>
              setForm({ ...form, password: e.currentTarget.value })
            }
          />
        </div>
        <p className='text-sm font-bold text-red-500'>
          {form.passwordError !== '' ? form.passwordError : ''}
        </p>
        <Button md mt>
          {formProps.btnText}
        </Button>
      </form>
      <div className='my-6 w-[50%] max-w-[25rem] rounded-br-full rounded-bl-full bg-blue-500 p-1.5' />
      <button
        className='dark:focus:ring-[#4285F4]/55 mr-2 mb-2 inline-flex items-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50'
        onClick={() => signInWithRedirect(auth, new GoogleAuthProvider())}>
        <svg
          className='mr-2 -ml-1 h-4 w-4'
          aria-hidden='true'
          focusable='false'
          data-prefix='fab'
          data-icon='google'
          role='img'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 488 512'>
          <path
            fill='currentColor'
            d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'></path>
        </svg>
        {formProps.googleBtnText}
      </button>
      <p className='my-6 text-sm'>
        {formProps.text}{' '}
        <Link
          to={formProps.link}
          className='text-blue-500 duration-200 hover:text-blue-800'>
          {formProps.linkText}
        </Link>
      </p>
    </div>
  )
}
export default LoginForm