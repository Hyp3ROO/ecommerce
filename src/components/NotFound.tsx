import { useNavigate } from 'react-router-dom'
import notFoundImg from '../assets/404.svg'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <img
        src={notFoundImg}
        alt='Error 404'
        className='h-[20rem] md:h-[30rem]'
      />
      <button
        className='rounded-lg border border-blue-700 px-3 py-1.5 text-center text-sm text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800 md:px-4 md:py-2 lg:px-6 lg:py-2.5'
        onClick={() => navigate('/')}>
        Go Back to Home Page
      </button>
    </div>
  )
}
export default NotFound
