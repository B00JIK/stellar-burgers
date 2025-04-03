import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState, useSelector } from '../../services/store';
import { TUser } from '@utils-types';

type TProtectedRouteProps = {
  notAuthorized: boolean;
};

export const ProtectedRoute = ({ notAuthorized }: TProtectedRouteProps) => {
  const location = useLocation();
  const user = useSelector((store) => store.user.user) as TUser;
  const from = location.state?.from || '/';

  if (notAuthorized && user) {
    return <Navigate to={from} />;
  }

  if (!notAuthorized && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return <Outlet />;
};
