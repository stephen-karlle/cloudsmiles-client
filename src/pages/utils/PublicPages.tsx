import { useRole } from '@services/state/useRole';
import { Outlet } from 'react-router-dom';
import RestrictedPage from './RestrictedPage';

const PublicPages = () => {
  const { data: role, isLoading, isFetching, isPending } = useRole();

  if (isLoading || isFetching || isPending ) {
    return <div>Loading...</div>;
  }

  if (role === "patient" || role === "admin" || role === "assistant" || role === "dentist") {
    return <RestrictedPage />;
  }

  return <Outlet />;
};

export default PublicPages;
