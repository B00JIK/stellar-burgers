import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState, useSelector } from '../../services/store';

type ProtectedRouteProps = {
  notAuthorized: boolean;
};

export const ProtectedRoute = ({ notAuthorized }: ProtectedRouteProps) => {
  const location = useLocation();
  const isInit = useSelector<RootState, boolean>((store) => store.user.isInit);
  const from = location.state?.from || '/';

  if (notAuthorized && isInit) {
    return <Navigate to={from} />;
  }

  if (!notAuthorized && !isInit) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  return <Outlet />;
};
