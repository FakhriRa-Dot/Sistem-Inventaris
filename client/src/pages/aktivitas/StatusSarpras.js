import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";

const StatusSarpras = () => {
  const [key, setKey] = useState("Peminjaman");
  const [pengajuan, setPengajuan] = useState([]);
  const [user, setUser] = useState(null);

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
          const dataUser = res.data.filter((item) => item.user_id === user._id);
          setPengajuan(dataUser);
        })
        .catch((err) => console.error("Failed to fetch data:", err));
    }
  }, [user]);

  const renderTabel = (jenis) => {
    const filtered = pengajuan.filter(
      (p) => p.jenis_pengajuan === jenis && p.status !== "Diterima"
    );

    return (
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Barang</th>
            <th>Tanggal</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                {item.kode_barang
                  ? item.kode_barang.nama_barang
                  : item.nama_barang}
              </td>
              <td>{new Date(item.tgl_pengajuan).toLocaleDateString()}</td>
              <td>
                <span
                  className={`badge ${
                    item.status === "Diterima"
                      ? "bg-success"
                      : item.status === "Ditolak"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Status Transaksi</h2>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="Peminjaman" title="Peminjaman">
          {renderTabel("Peminjaman")}
        </Tab>
        <Tab eventKey="Permintaan" title="Permintaan">
          {renderTabel("Permintaan")}
        </Tab>
        <Tab eventKey="Pengembalian" title="Pengembalian">
          {renderTabel("Pengembalian")}
        </Tab>
        <Tab eventKey="Perpanjangan" title="Perpanjangan">
          {renderTabel("Perpanjangan")}
        </Tab>
      </Tabs>
    </div>
  );
};

export default StatusSarpras;
