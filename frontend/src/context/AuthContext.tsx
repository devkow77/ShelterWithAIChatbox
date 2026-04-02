import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type User = {
  fullName: string;
  email: string;
  role: "USER" | "WORKER" | "ADMIN";
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // sprawdzamy zalogowanego usera przy starcie
  useEffect(() => {
    const handleCheckAuth = async () => {
      try {
        const res = await axios.get("/api/auth/info", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    handleCheckAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
