import { Link, useNavigate } from 'react-router-dom'
import useStoreContext from '../../hooks/useStoreContext'
import Button from '../ui/Button'
import type { Product } from '../../types/types'
import Tooltip from '@mui/material/Tooltip'
import { AiFillHome } from 'react-icons/ai'
import { ImCart } from 'react-icons/im'
import { GoTasklist } from 'react-icons/go'
import { BsMoon, BsSun } from 'react-icons/bs'

type DesktopListType = {
  cartItems: Product[]
  theme: string
  handleTheme: () => void
  handleSignOut: () => void
}

const DesktopList = ({
  cartItems,
  theme,
  handleTheme,
  handleSignOut,
}: DesktopListType) => {
  const { user } = useStoreContext()
  const navigate = useNavigate()
  return (
    <ul className='hidden items-center justify-center gap-8 md:flex'>
      <li className='grid place-items-center'>
        <Tooltip title='Home' arrow disableInteractive>
          <Link to='/'>
            <AiFillHome className='text-xl text-blue-500 duration-200 group-hover:text-blue-700 md:text-2xl' />
          </Link>
        </Tooltip>
      </li>
      <li className='relative grid place-items-center'>
        <Tooltip title='Cart' arrow disableInteractive>
          <Link to='/cart'>
            <ImCart className='text-xl text-blue-500 duration-200 group-hover:text-blue-700 md:text-2xl' />
            <span className='absolute -top-3 -right-3 grid h-5 w-5 place-items-center rounded-full bg-blue-500 text-sm duration-200'>
              {cartItems.length}
            </span>
          </Link>
        </Tooltip>
      </li>
      <li>
        <p
          className='flex cursor-pointer items-center justify-center gap-1 text-sm font-bold text-black duration-200 hover:text-blue-500 dark:text-white dark:hover:text-blue-500'
          onClick={handleTheme}>
          {theme === 'light' ? (
            <>
              <BsMoon className='mr-1 h-5 w-5 md:h-6 md:w-6' />
              Dark Mode
            </>
          ) : (
            <>
              <BsSun className='mr-1 h-5 w-5 md:h-6 md:w-6' />
              Light Mode
            </>
          )}
        </p>
      </li>
      {!user ? (
        <li>
          <Button sm onClick={() => navigate('/sign-in')}>
            Sign In
          </Button>
        </li>
      ) : (
        <>
          <li className='grid place-items-center'>
            <Tooltip title='Orders' arrow disableInteractive>
              <Link to='/orders'>
                <GoTasklist className='text-xl text-blue-500 duration-200 group-hover:text-blue-700 md:text-2xl' />
              </Link>
            </Tooltip>
          </li>
          <li>
            <Button sm onClick={handleSignOut}>
              Sign Out
            </Button>
          </li>
        </>
      )}
    </ul>
  )
}
export default DesktopList
