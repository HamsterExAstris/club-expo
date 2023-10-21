import React, { ReactNode } from 'react';
import Repository from './jnovel-club-api/Repository';
import { useStorageState } from './useStorageState';

const AuthContext = React.createContext<{ signIn: (username: string, password: string) => Promise<void>; signOut: () => void; session?: string | null, isLoading: boolean } | null>(null);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: {children: ReactNode}) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (username: string, password: string) => {
          const token = await Repository.login(username, password);
          setSession(token);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
