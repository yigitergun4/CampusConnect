import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  if (!context) {
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

  // Load users & session from AsyncStorage
  useEffect(() => {
    const loadFromStorage = async () => {
      try {
        const usersData = await AsyncStorage.getItem("users");
        const userData = await AsyncStorage.getItem("user");

        if (usersData) {
          const parsedUsers = JSON.parse(usersData);
          setUsers(parsedUsers);
        }

        if (userData) {
          const parsedUser = JSON.parse(userData);
          setCurrentUser(parsedUser);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Failed to load from storage", err);
      }
    };

    loadFromStorage();
  }, []);

  const saveUsersToStorage = async (userList: User[]) => {
    await AsyncStorage.setItem("users", JSON.stringify(userList));
  };

  const registerUser = (
    email: string,
    password: string,
    gender: "male" | "female" | "other"
  ): boolean => {
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return false;
    }

    const newUser: User = {
      email: email.toLowerCase(),
      password,
      gender,
      registeredAt: new Date(),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);

    setCurrentUser(newUser);
    setIsLoggedIn(true);
    AsyncStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const loginUser = (email: string, password: string): boolean => {
    const matchedUser = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (matchedUser) {
      setCurrentUser(matchedUser);
      setIsLoggedIn(true);
      AsyncStorage.setItem("user", JSON.stringify(matchedUser));
      return true;
    }

    return false;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    AsyncStorage.removeItem("user");
  };

  const isEmailTaken = (email: string): boolean => {
    return users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
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
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
