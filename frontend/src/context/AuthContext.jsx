import React, { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("propliq_user")) ?? null; }
    catch { return null; }
  });

  const signUp = useCallback(({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("propliq_users") ?? "[]");
    if (users.find(u => u.email === email)) return { ok: false, error: "Email already registered." };
    const newUser = { id: crypto.randomUUID(), name, email, password };
    localStorage.setItem("propliq_users", JSON.stringify([...users, newUser]));
    const session = { id: newUser.id, name: newUser.name, email: newUser.email };
    localStorage.setItem("propliq_user", JSON.stringify(session));
    setUser(session);
    return { ok: true };
  }, []);

  const signIn = useCallback(({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("propliq_users") ?? "[]");
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { ok: false, error: "Invalid email or password." };
    const session = { id: found.id, name: found.name, email: found.email };
    localStorage.setItem("propliq_user", JSON.stringify(session));
    setUser(session);
    return { ok: true };
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("propliq_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
