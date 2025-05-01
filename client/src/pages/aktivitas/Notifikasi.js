import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifikasi = () => {
  const [notifikasi, setNotifikasi] = useState([]);

  const getJudul = (type) => {
    switch (type) {
      case "Peminjaman":
        return "Pengajuan Peminjaman";
      case "Pengembalian":
        return "Pengajuan Pengembalian";
      case "Perpanjangan":
        return "Pengajuan Perpanjangan";
      case "Permintaan":
        return "Pengajuan Permintaan";
      default:
        return "Notifikasi";
    }
  };

  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/notifikasi?role=Admin"
        );
        setNotifikasi(res.data);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    const sudahDibaca = async () => {
      try {
        await axios.put("http://localhost:5000api/notifikasi/read", {
          role: "Admin",
        });
      } catch (error) {
        console.error("Failed to get Notification:", error);
      }
    };

    sudahDibaca();
    fetchNotif();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Notifikasi</h3>

      {notifikasi.length === 0 ? (
        <p>Tidak Ada Notifikasi.</p>
      ) : (
        <ul className="list-group">
          {notifikasi.map((item) => (
            <li
              key={item._id}
              className="list-group-item d-flec justify-content-between"
            >
              <div>
                <strong>{getJudul(item.type)}</strong>
                <div className="text-muted">{item.message}</div>
              </div>
              <small>{new Date(item.createdAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifikasi;
