import { useContext } from "react";
import { UserContext } from "./UserProvider";
import { UserContextValue } from "./contextType";

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
