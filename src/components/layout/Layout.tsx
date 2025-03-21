import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-6 overflow-auto">
        <Navbar />
        <br />
        <br />
        <Outlet />
      </div>
    </div>
  );
}
