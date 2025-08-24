'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import type { User } from '@/mocks';

export interface UserProfile extends User {
  isComplete: boolean;
}

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Considera o perfil sempre completo se tiver nome e email
      const isProfileComplete = !!(user.name && user.email);

      const userProfile: UserProfile = {
        ...user,
        isComplete: isProfileComplete,
      };

      setProfile(userProfile);
    } else {
      setProfile(null);
    }

    setLoading(false);
  }, [user]);

  const isProfileComplete = profile?.isComplete ?? false;

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    if (!profile) return;

    setLoading(true);
    try {
      // Simula uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser = { ...profile, ...updates };

      // Recalcula se o perfil está completo
      const isComplete = !!(updatedUser.name && updatedUser.email);

      setProfile({ ...updatedUser, isComplete });
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    isProfileComplete,
    updateProfile,
  };
}
