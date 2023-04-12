import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { GoTasklist } from 'react-icons/go'
import { ImCart } from 'react-icons/im'
import Hamburger from 'hamburger-react'
import { auth } from '../auth/firebase'
import { signOutUser } from '../auth/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Product } from '../types/Product'
import Tooltip from '@mui/material/Tooltip'
import { BsMoon, BsSun } from 'react-icons/bs'

type NavBarProps = {
  cartItems: Product[]
}

const NavBar = ({ cartItems }: NavBarProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.theme || 'dark')

  const handleSignOut = () => {
    signOutUser()
    if (isOpen) {
      setIsOpen(false)
    }
  }

  const handleTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark')
  }

  useEffect(() => {
    switch (theme) {
      case 'dark':
        document.body.classList.add('dark')
        localStorage.theme = 'dark'
        break
      case 'light':
        document.body.classList.remove('dark')
        localStorage.theme = ''
        break
    }
  }, [theme])

  return (
    <>
      {/* Mobile NavBar */}
      <nav
        className={`fixed inset-y-0 z-10 flex h-20 w-full items-center justify-between bg-white/80 px-12 dark:bg-gray-900/80 md:hidden ${
          (location.pathname === '/sign-in' ||
            location.pathname === '/sign-up') &&
          'hidden'
        }`}>
        <Link to='/'>
          <h1 className='text-lg font-bold duration-200 hover:text-blue-500'>
            E-COM
          </h1>
        </Link>
        <div className='z-10'>
          <Hamburger duration={0.2} toggled={isOpen} toggle={setIsOpen} />
        </div>
        <ul
          className={`${
            isOpen ? 'fixed' : 'hidden'
          } inset-0 flex min-h-screen flex-col items-center justify-evenly bg-white/80 dark:bg-gray-900/80`}>
          <Link to='/' onClick={() => setIsOpen(false)}>
            <li className='group flex items-center justify-center p-4 text-xl duration-200 hover:scale-110 hover:text-blue-700'>
              <AiFillHome className='mr-3 text-blue-500 duration-200 group-hover:text-blue-700' />
              Home
            </li>
          </Link>
          <Link to='/cart' onClick={() => setIsOpen(false)}>
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
              <button
                className='rounded-lg border border-blue-700 px-10 py-2.5 text-center text-lg text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800'
                onClick={() => {
                  navigate('/sign-in')
                  setIsOpen(false)
                }}>
                Sign In
              </button>
            </li>
          ) : (
            <>
              <Link to='/orders' onClick={() => setIsOpen(false)}>
                <li className='group relative flex items-center justify-center p-4 text-xl duration-200 hover:scale-110 hover:text-blue-700'>
                  <GoTasklist className='mr-3 text-xl text-blue-500 duration-200 group-hover:text-blue-700 md:text-2xl' />
                  Orders
                </li>
              </Link>
              <li>
                <button
                  className='rounded-lg border border-blue-700 px-10 py-2.5 text-center text-lg text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800'
                  onClick={handleSignOut}>
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Desktop NavBar */}
      <nav
        className={`fixed inset-y-0 inset-x-12 z-10 hidden h-20 items-center justify-between bg-white/80 dark:bg-gray-900/80 md:flex ${
          (location.pathname === '/sign-in' ||
            location.pathname === '/sign-up') &&
          'md:hidden'
        }`}>
        <Link to='/'>
          <h1 className='text-lg font-bold duration-200 hover:text-blue-500 md:text-2xl'>
            E-COM
          </h1>
        </Link>
        <ul className='flex items-center justify-center gap-8'>
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
              <Link to='/sign-in'>
                <button className='rounded-lg border border-blue-700 px-3 py-1.5 text-center text-sm text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800 md:px-4 md:py-2 lg:px-6 lg:py-2.5'>
                  Sign In
                </button>
              </Link>
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
                <button
                  className='rounded-lg border border-blue-700 px-3 py-1.5 text-center text-sm text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800 md:px-4 md:py-2 lg:px-6 lg:py-2.5'
                  onClick={handleSignOut}>
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  )
}
export default NavBar
