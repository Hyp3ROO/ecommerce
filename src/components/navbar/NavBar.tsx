import { signOutUser } from '../../auth/auth'
import useStoreContext from '../../hooks/useStoreContext'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Hamburger from 'hamburger-react'
import MobileList from './MobileList'
import DesktopList from './DesktopList'

const NavBar = () => {
  const { cartItems } = useStoreContext()
  const location = useLocation()
  const [navBarIsOpen, setNavBarIsOpen] = useState(false)
  const [theme, setTheme] = useState(
    localStorage.theme !== undefined ? localStorage.theme : 'dark'
  )

  const handleSignOut = () => {
    signOutUser()
    if (navBarIsOpen) {
      setNavBarIsOpen(false)
    }
  }

  const handleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark')
      localStorage.theme = 'dark'
    } else if (theme === 'light') {
      document.body.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }, [theme])

  useEffect(() => {
    if (navBarIsOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navBarIsOpen])

  return (
    <>
      <nav
        className={`fixed inset-y-0 z-10 flex h-20 w-full items-center justify-between bg-white/80 px-12 dark:bg-gray-900/80 ${
          (location.pathname === '/sign-in' ||
            location.pathname === '/sign-up') &&
          'hidden'
        }`}>
        <Link to='/' className='group p-2 md:p-0'>
          <h1 className='text-lg font-bold duration-200 group-hover:text-blue-500 md:text-2xl'>
            E-COM
          </h1>
        </Link>
        <div className='z-10 md:hidden'>
          <Hamburger
            duration={0.2}
            toggled={navBarIsOpen}
            toggle={setNavBarIsOpen}
          />
        </div>

        {/* Mobile NavBar List */}
        <MobileList
          navBarIsOpen={navBarIsOpen}
          setNavBarIsOpen={setNavBarIsOpen}
          cartItems={cartItems}
          theme={theme}
          handleTheme={handleTheme}
          handleSignOut={handleSignOut}
        />

        {/* Desktop NavBar List */}
        <DesktopList
          cartItems={cartItems}
          theme={theme}
          handleTheme={handleTheme}
          handleSignOut={handleSignOut}
        />
      </nav>
    </>
  )
}
export default NavBar
