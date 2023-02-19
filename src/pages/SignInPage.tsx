import LoginForm from '../components/LoginForm'

const SignInPage = () => {
  const formProps = {
    title: 'Sign In With Email And Password',
    btnText: 'Sign In',
    googleBtnText: 'Sign In with Google',
    text: "Or if you don't have an account yet",
    linkText: 'Sign Up Here',
    link: '/sign-up',
  }

  return <LoginForm formProps={formProps} />
}
export default SignInPage
