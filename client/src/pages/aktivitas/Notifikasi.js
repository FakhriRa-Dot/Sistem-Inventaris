import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Notifikasi = () => {
  const [notifikasi, setNotifikasi] = useState([]);

  const user = useState(() => {
    const storedUser = localStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const fetchNotifikasi = useCallback(async () => {
    if (!user || !user._id) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/notifikasi/user/${user._id}`
      );
      setNotifikasi(res.data);
    } catch (err) {
      console.error("Gagal memuat notifikasi", err);
    }
  }, [user]);

  useEffect(() => {
    fetchNotifikasi();
  }, [fetchNotifikasi]);

  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifikasi/read/${id}`);
      fetchNotifikasi();
    } catch (err) {
      console.error("Gagal menandai sebagai dibaca", err);
    }
  };

  if (!user) return <p>Memuat data pengguna...</p>;

  return (
    <div>
      <h2>Notifikasi</h2>
      <ul>
        {notifikasi.map((notif) => (
          <li
            key={notif._id}
            style={{
              backgroundColor: notif.read ? "#f0f0f0" : "#d9f4ff",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <p>{notif.message}</p>
            <small>{new Date(notif.createdAt).toLocaleString()}</small>
            {!notif.read && (
              <div style={{ marginTop: "5px" }}>
                <button onClick={() => handleMarkAsRead(notif._id)}>
                  Tandai sudah dibaca
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifikasi;
