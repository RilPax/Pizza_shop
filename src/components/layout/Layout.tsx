import { Outlet } from "react-router-dom";
import { Footer, Header, ScrollManager, Toast } from "../index";

export const Layout = () => {
  return (
    <div className="layout">
      <ScrollManager />
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
};
