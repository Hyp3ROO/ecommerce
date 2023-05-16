import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../auth/firebase'
import { Navigate } from 'react-router-dom'

type withAuthType = {
  redirectCondition: (user: any) => boolean
  redirectTo: string
}

const withAuth =
  ({ redirectCondition, redirectTo }: withAuthType) =>
  (Component: React.ComponentType<any>) =>
  (props: any) => {
    const [user] = useAuthState(auth)
    if (redirectCondition(user)) {
      return <Component {...props} />
    }
    return <Navigate to={redirectTo} />
  }
export default withAuth
