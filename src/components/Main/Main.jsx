"use client";

import React from "react";
import Header from "@/components/Header/Header";
import SideMenu from "@/components/SideMenu/SideMenu";
import Loader from "@/components/Loader/Loader";
import { usePathname } from "next/navigation";
import { UserStorage } from "@/context/UserContext";

const Main = ({ children }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (pathname)
    return (
      <UserStorage>
        {!isLoginPage && (
          <>
            <Header />
          </>
        )}
        <main className={!isLoginPage ? "main" : ""}>{children}</main>
        <Loader />
      </UserStorage>
    );
};

export default Main;
