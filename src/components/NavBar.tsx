import { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BsBasket3Fill } from 'react-icons/bs'
import Hamburger from 'hamburger-react'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile NavBar */}
      <nav className='fixed inset-y-0 inset-x-12 flex h-20 items-center justify-between bg-white/60 backdrop-blur-sm md:hidden'>
        <h1 className='text-lg font-bold'>E-COM</h1>
        <div className='z-10'>
          <Hamburger duration={0.2} toggled={isOpen} toggle={setIsOpen} />
        </div>
        <ul
          className={`${
            isOpen ? 'fixed' : 'hidden'
          } inset-0 flex min-h-screen flex-col items-center justify-around bg-white/80 backdrop-blur-sm`}>
          <li className='group flex items-center justify-center p-4 text-xl duration-200 hover:scale-110 hover:text-blue-700'>
            <AiFillHome className='mr-3 text-blue-500 duration-200 group-hover:scale-110 group-hover:text-blue-700' />
            Home
          </li>
          <li className='group flex items-center justify-center p-4 text-xl duration-200 hover:scale-110 hover:text-blue-700'>
            <BsBasket3Fill className='mr-3 text-xl text-blue-500 duration-200 group-hover:scale-110 group-hover:text-blue-700 md:text-2xl' />
            Basket
          </li>
          <li>
            <button className='rounded-lg border border-blue-700 px-10 py-2.5 text-center text-lg text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800'>
              Log In
            </button>
          </li>
        </ul>
      </nav>

      {/* Desktop NavBar */}
      <nav className='fixed inset-y-0 inset-x-12 hidden h-20 items-center justify-between bg-white/60 backdrop-blur-sm md:flex'>
        <h1 className='text-lg font-bold md:text-2xl'>E-COM</h1>
        <ul className='flex items-center justify-center gap-4'>
          <li>
            <button className='group p-2'>
              <AiFillHome className='text-xl text-blue-500 duration-200 group-hover:scale-110 group-hover:text-blue-700 md:text-2xl' />
            </button>
          </li>
          <li>
            <button className='group p-2'>
              <BsBasket3Fill className='text-xl text-blue-500 duration-200 group-hover:scale-110 group-hover:text-blue-700 md:text-2xl' />
            </button>
          </li>
          <li>
            <button className='rounded-lg border border-blue-700 px-3 py-1.5 text-center text-sm text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800 md:px-4 md:py-2 lg:px-6 lg:py-2.5'>
              Log In
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}
export default NavBar
