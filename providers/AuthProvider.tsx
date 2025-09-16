'use client';
import { useLocalObservable } from 'mobx-react-lite';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface AuthStore {
  id: string;
  name: string;
}

const AuthStoreContext = createContext<AuthStore | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const authStore = useLocalObservable<AuthStore>(() => ({
    id: '1',
    name: '김사주',
  }));
  return <AuthStoreContext value={authStore}>{children}</AuthStoreContext>;
}

export const useAuth = () => {
  const authStore = useContext(AuthStoreContext);
  const hasNoContext = authStore === null;
  if (hasNoContext) throw new Error('AuthContext 내부에서 사용해주세요.');
  return authStore;
};
