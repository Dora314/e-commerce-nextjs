'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100',
    role: 'user' as const
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@elitestore.com',
    password: 'admin123',
    avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=100',
    role: 'admin' as const
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setState({
          user,
          isLoading: false,
          isAuthenticated: true
        });
      } catch (error) {
        localStorage.removeItem('user');
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false
        });
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setState({
        user: userWithoutPassword,
        isLoading: false,
        isAuthenticated: true
      });
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100',
      role: 'user' as const
    };

    mockUsers.push({ ...newUser, password });

    setState({
      user: newUser,
      isLoading: false,
      isAuthenticated: true
    });
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false
    });
    localStorage.removeItem('user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...data };
      setState(prev => ({ ...prev, user: updatedUser }));
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};