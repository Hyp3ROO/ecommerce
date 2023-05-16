import { Link, useNavigate } from 'react-router-dom'
import useStoreContext from '../../hooks/useStoreContext'
import Button from '../ui/Button'
import type { Product } from '../../types/types'
import { AiFillHome } from 'react-icons/ai'
import { ImCart } from 'react-icons/im'
import { GoTasklist } from 'react-icons/go'
import { BsMoon, BsSun } from 'react-icons/bs'

type MobileListType = {
  navBarIsOpen: boolean
  setNavBarIsOpen: (navBarIsOpen: boolean) => void
  cartItems: Product[]
  theme: string
  handleTheme: () => void
  handleSignOut: () => void
}

const MobileList = ({
  navBarIsOpen,
  setNavBarIsOpen,
  cartItems,
  theme,
  handleTheme,
  handleSignOut,
}: MobileListType) => {
  const { user } = useStoreContext()
  const navigate = useNavigate()
  return (
    <ul
      className={`${
        navBarIsOpen ? 'fixed' : 'hidden'
      } inset-0 flex min-h-screen flex-col items-center justify-evenly bg-white/95 dark:bg-gray-900/95 md:hidden`}>
      <Link to='/' onClick={() => setNavBarIsOpen(false)}>
        <li className='group flex items-center justify-center p-4 text-xl duration-200 hover:scale-110 hover:text-blue-700'>
          <AiFillHome className='mr-3 text-blue-500 duration-200 group-hover:text-blue-700' />
          Home
        </li>
      </Link>
      <Link to='/cart' onClick={() => setNavBarIsOpen(false)}>
        <li className='group relative flex items-center justify-center p-4 text-xl duration-200 hover:scale-110 hover:text-blue-700'>
          <ImCart className='mr-3 text-xl text-blue-500 duration-200 group-hover:text-blue-700 md:text-2xl' />
          Cart
          <span className='absolute top-0.5 -right-1 grid h-5 w-5 place-items-center rounded-full bg-blue-500 text-sm text-black duration-200'>
            {cartItems.length}
          </span>
        </li>
      </Link>
      <li>
        <p
          className='flex cursor-pointer items-center justify-center gap-1 text-sm font-bold text-blue-500 duration-200 hover:text-blue-700'
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
          <Button
            lg
            onClick={() => {
              navigate('/sign-in')
              setNavBarIsOpen(false)
            }}>
            Sign In
          </Button>
        </li>
      ) : (
        <>
          <Link to='/orders' onClick={() => setNavBarIsOpen(false)}>
            <li className='group relative flex items-center justify-center p-4 text-xl duration-200 hover:scale-110 hover:text-blue-700'>
              <GoTasklist className='mr-3 text-xl text-blue-500 duration-200 group-hover:text-blue-700 md:text-2xl' />
              Orders
            </li>
          </Link>
          <li>
            <Button lg onClick={handleSignOut}>
              Sign Out
            </Button>
          </li>
        </>
      )}
    </ul>
  )
}
export default MobileList
