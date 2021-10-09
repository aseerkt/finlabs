import { User } from '@/models/User';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  loading: boolean;
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const AuthContext = createContext<AuthContextType>(null as any);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/users')
      .then((res) => {
        setUser(res?.data?.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ loading, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
