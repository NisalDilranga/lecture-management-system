import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/adminSection/DashBoard/SideBar";

const AdminLayout = () => {
  return (
    <div className="flex bg-indigo-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
