import React from "react";
import { Routes, Route } from "react-router-dom";

import KabidLayout from "../layouts/KabidLayout";
import HomeKabid from "../pages/dashboard/HomeKabid";
import DataInventaris from "../pages/inventaris/DataInventaris";
import RiwayatKabid from "../pages/aktivitas/RiwayatKabid";
import PeminjamanKabid from "../pages/peminjaman/PeminjamanKabid";
import PermintaanKabid from "../pages/permintaan/PermintaanKabid";
import PengembalianKabid from "../pages/pengembalian/PengembalianKabid";
import Notifikasi from "../pages/aktivitas/Notifikasi";

const Kabid = () => {
  return (
    <Routes>
      <Route
        path="/Home"
        element={
          <KabidLayout>
            <HomeKabid />
          </KabidLayout>
        }
      />
      <Route
        path="/Data-Inventaris"
        element={
          <KabidLayout>
            <DataInventaris />
          </KabidLayout>
        }
      />
      <Route
        path="/Riwayat-Aktivitas"
        element={
          <KabidLayout>
            <RiwayatKabid />
          </KabidLayout>
        }
      />
      <Route
        path="/Peminjaman"
        element={
          <KabidLayout>
            <PeminjamanKabid />
          </KabidLayout>
        }
      />
      <Route
        path="/Permintaan"
        element={
          <KabidLayout>
            <PermintaanKabid />
          </KabidLayout>
        }
      />
      <Route
        path="/Pengembalian-Perpanjangan"
        element={
          <KabidLayout>
            <PengembalianKabid />
          </KabidLayout>
        }
      />
      <Route
        path="/Notifikasi"
        element={
          <KabidLayout>
            <Notifikasi />
          </KabidLayout>
        }
      />
    </Routes>
  );
};

export default Kabid;
