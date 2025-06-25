import React, { createContext, useContext, useState, ReactNode } from "react";

// Type definitions
interface User {
  email: string;
  password: string;
  gender: "male" | "female" | "other";
  registeredAt: Date;
}

interface LoginContextType {
  users: User[];
  currentUser: User | null;
  isLoggedIn: boolean;
  registerUser: (
    email: string,
    password: string,
    gender: "male" | "female" | "other"
  ) => boolean;
  loginUser: (email: string, password: string) => boolean;
  logoutUser: () => void;
  isEmailTaken: (email: string) => boolean;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const registerUser = (
    email: string,
    password: string,
    gender: "male" | "female" | "other"
  ): boolean => {
    // Check if email already exists
    if (
      users.some((user) => user.email.toLowerCase() === email.toLowerCase())
    ) {
      return false; // Email already taken
    }

    const newUser: User = {
      email: email.toLowerCase(),
      password,
      gender,
      registeredAt: new Date(),
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    return true; // Registration successful
  };

  const loginUser = (email: string, password: string): boolean => {
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const isEmailTaken = (email: string): boolean => {
    return users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  };

  const value: LoginContextType = {
    users,
    currentUser,
    isLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    isEmailTaken,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export default LoginContext;
