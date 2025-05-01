import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const EditBarang = ({ item, onHide }) => {
  const [form, setForm] = useState({ ...item });
  const [tipeOptions, setTipeOptions] = useState([]);
  const [sumberOptions, setSumberOptions] = useState([]);
  const [kondisiOptions, setKondisiOptions] = useState([]);

  useEffect(() => {
    // Ambil pilihan dari server
    const fetchOptions = async () => {
      try {
        const [tipeRes, sumberRes, kondisiRes] = await Promise.all([
          axios.get("http://localhost:5000/api/inventaris/tipe-barang/list"),
          axios.get("http://localhost:5000/api/inventaris/sumber/list"),
          axios.get("http://localhost:5000/api/inventaris/kondisi-barang/list"),
        ]);
        console.log("Tipe:", tipeRes.data);
        console.log("Sumber:", sumberRes.data);
        console.log("Kondisi:", kondisiRes.data);
        setTipeOptions(tipeRes.data);
        setSumberOptions(sumberRes.data);
        setKondisiOptions(kondisiRes.data);
      } catch (err) {
        console.error("Failed to load dropdown options", err);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/inventaris/${item._id}`, form);
      onHide();
    } catch (error) {
      alert("Failed to update item");
      console.error(error);
    }
  };

  return (
    <Modal show={!!item} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Barang</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nama Barang</Form.Label>
            <Form.Control
              name="nama_barang"
              value={form.nama_barang}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipe Barang</Form.Label>
            <Form.Select
              name="tipe_barang"
              value={form.tipe_barang}
              onChange={handleChange}
            >
              <option value="">-- Pilih Tipe --</option>
              {tipeOptions.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Kondisi Barang</Form.Label>
            <Form.Select
              name="kondisi_barang"
              value={form.kondisi_barang}
              onChange={handleChange}
            >
              <option value="">-- Pilih Kondisi --</option>
              {kondisiOptions.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sumber</Form.Label>
            <Form.Select
              name="sumber"
              value={form.sumber}
              onChange={handleChange}
            >
              <option value="">-- Pilih Sumber --</option>
              {sumberOptions.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Jumlah</Form.Label>
            <Form.Control
              type="number"
              min="1"
              name="jumlah"
              value={form.jumlah}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tanggal Masuk</Form.Label>
            <Form.Control
              type="date"
              name="tgl_masuk"
              value={form.tgl_masuk?.split("T")[0]}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Batal
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Simpan Perubahan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBarang;
