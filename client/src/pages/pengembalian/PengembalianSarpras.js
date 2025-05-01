import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Modal, Spinner, Button } from "react-bootstrap";

const PengembalianSarpras = () => {
  const [user, setUser] = useState(null);
  const [peminjaman, setPeminjaman] = useState([]);
  const [pengajuanSedangDiproses, setPengajuanSedangDiproses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tanggalBaru, setTanggalBaru] = useState("");
  const [prosess, setProsess] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Failed to fetch user data:", err));
    }
  }, []);

  const fetchPeminjaman = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pengajuan");
      const AllPengajuan = res.data;

      const dataPeminjamanAktif = AllPengajuan.filter(
        (item) =>
          item.user_id._id === user._id &&
          item.jenis_pengajuan === "Peminjaman" &&
          item.status === "Diterima"
      );

      const pengajuanLain = AllPengajuan.filter(
        (item) =>
          item.user_id._id === user._id &&
          (item.jenis_pengajuan === "Pengembalian" ||
            item.jenis_pengajuan === "Perpanjangan")
      );

      const idDiproses = pengajuanLain
        .filter(
          (item) => item.status === "Proses" || item.status === "Diterima"
        )
        .map((item) => item.id_peminjaman);

      setPengajuanSedangDiproses(idDiproses);
      setPeminjaman(dataPeminjamanAktif);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchPeminjaman();
    }
  }, [user, fetchPeminjaman]);

  const handlePengembalian = async (item) => {
    setProsess(item._id);
    const dataPengembalian = {
      user_id: user._id,
      kode_barang: item.kode_barang._id,
      jumlah_barang: item.jumlah_barang,
      jenis_pengajuan: "Pengembalian",
      tgl_pengajuan: new Date(),
      status: "Proses",
      id_peminjaman: item._id,
    };

    try {
      await axios.post(
        "http://localhost:5000/api/pengajuan",
        dataPengembalian,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchPeminjaman();
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Gagal mengirim pengajuan");
    } finally {
      setProsess(null);
    }
  };

  const handlePerpanjangan = async () => {
    if (!tanggalBaru) return alert("Pilih tanggal terlebih dahulu");
    setProsess(selectedItem._id);

    const dataPerpanjangan = {
      user_id: user._id,
      kode_barang: selectedItem.kode_barang._id,
      jumlah_barang: selectedItem.jumlah_barang,
      jenis_pengajuan: "Perpanjangan",
      batas_kembali: tanggalBaru,
      tgl_pengajuan: new Date(),
      status: "Proses",
      id_peminjaman: selectedItem._id,
    };

    try {
      await axios.post(
        "http://localhost:5000/api/pengajuan",
        dataPerpanjangan,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchPeminjaman();
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Gagal mengirim pengajuan");
    } finally {
      setProsess(null);
    }
  };

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setTanggalBaru("");
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Pengembalian dan Perpanjangan Barang</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark text-center">
          <tr>
            <th>No</th>
            <th>Nama Barang</th>
            <th>Jumlah</th>
            <th>Batas Kembali</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {peminjaman.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                Tidak ada data
              </td>
            </tr>
          ) : (
            peminjaman.map((item, index) => (
              <tr key={item._id} className="align-middle text-center">
                <td>{index + 1}</td>
                <td>{item.kode_barang?.nama_barang}</td>
                <td>{item.jumlah_barang}</td>
                <td>
                  {item.batas_kembali
                    ? new Date(item.batas_kembali).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  {pengajuanSedangDiproses.includes(item._id) ? (
                    <span className="badge bg-secondary">Sudah Diajukan</span>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleShowModal(item)}
                        disabled={prosess === item._id}
                      >
                        {prosess === item._id ? (
                          <>
                            <Spinner
                              animation="border"
                              size="sm"
                              className="me-1"
                            />
                            Proses...
                          </>
                        ) : (
                          "Ajukan Perpanjangan"
                        )}
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handlePengembalian(item)}
                        disabled={prosess === item._id}
                      >
                        {prosess === item._id ? (
                          <>
                            <Spinner
                              animation="border"
                              size="sm"
                              className="me-1"
                            />
                            Proses...
                          </>
                        ) : (
                          "Ajukan Pengembalian"
                        )}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Perpanjangan Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Barang:</strong> {selectedItem?.kode_barang?.nama_barang}
          </p>
          <div className="mb-3">
            <label className="form-label">Tanggal Pengembalian Baru</label>
            <input
              type="date"
              className="form-control"
              value={tanggalBaru}
              onChange={(e) => setTanggalBaru(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            disabled={prosess === selectedItem?._id}
          >
            Batal
          </Button>
          <Button
            variant="primary"
            onClick={handlePerpanjangan}
            disabled={prosess === selectedItem?._id}
          >
            {prosess === selectedItem?._id ? (
              <>
                <Spinner animation="border" size="sm" className="me-1" />
                Proses...
              </>
            ) : (
              "Kirim"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PengembalianSarpras;
