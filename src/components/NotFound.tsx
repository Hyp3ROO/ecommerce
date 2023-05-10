import { useNavigate } from 'react-router-dom'
import notFoundImg from '../assets/404.svg'
import Button from './ui/Button'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <img
        src={notFoundImg}
        alt='Error 404'
        className='h-[20rem] md:h-[30rem]'
      />
      <Button sm onClick={() => navigate('/')}>
        Go Back to Home Page
      </Button>
    </div>
  )
}
export default NotFound
