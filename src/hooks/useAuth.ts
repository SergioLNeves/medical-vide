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
    }, []);

    const login = (user: User) => {
        setCurrentUser(user);
        setUser(user);
    };

    const logout = () => {
        removeCurrentUser();
        setUser(null);
    };

    return {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
    };
};
