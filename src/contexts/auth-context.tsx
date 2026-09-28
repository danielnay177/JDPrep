import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  User,
  deleteUser,
  updateProfile,
} from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { auth } from '@/lib/firebase';

type AuthContextValue = {
  user: User | null;
  isReady: boolean;
  continueAsGuest: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  updateDisplayName: (displayName: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => onAuthStateChanged(auth, (nextUser) => {
    setUser(nextUser);
    setIsReady(true);
  }), []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isReady,
    continueAsGuest: async () => { await signInAnonymously(auth); },
    signIn: async (email, password) => { await signInWithEmailAndPassword(auth, email.trim(), password); },
    signUp: async (email, password) => { await createUserWithEmailAndPassword(auth, email.trim(), password); },
    logOut: async () => { await signOut(auth); },
    updateDisplayName: async (displayName) => {
      if (!auth.currentUser) throw new Error('No signed-in account');
      await updateProfile(auth.currentUser, { displayName: displayName.trim() });
      setUser(auth.currentUser);
    },
    deleteAccount: async () => {
      if (!auth.currentUser) throw new Error('No signed-in account');
      await deleteUser(auth.currentUser);
    },
  }), [user, isReady]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
