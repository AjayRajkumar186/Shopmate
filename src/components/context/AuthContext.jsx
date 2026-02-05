import { createContext, useContext, useState } from "react";
import usersData from "../../data/data.json";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // 🔹 get users from localStorage OR fallback to json
  const getUsers = () => {
    const stored = localStorage.getItem("users");
    return stored ? JSON.parse(stored) : usersData.users;
  };

  const login = ({ email, password }) => {
    const admin = usersData.admins.find(
      (a) => a.email === email && a.password === password
    );

    if (admin) {
      const adminUser = { ...admin, role: "admin" };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      return adminUser;
    }

    const users = getUsers();

    const normalUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (normalUser) {
      const userWithRole = { ...normalUser, role: "user" };
      setUser(userWithRole);
      localStorage.setItem("user", JSON.stringify(userWithRole));
      return userWithRole;
    }

    return null;
  };

  // ✅ SIGNUP FUNCTION
  const signup = (newUser) => {
    const users = getUsers();

    const exists = users.some((u) => u.email === newUser.email);
    if (exists) return false;

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
