import React from "react";
import PrivateRoute from "../auth/PrivateRoute";
import SidebarKabid from "../sidebar/SidebarKabid";

const KabidLayout = ({ children }) => {
  return (
    <PrivateRoute allowedRoles={["kabid"]}>
      <div className="d-flex">
        <SidebarKabid />
        <main className="flex-grow-1 p-3" style={{ marginLeft: "250" }}>
          {children}
        </main>
      </div>
    </PrivateRoute>
  );
};

export default KabidLayout;
