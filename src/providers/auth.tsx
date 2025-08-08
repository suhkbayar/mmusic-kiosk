import React, { createContext, useCallback, useMemo, useState } from 'react';
import decode from 'jwt-decode';

export interface Payload {
  sub: string;
  iss: string;
  exp: number;
  aud: string[];
  branch: string;
  role: string;
  currency: string;
  languages: string[];
}

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
};

export const isValidToken = () => {
  const token = getAccessToken();
  if (!token) return false;
  try {
    const { exp }: Payload = decode(token);
    if (exp * 1000 < new Date().getTime()) return false;
    return true;
  } catch (e) {
    return false;
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    if (isValidToken()) return getAccessToken();
  }
  return 'rWuZw3y6B8DbGdJfNjQmSqVsXu2x4z7C9EbHeKgNkRnTqWtYv3';
};

export const setAccessToken = (token: string) => localStorage.setItem('token', token);

export const getPayload = (): Payload | null => {
  const token = getAccessToken();
  if (!token) return null;
  try {
    const payload: Payload = decode(token);
    return payload;
  } catch (e) {
    return null;
  }
};

interface AuthContextType {
  isAuthenticated: boolean;
  authenticate: (token: string, cb: Function) => void;
  signOut: () => void;
  qr: string;
  changeQr: (qr: string) => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setAuthenticated] = useState(isValidToken);
  const [qr, setQr] = useState('');

  const changeQr = useCallback((qr: string) => {
    setQr(qr);
    localStorage.setItem('qr', qr);
  }, []);

  const authenticate = useCallback((token: string, cb: Function) => {
    setAccessToken(token);
    setAuthenticated(true);
    if (cb) setTimeout(cb, 100);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  }, []);

  const defaultContext = useMemo<AuthContextType>(() => {
    return { isAuthenticated, authenticate, signOut, qr, changeQr };
  }, [isAuthenticated, authenticate, signOut, qr, changeQr]);

  return <AuthContext.Provider value={defaultContext}>{children}</AuthContext.Provider>;
};
