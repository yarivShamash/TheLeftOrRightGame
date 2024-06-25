import { PropsWithChildren, createContext, useState } from "react";
import api from "../../axiosconfig";

import { User, UserContextValue } from "./";

export const UserContext = createContext<UserContextValue>({
  user: null,
  loading: false,
  getUser: async () => {},
  addPointToUser: async () => {},
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(false);

  const getUser = async (userName: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await api.post("/user", {
        name: userName,
      });

      if (response.status === 200) {
        setLoading(false);
        setUser(response.data.user as User);
      } else {
        setLoading(false);
        console.error("Error saving name:", response.statusText);
      }
    } catch (error) {
      setLoading(false);
      console.error("Network error:", error);
    }
  };

  const addPointToUser = async () => {
    if (!user) return;
    await api.post("/addOnePoint", { id: user.id });
  };

  return (
    <UserContext.Provider value={{ user, loading, getUser, addPointToUser }}>
      {children}
    </UserContext.Provider>
  );
};
