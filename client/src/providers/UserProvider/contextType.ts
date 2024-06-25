import { User } from ".";

export interface UserContextValue {
  user: User | null;
  loading: boolean;
  getUser: (userName: string) => Promise<void>;
  addPointToUser: () => Promise<void>;
}
