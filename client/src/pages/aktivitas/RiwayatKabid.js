import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const RiwayatKabid = () => {
  const [user, setUser] = useState(null);
  const [pengajuan, setPengajuan] = useState([]);
  const [activeUnit, setActiveUnit] = useState("");

  const units = useMemo(() => ["PAUDIT", "SDIT", "SMPI", "SMAIT"], []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Failed to fetch user:", err));
    }
  }, []);

  useEffect(() => {
    if (user) {
      axios.get("http://localhost:5000/api/pengajuan").then((res) => {
        const filtered = res.data.filter((item) =>
          ["Diterima", "Ditolak", "Dikembalikan", "Disetujui"].includes(
            item.status
          )
        );
        setPengajuan(filtered);
      });
    }
  }, [user]);

  useEffect(() => {
    if (!activeUnit && units.length > 0) {
      setActiveUnit(units[0]);
    }
  }, [units, activeUnit]);

  const pengajuanByUnit = pengajuan.reduce((acc, item) => {
    const unit = item.kode_barang?.unit || item.user_id?.unit || "Lainnya";
    if (!acc[unit]) acc[unit] = [];
    acc[unit].push(item);
    return acc;
  }, {});

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Riwayat Persetujuan</h2>

      <ul className="nav nav-tabs mb-3">
        {units.map((unit) => (
          <li className="nav-item" key={unit}>
            <button
              className={`nav-link ${activeUnit === unit ? "active" : ""}`}
              onClick={() => setActiveUnit(unit)}
            >
              {unit}
            </button>
          </li>
        ))}
      </ul>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr className="text-center">
            <th>No</th>
            <th>Tanggal</th>
            <th>Nama Barang</th>
            <th>Jenis Transaksi</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pengajuanByUnit[activeUnit]?.map((item, index) => (
            <tr key={item._id} className="text-center align-middle">
              <td>{index + 1}</td>
              <td>{new Date(item.tgl_pengajuan).toLocaleDateString()}</td>
              <td>{item.kode_barang?.nama_barang || item.nama_barang}</td>
              <td className="text-capitalize">{item.jenis_pengajuan}</td>
              <td>
                <span
                  className={`badge ${
                    item.status === "Diterima" || item.status === "Disetujui"
                      ? "bg-success"
                      : item.status === "Dikembalikan"
                      ? "bg-primary"
                      : "bg-danger"
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}

          {!pengajuanByUnit[activeUnit]?.length && (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                Tidak ada riwayat untuk unit ini.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RiwayatKabid;
