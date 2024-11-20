import { Outlet } from 'react-router-dom';
import { useRole } from '@services/state/useRole';
import RestrictedPage from './RestrictedPage';

type ProtectedRouteType = {
  role: string;
};

const ProtectedRoute = ({ role }: ProtectedRouteType) => {
  const { data: userRole, isLoading, isFetching, isRefetching, isPending } = useRole();

  if (isLoading || isPending || isFetching || isRefetching) {
    return <div>Loading...</div>;
  }

  if (userRole !== role) {
    return <RestrictedPage />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
