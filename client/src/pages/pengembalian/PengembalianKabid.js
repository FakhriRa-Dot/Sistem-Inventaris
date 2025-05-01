import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Tabs, Tab } from "react-bootstrap";

const PengembalianKabid = () => {
  const [pengajuan, setPengajuan] = useState([]);
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [key, setKey] = useState("pengembalian");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/pengajuan/pengembalian"
      );
      setPengajuan(res.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/pengajuan/${id}`, { status });
      fetchData();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleShow = (item) => {
    setSelected(item);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const cekTepatWaktu = (item) => {
    if (
      item.jenis_pengajuan === "Pengembalian" &&
      item.id_peminjaman?.batas_kembali
    ) {
      const batas = new Date(item.id_peminjaman.batas_kembali);
      const tglKembali = new Date(item.tgl_pengajuan);
      return tglKembali <= batas ? "Tepat Waktu" : "Terlambat";
    }
    return "-";
  };

  const renderTable = (jenis) => {
    const filtered = pengajuan.filter((item) => item.jenis_pengajuan === jenis);

    return (
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark text-center">
          <tr>
            <th>No</th>
            <th>Tanggal Masuk</th>
            <th>Nama Barang</th>
            <th>Keterangan</th>
            <th>Status</th>
            {jenis === "Pengembalian" && <th>Kategori</th>}
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, index) => (
            <tr key={item._id} className="text-center align-middle">
              <td>{index + 1}</td>
              <td>{new Date(item.tgl_pengajuan).toLocaleDateString()}</td>
              <td>{item.kode_barang?.nama_barang || "-"}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleShow(item)}
                >
                  Detail
                </Button>
              </td>
              <td>
                {item.status === "Proses" ? (
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleStatus(item._id, "Diterima")}
                    >
                      Setuju
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleStatus(item._id, "Ditolak")}
                    >
                      Tolak
                    </Button>
                  </>
                ) : (
                  <span
                    className={`badge bg-${
                      item.status === "Diterima" ? "success" : "danger"
                    }`}
                  >
                    {item.status}
                  </span>
                )}
              </td>
              {jenis === "Pengembalian" && (
                <td>
                  {cekTepatWaktu(item) === "Terlambat" ? (
                    <span className="badge bg-danger">Terlambat</span>
                  ) : (
                    <span className="badge bg-success">Tepat Waktu</span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Persetujuan Pengembalian dan Perpanjangan</h3>

      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="pengembalian" title="Pengembalian">
          {renderTable("Pengembalian")}
        </Tab>
        <Tab eventKey="perpanjangan" title="Perpanjangan">
          {renderTable("Perpanjangan")}
        </Tab>
      </Tabs>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detail Pengajuan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <div>
              <p>
                <strong>Nama User:</strong> {selected.user_id?.name}
              </p>
              <p>
                <strong>Email:</strong> {selected.user_id?.email}
              </p>
              <p>
                <strong>Unit:</strong> {selected.user_id?.unit}
              </p>
              <p>
                <strong>Nama Barang:</strong>{" "}
                {selected.kode_barang?.nama_barang}
              </p>
              <p>
                <strong>Jumlah:</strong> {selected.jumlah_barang}
              </p>
              <p>
                <strong>Jenis:</strong> {selected.jenis_pengajuan}
              </p>
              {selected.batas_kembali && (
                <p>
                  <strong>Batas Kembali Baru:</strong>{" "}
                  {new Date(selected.batas_kembali).toLocaleDateString()}
                </p>
              )}
              {selected.id_peminjaman?.batas_kembali && (
                <p>
                  <strong>Batas Kembali Awal:</strong>{" "}
                  {new Date(
                    selected.id_peminjaman.batas_kembali
                  ).toLocaleDateString()}
                </p>
              )}
              <p>
                <strong>Tanggal Pengajuan:</strong>{" "}
                {new Date(selected.tgl_pengajuan).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {selected.status}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PengembalianKabid;
