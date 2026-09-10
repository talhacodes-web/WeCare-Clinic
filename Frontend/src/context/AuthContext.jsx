/**
 * AuthContext — Global authentication state
 *
 * Strategy:
 *  - On mount: attempt a silent token refresh (httpOnly cookie) to restore session
 *    without asking the user to log in again after a page reload.
 *  - Access token lives in the tokenStore (module memory in api.js).
 *  - User profile (non-sensitive) is persisted to localStorage for instant
 *    UI hydration (avatar, name) before the /me response arrives.
 *  - On logout: token cleared from memory + cookie cleared server-side.
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authAPI, tokenStore } from '../services/api.js';

const AuthContext = createContext(undefined);

const USER_STORAGE_KEY = 'wecare_user_profile';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function loadPersistedUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistUser(user) {
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }) => {
  // Hydrate from localStorage immediately for fast UI — refreshed async below
  const [user, setUser] = useState(loadPersistedUser);
  const [isLoading, setIsLoading] = useState(true);

  // ── Silent session restore on page load ──────────────────────────────────
  useEffect(() => {
    const restoreSession = async () => {
      try {
        // Try to get a fresh access token using the httpOnly refresh token cookie.
        // This succeeds silently if the user was previously logged in.
        const refreshData = await authAPI.refreshToken();
        tokenStore.set(refreshData.accessToken);

        // Fetch the latest user profile with the new token
        const meData = await authAPI.getMe();
        setUser(meData.user);
        persistUser(meData.user);
      } catch {
        // No valid refresh token — user is logged out
        // Keep any stale localStorage user for display but mark as unauthenticated
        tokenStore.clear();
        setUser(null);
        persistUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  // ── Login ────────────────────────────────────────────────────────────────
  const login = useCallback(async (payload) => {
    setIsLoading(true);
    try {
      const data = await authAPI.login(payload);
      setUser(data.user);
      persistUser(data.user);
      return data;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Signup ───────────────────────────────────────────────────────────────
  const signup = useCallback(async (payload) => {
    setIsLoading(true);
    try {
      const data = await authAPI.signup(payload);
      setUser(data.user);
      persistUser(data.user);
      return data;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Logout ───────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authAPI.logout();
    } catch {
      // Even if the server call fails, clear client state
    } finally {
      tokenStore.clear();
      setUser(null);
      persistUser(null);
      setIsLoading(false);
    }
  }, []);

  // ── Refresh user profile (call after profile updates) ───────────────────
  const refreshUser = useCallback(async () => {
    try {
      const data = await authAPI.getMe();
      setUser(data.user);
      persistUser(data.user);
    } catch {
      // Token may have expired — handled automatically by apiFetch
    }
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user && !!tokenStore.get(),
    login,
    signup,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
