import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface PortalLayoutProps {
  children?: React.ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  async function handleSignOut(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    logout();
    navigate('/login');
  }

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span>
              Hola, <strong>{user?.email}</strong>
            </span>
          </div>
          <a
            data-testid="sign-out"
            href="#"
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 font-medium transition-colors text-white px-4 py-1 rounded"
          >
            Salir
          </a>
        </nav>
      </header>

      <main className="w-full">{children}</main>

      <hr></hr>
      <footer className="py-2 bg-gray-50 text-sm">
        <span>
          Hecho por: <strong>David Yanez</strong>
        </span>
      </footer>
    </>
  );
}
