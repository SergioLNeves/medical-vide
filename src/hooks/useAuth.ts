'use client';

import { useState, useEffect } from 'react';
import { User } from '@/mocks';
import { getCurrentUser, setCurrentUser, removeCurrentUser } from '@/lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);

    // Escutar evento customizado de atualização de usuário
    const handleUserUpdate = (event: CustomEvent) => {
      const updatedUser = event.detail;
      setUser(updatedUser);
    };

    window.addEventListener('userUpdated', handleUserUpdate as EventListener);

    return () => {
      window.removeEventListener(
        'userUpdated',
        handleUserUpdate as EventListener
      );
    };
  }, []);

  const login = (user: User) => {
    setCurrentUser(user);
    setUser(user);
  };

  const logout = () => {
    removeCurrentUser();
    setUser(null);
  };

  const refreshUser = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  };

  return {
    user,
    loading,
    login,
    logout,
    refreshUser,
    isAuthenticated: !!user,
  };
};
