import React, { useEffect, useState } from "react";
import axios from "axios";

const PermintaanSarpras = () => {
  const [form, setForm] = useState({
    nama_barang: "",
    jumlah_barang: "",
    alasan: "",
  });
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
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataPermintaan = {
      user_id: user._id,
      nama_barang: form.nama_barang,
      jumlah_barang: form.jumlah_barang,
      alasan: form.alasan,
      jenis_pengajuan: "Permintaan",
      tgl_pengajuan: new Date(),
      status: "Proses",
    };

    try {
      await axios.post("http://localhost:5000/api/pengajuan", dataPermintaan, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Successfully submitted request!");
      setForm({
        nama_barang: "",
        jumlah_barang: "",
        alasan: "",
      });
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="card-title mb-4">Formulir Permintaan Barang</h2>

        {user ? (
          <div className="mb-4">
            <p>
              <strong>Nama:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ) : (
          <p>Memuat data pengguna...</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nama Barang</label>
            <input
              type="text"
              className="form-control"
              value={form.nama_barang}
              onChange={(e) =>
                setForm({ ...form, nama_barang: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Jumlah</label>
            <input
              type="number"
              min="1"
              className="form-control"
              value={form.jumlah_barang}
              onChange={(e) =>
                setForm({ ...form, jumlah_barang: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Keperluan / Alasan</label>
            <textarea
              className="form-control"
              rows="3"
              value={form.alasan}
              onChange={(e) => setForm({ ...form, alasan: e.target.value })}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Kirim Permintaan
          </button>
        </form>
      </div>
    </div>
  );
};

export default PermintaanSarpras;
