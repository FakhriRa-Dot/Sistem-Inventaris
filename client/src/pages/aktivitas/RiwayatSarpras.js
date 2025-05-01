import React, { useState, useEffect } from "react";
import axios from "axios";

const RiwayatSarpras = () => {
  const [user, setUser] = useState(null);
  const [pengajuan, setPengajuan] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.error("Failed to fetch data:", err));
    }
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:5000/api/pengajuan")
        .then((res) => {
          const filtered = res.data.filter((item) => {
            return (
              item.user_id._id === user._id &&
              ["Diterima", "Ditolak", "Dikembalikan", "Disetujui"].includes(
                item.status
              )
            );
          });
          setPengajuan(filtered);
        })
        .catch((err) => console.error("Failed to fetch data:", err));
    }
  }, [user]);

  return (
    <div className="containter mt-5">
      <h2 className="mb-4">Riwayat Transaksi</h2>
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
          {pengajuan.map((item, index) => (
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

          {pengajuan.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                Belum ada riwayat transaksi.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RiwayatSarpras;
