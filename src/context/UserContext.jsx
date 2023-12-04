"use client";

import React from "react";
import Cookies from "js-cookie";
import { jwtDecode as decode } from "jwt-decode";
import { AuthServices } from "@/services/modules/auth";
import { ClientsServices } from "@/services/modules/clients";
import { usePathname } from "next/navigation";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [userData, setUserData] = React.useState(null);
  const [UUID, setUUID] = React.useState(null);
  const [clients, setClients] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [showHeader, setShowHeader] = React.useState(true);
  const [showFooter, setShowFooter] = React.useState(true);
  const pathname = usePathname();

  async function logoutUser() {
    Cookies.remove("UUID");
    window.location.reload();
  }

  async function getAllClients() {
    const cookie = Cookies.get("UUID");
    try {
      setLoading(true);

      if (cookie) {
        const clients = await ClientsServices.getAll(cookie);
        setClients(clients);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const getUserData = React.useCallback(() => {
    const cookie = Cookies.get("UUID");
    if (cookie) {
      setUserData(decode(cookie));
      setUUID(cookie);
    }
  }, []);

  async function userLogin(username, password) {
    setLoading(true);
    try {
      const login = await AuthServices.login({ username, password });
      Cookies.set("UUID", login.token, { expires: 1 / 24 });
      window.location.reload();

      return { isLogged: true };
    } catch (error) {
      const { message } = error.response.data;
      setLoading(false);

      return { isLogged: false, message };
    }
  }

  React.useEffect(() => getUserData(), [getUserData]);

  React.useEffect(() => {
    if (userData) getAllClients();
  }, [userData]);

  React.useEffect(() => {
    const cookie = Cookies.get("UUID");
    if (pathname && pathname != "/login" && !cookie) window.location.reload();
  }, [pathname]);

  return (
    <UserContext.Provider
      value={{
        userData,
        loading,
        clients,
        UUID,
        logoutUser,
        userLogin,
        setLoading,
        setShowHeader,
        setShowFooter,
        getAllClients,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
