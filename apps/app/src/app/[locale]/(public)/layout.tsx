import React from "react";
import NavBar from "@/components/navbar";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
