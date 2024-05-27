import { auth } from '../auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
