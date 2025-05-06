import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import axios from "axios";

const TambahBarang = ({ show, onHide }) => {
  const [form, setForm] = useState({
    nama_barang: "",
    tipe_barang: "",
    kondisi_barang: "Baik",
    tgl_masuk: "",
    sumber: "",
    jumlah: 1,
  });

  const [namaOptions, setNamaOptions] = useState([]);
  const [newTipe, setNewTipe] = useState("");
  const [newSumber, setNewSumber] = useState("");

  const tipeOptions = ["Elektronik", "ATK", "Rumah Tangga", newTipe].filter(
    Boolean
  );
  const sumberOptions = ["Sumbangan", "Hibah", "Pembelian", newSumber].filter(
    Boolean
  );

  useEffect(() => {
    const fetchNamaBarang = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/inventaris");
        const uniqueNames = [
          ...new Set(res.data.map((item) => item.nama_barang)),
        ];
        setNamaOptions(uniqueNames);
      } catch (error) {
        alert("Failed to add item: " + error.response.data.message);
        console.error(error);
      }
    };

    fetchNamaBarang();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const existing = await axios.get("http://localhost:5000/api/inventaris");
      const existingItem = existing.data.find(
        (item) =>
          item.nama_barang.toLowerCase() === form.nama_barang.toLowerCase()
      );
      if (existingItem) {
        await axios.put(
          `http://localhost:5000/api/inventaris/${existingItem._id}`,
          {
            ...existingItem,
            jumlah: existingItem.jumlah + parseInt(form.jumlah),
          }
        );
      } else {
        console.log("Form yang dikirim:", form);

        await axios.post("http://localhost:5000/api/inventaris", form);
      }

      onHide();
    } catch (error) {
      alert("Failed to add item");
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Tambah Barang</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nama Barang</Form.Label>
            <Typeahead
              id="nama-barang"
              options={namaOptions}
              onChange={(selected) => {
                if (selected.length > 0) {
                  setForm({ ...form, nama_barang: selected[0] });
                }
              }}
              onInputChange={(text) => {
                setForm((prev) => ({ ...prev, nama_barang: text }));
              }}
              selected={form.nama_barang ? [form.nama_barang] : []}
              placeholder="Ketik atau pilih nama barang"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Kondisi Barang</Form.Label>
            <Form.Select
              name="kondisi_barang"
              value={form.kondisi_barang}
              onChange={handleChange}
            >
              <option value="Baik">Baik</option>
              <option value="Tidak Baik">Tidak Baik</option>
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
              value={form.tgl_masuk}
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
              {tipeOptions.map((tipe, idx) => (
                <option key={idx} value={tipe}>
                  {tipe}
                </option>
              ))}
            </Form.Select>
            <Form.Control
              className="mt-2"
              placeholder="Tambah tipe baru (opsional)"
              value={newTipe}
              onChange={(e) => {
                const value = e.target.value;
                setNewTipe(value);
                setForm((prev) => ({ ...prev, tipe_barang: value }));
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sumber</Form.Label>
            <Form.Select
              name="sumber"
              value={form.sumber}
              onChange={handleChange}
            >
              <option value="">-- Pilih Sumber --</option>
              {sumberOptions.map((src, idx) => (
                <option key={idx} value={src}>
                  {src}
                </option>
              ))}
            </Form.Select>
            <Form.Control
              className="mt-2"
              placeholder="Tambah sumber baru (opsional)"
              value={newSumber}
              onChange={(e) => {
                const value = e.target.value;
                setNewSumber(value);
                setForm((prev) => ({ ...prev, sumber: value }));
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Batal
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TambahBarang;
