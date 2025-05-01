import React from "react";
import PrivateRoute from "../auth/PrivateRoute";
import SidebarSarpras from "../sidebar/SidebarSarpras";

const SarprasLayout = ({ children }) => {
  return (
    <PrivateRoute allowedRoles={["sarpras"]}>
      <div className="d-flex">
        <SidebarSarpras />
        <main className="flex-grow-1 p-3" style={{ marginLeft: "250px" }}>
          {children}
        </main>
      </div>
    </PrivateRoute>
  );
};

export default SarprasLayout;
