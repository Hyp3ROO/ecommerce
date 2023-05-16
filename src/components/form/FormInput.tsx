import { Dispatch, SetStateAction } from 'react'
import { Form } from '../../types/types'

type FormInputType<T> = {
  form: Form
  setForm: Dispatch<SetStateAction<T>>
  name: keyof Form
  nameError: keyof Form
  placeholder: string
  icon: JSX.Element
}

const FormInput = <T extends Partial<Form>>({
  form,
  setForm,
  name,
  nameError,
  placeholder,
  icon,
}: FormInputType<T>) => {
  return (
    <>
      <label className='capitalize'>{name}</label>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          {icon}
        </div>
        <input
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          type='text'
          value={form[name] ?? ''}
          onChange={e =>
            setForm(prevForm => ({
              ...prevForm,
              [name]: e.target.value,
            }))
          }
          placeholder={placeholder}
        />
      </div>
      <p className='text-sm font-bold text-red-500'>
        {form[nameError] !== '' ? form[nameError] : ''}
      </p>
    </>
  )
}
export default FormInput
