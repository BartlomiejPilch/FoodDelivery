// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

type User = { id:number; name:string; email_hash:string } | null;

type Ctx = {
  user: User;
  loading: boolean;
  login: (email:string, password:string)=>Promise<void>;
  logout: ()=>void;
  refreshMe: ()=>Promise<void>;
};

const AuthCtx = createContext<Ctx>({} as Ctx);
export const useAuth = () => useContext(AuthCtx);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const refreshMe = async () => {
    try { const u = await api.me(); setUser(u as any); } catch { setUser(null); }
  };

  useEffect(() => { (async()=>{ await refreshMe(); setLoading(false); })(); }, []);

  const login = async (email:string, password:string) => { await api.login(email, password); await refreshMe(); };
  const logout = () => { api.logout(); setUser(null); };

  return <AuthCtx.Provider value={{ user, loading, login, logout, refreshMe }}>{children}</AuthCtx.Provider>;
};
