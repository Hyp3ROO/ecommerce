import type { User } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../auth/firebase'
import { Navigate } from 'react-router-dom'

type WithAuthType = {
  redirectCondition: (user: User | null | undefined) => boolean
  redirectTo: string
}

const withAuth =
  <Props extends object>({ redirectCondition, redirectTo }: WithAuthType) =>
  (Component: React.ComponentType<Props>) =>
  (props: Props) => {
    const [user] = useAuthState(auth)
    if (redirectCondition(user)) {
      return <Component {...props} />
    }
    return <Navigate to={redirectTo} />
  }
export default withAuth
