'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { LoginPayload, login as loginService } from '@/services/auth/authService';
import { User } from '@/data/users';

export type AuthUser = Omit<User, 'password'>;

interface AuthContextValue {
  user: AuthUser | null;
  login: (payload: LoginPayload) => AuthUser;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser) as AuthUser);
    }
  }, []);

  const login = (payload: LoginPayload): AuthUser => {
    const user = loginService(payload); // sync
    const authUser: AuthUser = {
      userId: user.userId,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
    };

    setUser(authUser);
    localStorage.setItem('auth_user', JSON.stringify(authUser));
    return authUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth phải nằm trong AuthProvider');
  }
  return ctx;
}
