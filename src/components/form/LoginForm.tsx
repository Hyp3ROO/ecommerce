import { useState } from 'react'
import { createUser, signInUser } from '../../auth/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import FormInput from './FormInput'
import GoogleButton from './GoogleButton'
import { IoMdMail, IoMdClose } from 'react-icons/io'
import { AiFillLock } from 'react-icons/ai'
import withAuth from '../../hoc/withAuth'
import { Form } from '../../types/types'
import { User } from 'firebase/auth'
import { hasWhiteSpace } from '../../utils/hasWhiteSpace'

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
  const [form, setForm] = useState<Form>({
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  })

  const validateForm = () => {
    let isFormValid = true

    if (form.password.length < 6) {
      setForm(prev => {
        return {
          ...prev,
          passwordError: 'Password must be at least 6 characters',
        }
      })
      isFormValid = false
    } else if (hasWhiteSpace(form.password)) {
      setForm(prev => {
        return {
          ...prev,
          passwordError: 'You cannot use whitespace characters!',
        }
      })
      isFormValid = false
    } else {
      setForm(prev => {
        return {
          ...prev,
          passwordError: '',
        }
      })
    }

    return isFormValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

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
        <FormInput
          form={form}
          setForm={setForm}
          name='email'
          nameError='emailError'
          placeholder='e.g. test@test.com'
          icon={
            <IoMdMail className='h-5 w-5 text-gray-500 dark:text-gray-400' />
          }
        />
        <FormInput
          form={form}
          setForm={setForm}
          name='password'
          nameError='passwordError'
          placeholder='e.g. 123123'
          icon={
            <AiFillLock className='h-5 w-5 text-gray-500 dark:text-gray-400' />
          }
        />
        <Button md mt>
          {formProps.btnText}
        </Button>
      </form>
      <div className='my-6 w-[50%] max-w-[25rem] rounded-br-full rounded-bl-full bg-blue-500 p-1.5' />
      <GoogleButton formProps={formProps} />
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
export default withAuth<FormProps>({
  redirectCondition: (user: User | null | undefined) => !user,
  redirectTo: '/',
})(LoginForm)
