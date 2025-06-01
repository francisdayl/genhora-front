import './index.css';
import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from './pages/NotFoundPage.tsx';
import LoginPage from './pages/auth/LoginPage.tsx';
import ProtectedRoute from './pages/ProtectedPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />,
      errorElement: <NotFound />,
    },
    {
      path: '/',
      element: <ProtectedRoute />,
      errorElement: <NotFound />,
      children: [
        {
          path: '/',
          element: <DashboardPage />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
