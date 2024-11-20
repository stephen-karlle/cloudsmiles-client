import { Outlet } from 'react-router-dom';
import { useRole } from '@services/state/useRole';
import RestrictedPage from './RestrictedPage';

const PrivatePages = () => {
  const { data: role, isLoading, isPending, isFetching, isRefetching } = useRole();

  if (isLoading || isPending || isFetching || isRefetching) {
    return <main>Loading...</main>;
  }

  if (!role || role === 'guest') {
    return <RestrictedPage />;
  }

  return <Outlet />;
};

export default PrivatePages;
