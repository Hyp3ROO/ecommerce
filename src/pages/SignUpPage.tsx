import LoginForm from '../components/form/LoginForm'

const SignUpPage = () => {
  const formProps = {
    title: 'Sign Up With Email And Password',
    btnText: 'Sign Up',
    googleBtnText: 'Sign In with Google',
    text: 'Or if you already have an account',
    linkText: 'Sign In Here',
    link: '/sign-in',
  }

  return <LoginForm formProps={formProps} />
}
export default SignUpPage
