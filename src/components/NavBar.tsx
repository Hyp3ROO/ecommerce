import { useAuthState } from 'react-firebase-hooks/auth'
import { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BsBasket3Fill } from 'react-icons/bs'
import Hamburger from 'hamburger-react'
import { auth } from '../auth/firebase'
import { signOutUser } from '../auth/auth'
import { Link } from 'react-router-dom'
import { Product } from '../types/Product'

type NavBarProps = {
  cartItems: Product[]
}

const NavBar = ({ cartItems }: NavBarProps) => {
  const [user] = useAuthState(auth)
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = () => {
    signOutUser()
    if (isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile NavBar */}
      <nav className='fixed inset-y-0 inset-x-12 z-10 flex h-20 items-center justify-between bg-white/60 backdrop-blur-sm md:hidden'>
        <h1 className='text-lg font-bold'>E-COM</h1>
        <div className='z-10'>
          <Hamburger duration={0.2} toggled={isOpen} toggle={setIsOpen} />
        </div>
        <ul
          className={`${
            isOpen ? 'fixed' : 'hidden'
          } inset-0 flex min-h-screen flex-col items-center justify-evenly bg-white/80 backdrop-blur-sm`}>
          <Link to='/' onClick={() => setIsOpen(false)}>
            <li className='group flex items-center justify-center p-4 text-xl duration-200 hover:scale-110 hover:text-blue-700'>
              <AiFillHome className='mr-3 text-blue-500 duration-200 group-hover:scale-110 group-hover:text-blue-700' />
              Home
            </li>
          </Link>
          <Link to='/cart' onClick={() => setIsOpen(false)}>
            <li className='group relative flex items-center justify-center p-4 text-xl duration-200 hover:scale-110 hover:text-blue-700'>
              <BsBasket3Fill className='mr-3 text-xl text-blue-500 duration-200 group-hover:scale-110 group-hover:text-blue-700 md:text-2xl' />
              Cart
              {cartItems.length > 0 ? (
                <span className='absolute top-0.5 -right-1 grid h-5 w-5 place-items-center rounded-full bg-blue-500 text-sm text-black duration-200 group-hover:scale-110'>
                  {cartItems.length}
                </span>
              ) : (
                ''
              )}
            </li>
          </Link>
          {!user ? (
            <li>
              <Link to='/sign-in'>
                <button className='rounded-lg border border-blue-700 px-10 py-2.5 text-center text-lg text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800'>
                  Sign In
                </button>
              </Link>
            </li>
          ) : (
            <li>
              <button
                className='rounded-lg border border-blue-700 px-10 py-2.5 text-center text-lg text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800'
                onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Desktop NavBar */}
      <nav className='fixed inset-y-0 inset-x-12 z-10 hidden h-20 items-center justify-between bg-white/60 backdrop-blur-sm md:flex'>
        <h1 className='text-lg font-bold md:text-2xl'>E-COM</h1>
        <ul className='flex items-center justify-center gap-4'>
          <li>
            <Link to='/'>
              <button className='group p-2'>
                <AiFillHome className='text-xl text-blue-500 duration-200 group-hover:scale-110 group-hover:text-blue-700 md:text-2xl' />
              </button>
            </Link>
          </li>
          <li>
            <Link to='/cart'>
              <button className='group relative p-2'>
                <BsBasket3Fill className='text-xl text-blue-500 duration-200 group-hover:scale-110 group-hover:text-blue-700 md:text-2xl' />
                {cartItems.length > 0 ? (
                  <span className='absolute -top-1 -right-2 grid h-5 w-5 place-items-center rounded-full bg-blue-500 text-sm duration-200 group-hover:scale-110'>
                    {cartItems.length}
                  </span>
                ) : (
                  ''
                )}
              </button>
            </Link>
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
            <li>
              <button
                className='rounded-lg border border-blue-700 px-3 py-1.5 text-center text-sm text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800 md:px-4 md:py-2 lg:px-6 lg:py-2.5'
                onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  )
}
export default NavBar
