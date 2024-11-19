import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { serverurl } from "../config";
import Loading from "../pages/Loading";
import axiosInstance from "../config/axiosInstance";

interface User {
  _id: string;
  fullName?: string;
  email: string;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, redirectTo?: string) => void;
  verifyEmail: (email: string, otp: number) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authloading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get(`${serverurl}/auth/user`);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      setUser(null);
      toast.error("Failed to fetch user details.");
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      const cachedUser = localStorage.getItem("user");

      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
        setAuthLoading(false);
      } else {
        fetchUserDetails();
      }
    } else {
      setAuthLoading(false);
    }
  }, []);

  const verifyEmail = async (email: string, otp: number) => {
    try {
      const response = await axios.post(`${serverurl}/auth/verify-email`, {
        email,
        otp,
      });
      const { token, user: userData } = response.data;
      setUser(userData);
      localStorage.setItem("access_token", token.accessToken);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Email verified successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error verifying email");
    }
  };

  const login = async (
    email: string,
    password: string,
    redirectTo?: string
  ) => {
    try {
      const response = await axios.post(`${serverurl}/auth/login`, {
        email,
        password,
      });
      const { token, user: userData } = response.data;
      setUser(userData);
      localStorage.setItem("access_token", token.accessToken);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Logged in successfully");
      navigate(redirectTo || "/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error logging in");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("favorites");
    toast.success("Logged out successfully");
    navigate("/signinsignup");
  };

  if (authloading) {
    return <Loading />;
  }

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        verifyEmail,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
}
