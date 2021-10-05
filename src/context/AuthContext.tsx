import { User } from '@/models/User';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const AuthContext = createContext<AuthContextType>(null as any);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    axios
      .get('/users')
      .then((res) => setUser(res?.data?.user))
      .catch((err) => console.error(err));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
