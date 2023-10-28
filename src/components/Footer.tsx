const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='absolute bottom-2 left-1/2 -translate-x-1/2 text-gray-700 dark:text-gray-300'>
      &copy; {currentYear} E-COM
    </footer>
  )
}
export default Footer
