import { Outlet, Navigate } from 'react-router-dom';
import PortalLayout from '../layouts/PortalLayout';
import { useAuthStore } from '@/store/authStore';

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const getToken = useAuthStore((state) => state.getToken);
  const saveUser = useAuthStore((state) => state.saveUser);

  const token = getToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (!isAuthenticated && token === null) {
    return <Navigate to="/login" replace />;
  } else if (!isAuthenticated && token) {
    saveUser({ accessToken: token });
  }

  return (
    <PortalLayout>
      <Outlet />
    </PortalLayout>
  );
}
