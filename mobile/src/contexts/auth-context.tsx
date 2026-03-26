import {createContext, useContext, useEffect, useState} from 'react';
import {authService} from '../services/authService';
import {User} from '../models/user';

interface AuthContextType {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [token, setToken] = useState<string | null>(null);

  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  /**
   * Init auth state
   */
  useEffect(() => {
    const initAuth = async () => {
      try {
        const [storedToken, storedUser] = await Promise.all([
          authService.getToken(),
          authService.getUser(),
        ]);

        setToken(storedToken);
        setUser(storedUser as User | null);
      } catch (error) {
        console.log('Auth init error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Login
   */
  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);

    setToken(data.token);
    setUser(data.user);
  };

  /**
   * Logout
   */
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.log('Logout API failed');
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoading,

        isAuthenticated: !!token,

        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
