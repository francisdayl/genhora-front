import { Outlet, Navigate } from 'react-router-dom';
import PortalLayout from '../layouts/PortalLayout';
import { useAuthStore } from '@/store/authStore';

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PortalLayout>
      <Outlet />
    </PortalLayout>
  );
}
