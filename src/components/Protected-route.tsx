import { useUser } from '@clerk/clerk-react';
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const {isSignedIn, user, isLoaded} = useUser();
  const {pathname} = useLocation();

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.unsafeMetadata?.role) {
      const role = user.unsafeMetadata.role;
      if (pathname === '/') {
        window.location.href = role === 'candidate' ? '/jobs' : '/post-job';
      }
    }
  }, [isLoaded, isSignedIn, user, pathname]);

  if(isLoaded && !isSignedIn){
    return <Navigate to='/?sign-in=true' />
  }
  
  return <>{children}</>;
}

export default ProtectedRoute;
