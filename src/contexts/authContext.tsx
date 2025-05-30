import { createContext, useEffect, useState } from 'react';
import { AuthResponse, UserData } from '../types/auth';
import { jwtDecode } from 'jwt-decode';

// Define the Auth Context interface with TypeScript
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserData | null;
  saveUser: (userData: AuthResponse) => void;
  getUser: () => UserData | null;
  logout: () => void;
  getToken: () => string | null;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  saveUser: (_userData: AuthResponse) => {},
  getUser: () => null,
  logout: () => {},
  getToken: () => null,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Get user directly from state
  function getUser(): UserData | null {
    return user;
  }

  // Get token from localStorage
  function getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Validate token function - checks if token exists and is not expired
  // function isTokenValid(token: string): boolean {
  //   try {
  //     const decoded = jwtDecode<UserData & { exp: number }>(token);
  //     const currentTime = Date.now() / 1000;

  //     // Check if token is expired
  //     return decoded.exp > currentTime;
  //   } catch {
  //     return false;
  //   }
  // }

  // Save user data and token
  function saveUser(data: AuthResponse) {
    if (!data.accessToken) return;
    try {
      const userInfo = jwtDecode<UserData>(data.accessToken);
      setUser(userInfo);
      setIsAuthenticated(true);
      localStorage.setItem('auth_token', data.accessToken);
    } catch (error) {
      console.error('Failed to parse token:', error);
      logout();
    }
  }

  // Logout function
  function logout() {
    localStorage.removeItem('auth_token');
    setUser(null);
    setIsAuthenticated(false);
  }

  // Check authentication status
  const checkAuth = () => {
    setIsLoading(true);
    try {
      const accessToken = getToken();
      if (accessToken) {
        const userInfo = jwtDecode<UserData>(accessToken);
        setUser(userInfo);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  // Run authentication check on mount and when token changes
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        getUser,
        saveUser,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
