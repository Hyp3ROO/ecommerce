import LoginForm from '../components/LoginForm'

const SignUpPage = () => {
  const formProps = {
    title: 'Sign Up With Email And Password',
    btnText: 'Sign Up',
    googleBtnText: 'Sign Up with Google',
    linkText: 'Sign In Here',
    link: '/sign-in',
  }

  return <LoginForm formProps={formProps} />
}
export default SignUpPage
