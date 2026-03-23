import {createContext, useContext, useEffect, useState} from 'react';
import {authService} from '../services/authService';

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // check token lúc app mở

  // Khi app khởi động → check token cũ còn không
  useEffect(() => {
    authService
      .getToken()
      .then(t => setToken(t))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    setToken(data.token);
  };

  const logout = async () => {
    await authService.logout();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{token, isLoading, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
