import { useUser } from '@clerk/clerk-react';
import { ReactNode } from 'react';
import { Navigate, useLocation} from 'react-router';

interface ProtectedRouteProps {
  children: ReactNode;
}
const ProtectedRoute = ({children}: ProtectedRouteProps) => {

  const {isSignedIn,user,isLoaded} = useUser()
  const {pathname} = useLocation()

  if(isLoaded && !isSignedIn){
    return <Navigate to='/?sign-in=ture' />
  }
  
  return <>{children}</>
}

export default ProtectedRoute;
