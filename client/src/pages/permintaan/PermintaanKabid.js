import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const PermintaanKabid = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (pengajuan) => {
    setSelected(pengajuan);
    setShow(true);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pengajuan");
      const filtered = res.data.filter(
        (item) => item.jenis_pengajuan === "Permintaan"
      );
      setData(filtered);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/pengajuan/${id}`, { status });
      fetchData();
    } catch (err) {
      console.error("Failed to update data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Persetujuan Pengajuan Barang</h3>

      <table className="table table-striped table-bordered">
        <thead className="table-dark text-center">
          <tr>
            <th>No</th>
            <th>Tanggal Masuk</th>
            <th>Nama Barang</th>
            <th>Jenis</th>
            <th>Keterangan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id} className="align-middle text-center">
              <td>{index + 1}</td>
              <td>{new Date(item.tgl_pengajuan).toLocaleDateString()}</td>
              <td>
                {item.nama_barang || item.kode_barang?.nama_barang || "-"}
              </td>
              <td className="text-capitalize">{item.jenis_pengajuan}</td>
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
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detail Pengajuan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected ? (
            <div className="text-sm">
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
                {selected.nama_barang || selected.kode_barang?.nama_barang}
              </p>
              <p>
                <strong>Jumlah:</strong> {selected.jumlah_barang}
              </p>
              <p>
                <strong>Jenis:</strong>{" "}
                {selected.jenis_pengajuan.charAt(0).toUpperCase() +
                  selected.jenis_pengajuan.slice(1)}
              </p>
              {selected.batas_kembali && (
                <p>
                  <strong>Batas Kembali:</strong>{" "}
                  {new Date(selected.batas_kembali).toLocaleDateString()}
                </p>
              )}
              {selected.alasan && (
                <p>
                  <strong>Alasan:</strong> {selected.alasan}
                </p>
              )}
              <p>
                <strong>Tanggal Pengajuan:</strong>{" "}
                {new Date(selected.tgl_pengajuan).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-capitalize">{selected.status}</span>
              </p>
            </div>
          ) : (
            <p>Data tidak ditemukan</p>
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

export default PermintaanKabid;
