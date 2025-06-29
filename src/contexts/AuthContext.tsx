import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    username: 'john.doe',
    email: 'john.doe@company.com',
    fullName: 'John Doe',
    role: 'requestor',
    department: 'Engineering',
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    username: 'jane.smith',
    email: 'jane.smith@company.com',
    fullName: 'Jane Smith',
    role: 'approver',
    department: 'Engineering',
    isActive: true,
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    username: 'mike.wilson',
    email: 'mike.wilson@company.com',
    fullName: 'Mike Wilson',
    role: 'accounts',
    department: 'Finance',
    isActive: true,
    createdAt: '2024-01-05'
  },
  {
    id: '4',
    username: 'admin',
    email: 'admin@company.com',
    fullName: 'System Administrator',
    role: 'admin',
    department: 'IT',
    isActive: true,
    createdAt: '2024-01-01'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock authentication - any password works for demo
    const foundUser = mockUsers.find(u => u.username === username);
    
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};