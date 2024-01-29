import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useState } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../services";
import { OfflineControlContext } from "./OfflineControlContext";
import { GlobalContext } from "./GlobalContext";

const AuthContext = createContext({
  user: null,
  token: null,
  loged: false,
  handleLogout: () => {},
  isValidatingAuth: false,
});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loged, setLoged] = useState(false);
  const { connection } = useContext(OfflineControlContext);
  const { validateToken } = useAuth();
  const { loading } = useContext(GlobalContext);

  const handleLogout = useCallback(async () => {
    await AsyncStorage.clear();
    setLoged(false);
    setUser(null);
    setToken(null);
  }, []);

  useQuery(
    "validate-token",
    () => {
      loading({ isLoading: true });
      return validateToken();
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: async (response) => {
        if (!response.valid) {
          setLoged(false);
        }
      },
      onError: () => {
        if (connection?.isInternetReachable) {
          setLoged(false);
          loading({ isLoading: false });
        }
      },
      onSettled: async (response) => {
        const user = await AsyncStorage.getItem("@user");
        const token = await AsyncStorage.getItem("@token");

        if (!connection?.isInternetReachable && token || response?.valid) {
          setUser(JSON.parse(user));
          setToken(JSON.parse(token));
          setLoged(true);
        }

        loading({
          isLoading: false,
        });
      },
    }
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        loged,
        setLoged,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
