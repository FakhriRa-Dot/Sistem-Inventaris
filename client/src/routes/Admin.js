import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import HomeAdmin from "../pages/dashboard/HomeAdmin";
import DataInventaris from "../pages/inventaris/DataInventaris";
import LaporanInventaris from "../pages/inventaris/LaporanInventaris";
import DataPengguna from "../pages/pengguna/DataPengguna";
import KelolaPengguna from "../pages/pengguna/KelolaPengguna";
import KelolaInventaris from "../pages/inventaris/KelolaInventaris";
import LoginActivity from "../pages/pengguna/LoginActivty";

const Admin = () => {
  return (
    <Routes>
      <Route
        path="/Home"
        element={
          <AdminLayout>
            <HomeAdmin />
          </AdminLayout>
        }
      />
      <Route
        path="/Data-Inventaris"
        element={
          <AdminLayout>
            <DataInventaris />
          </AdminLayout>
        }
      />
      <Route
        path="/Laporan-Inventaris"
        element={
          <AdminLayout>
            <LaporanInventaris />
          </AdminLayout>
        }
      />
      <Route
        path="/Kelola-Inventaris"
        element={
          <AdminLayout>
            <KelolaInventaris />
          </AdminLayout>
        }
      />
      <Route
        path="/Data-Pengguna"
        element={
          <AdminLayout>
            <DataPengguna />
          </AdminLayout>
        }
      />
      <Route
        path="/Kelola-Pengguna"
        element={
          <AdminLayout>
            <KelolaPengguna />
          </AdminLayout>
        }
      />
      <Route
        path="/Login-Activity"
        element={
          <AdminLayout>
            <LoginActivity />
          </AdminLayout>
        }
      />
    </Routes>
  );
};

export default Admin;
