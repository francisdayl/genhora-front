import './index.css';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFoundPage.tsx';
import PostsPage from './pages/posts/PostsPage.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostDetailPage from './pages/posts/PostDetailPage.tsx';
import RegisterPage from './pages/auth/RegisterPage.tsx';
import LoginPage from './pages/auth/LoginPage.tsx';
import ProtectedRoute from './pages/ProtectedPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: '/register',
      element: <RegisterPage />,
      errorElement: <NotFound />,
    },
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
        {
          path: '/dashboard',
          element: <DashboardPage />,
        },
        {
          path: '/posts',
          element: <PostsPage />,
          errorElement: <NotFound />,
          children: [],
        },
        {
          path: '/posts/:id',
          element: <PostDetailPage />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
