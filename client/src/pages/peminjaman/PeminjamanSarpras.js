import React, { useEffect, useState } from "react";
import axios from "axios";

const PeminjamanSarpras = () => {
  const [barang, setBarang] = useState([]);
  const [form, setForm] = useState({
    kode_barang: "",
    jumlah_barang: "",
    batas_kembali: "",
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(localStorage.getItem("token"));

    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/inventaris")
      .then((res) => {
        const barangTersedia = res.data.map((item) => ({
          ...item,
          tersedia: item.jumlah - (item.jumlah_dipinjam || 0),
        }));
        setBarang(barangTersedia);
      })
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedItem = barang.find((b) => b._id === form.kode_barang);
    if (!selectedItem) {
      alert("Not found");
      return;
    }

    if (parseInt(form.jumlah_barang) > selectedItem.jumlah_barang) {
      alert("Item quantity exceeds available stock");
      return;
    }

    const dataPeminjaman = {
      user_id: user._id,
      kode_barang: form.kode_barang,
      jumlah_barang: parseInt(form.jumlah_barang),
      jenis_pengajuan: "Peminjaman",
      tgl_pengajuan: new Date(),
      batas_kembali: form.batas_kembali,
      status: "Proses",
    };

    try {
      await axios.post("http://localhost:5000/api/pengajuan", dataPeminjaman, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("successfully submitted the request");
      setForm({
        kode_barang: "",
        jumlah_barang: "",
        batas_kembali: "",
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit the request");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="card-title text-center mb-4">
          Formulir Peminjaman Barang
        </h2>

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
          <p>Loading user data...</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="kode_barang" className="form-label">
              Pilih Barang
            </label>
            <select
              id="kode_barang"
              className="form-select"
              value={form.kode_barang}
              onChange={(e) =>
                setForm({ ...form, kode_barang: e.target.value })
              }
              required
            >
              <option value="">-- Pilih Barang --</option>
              {barang.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.nama_barang} (tersedia: {item.tersedia})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="jumlah_barang" className="form-label">
              Jumlah yang Dipinjam
            </label>
            <input
              type="number"
              id="jumlah_barang"
              className="form-control"
              min="1"
              value={form.jumlah_barang}
              onChange={(e) =>
                setForm({ ...form, jumlah_barang: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="batas_kembali" className="form-label">
              Tanggal Pengembalian
            </label>
            <input
              type="date"
              id="batas_kembali"
              className="form-control"
              min={new Date().toISOString().split("T")[0]}
              value={form.batas_kembali}
              onChange={(e) =>
                setForm({ ...form, batas_kembali: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Kirim Pengajuan
          </button>
        </form>
      </div>
    </div>
  );
};
export default PeminjamanSarpras;
