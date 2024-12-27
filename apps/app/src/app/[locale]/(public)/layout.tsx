import React from "react";
import NavBar from "@/components/navbar";
import { UserProvider } from "@/store/user/provider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <UserProvider data={null}>
        <NavBar />
        <main>{children}</main>
      </UserProvider>
    </>
  );
};

export default Layout;
