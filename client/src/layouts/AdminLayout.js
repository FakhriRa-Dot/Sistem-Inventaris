import React from "react";
import SidebarAdmin from "../sidebar/SidebarAdmin";
import PrivateRoute from "../auth/PrivateRoute";

const AdminLayout = ({ children }) => {
  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div className="d-flex">
        <SidebarAdmin />
        <main className="flex-grow-1 p-3" style={{ marginLeft: "250px" }}>
          {children}
        </main>
      </div>
    </PrivateRoute>
  );
};

export default AdminLayout;
