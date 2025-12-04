// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import NavbarPage from "../../pages/NavbarPage";
import SidebarPage from "../../pages/SidebarPage";
import "./Layout.css";

const Layout = () => {
  return (
    <>
      <aside className="app-sidebar">
        <SidebarPage />
      </aside>

      <header className="app-navbar">
        <NavbarPage />
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
