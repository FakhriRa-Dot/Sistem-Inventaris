import React from "react";
import { Routes, Route } from "react-router-dom";

import SarprasLayout from "../layouts/SarprasLayout";
import HomeSarpras from "../pages/dashboard/HomeSarpras";
import DataInventaris from "../pages/inventaris/DataInventaris";
import StatusSarpras from "../pages/aktivitas/StatusSarpras";
import RiwayatSarpras from "../pages/aktivitas/RiwayatSarpras";
import LaporanInventaris from "../pages/inventaris/LaporanInventaris";
import PeminjamanSarpras from "../pages/peminjaman/PeminjamanSarpras";
import PermintaanSarpras from "../pages/permintaan/PermintaanSarpras";
import PengembalianSarpras from "../pages/pengembalian/PengembalianSarpras";

const Sarpras = () => {
  return (
    <Routes>
      <Route
        path="/Home"
        element={
          <SarprasLayout>
            <HomeSarpras />
          </SarprasLayout>
        }
      />
      <Route
        path="/Data-Inventaris"
        element={
          <SarprasLayout>
            <DataInventaris />
          </SarprasLayout>
        }
      />
      <Route
        path="/Status-Inventaris"
        element={
          <SarprasLayout>
            <StatusSarpras />
          </SarprasLayout>
        }
      />
      <Route
        path="/Riwayat-Inventaris"
        element={
          <SarprasLayout>
            <RiwayatSarpras />
          </SarprasLayout>
        }
      />
      <Route
        path="/Laporan-Inventaris"
        element={
          <SarprasLayout>
            <LaporanInventaris />
          </SarprasLayout>
        }
      />
      <Route
        path="/Peminjaman"
        element={
          <SarprasLayout>
            <PeminjamanSarpras />
          </SarprasLayout>
        }
      />
      <Route
        path="/Permintaan"
        element={
          <SarprasLayout>
            <PermintaanSarpras />
          </SarprasLayout>
        }
      />
      <Route
        path="/Pengembalian"
        element={
          <SarprasLayout>
            <PengembalianSarpras />
          </SarprasLayout>
        }
      />
    </Routes>
  );
};

export default Sarpras;
