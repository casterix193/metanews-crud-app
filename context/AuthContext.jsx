import { createContext, useContext } from "react";

const AuthContext = createContext({
  user: null,
  token: null,
});

export const useAuthContext = () => useContext(AuthContext);
