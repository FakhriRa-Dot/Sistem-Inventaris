import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const TambahUser = ({ onHide, onSuccess }) => {
  const [form, setForm] = useState({
    user_id: "",
    name: "",
    unit: "PAUDIT",
    email: "",
    password: "",
    role: "admin",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users", form);
      alert("Pengguna berhasil ditambahkan");
      onHide();
      onSuccess();
    } catch (err) {
      console.error(err);
      alert(
        "Gagal menambahkan pengguna: " +
          (err.response?.data?.message || "Terjadi kesalahan")
      );
    }
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Tambah Pengguna</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              name="user_id"
              value={form.user_id}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Unit</Form.Label>
            <Form.Select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              required
            >
              <option value="YYSN">YAYASAN</option>
              <option value="PAUDIT">PAUDIT</option>
              <option value="SDIT">SDIT</option>
              <option value="SMPI">SMPI</option>
              <option value="SMAIT">SMAIT</option>
              <option value="PONDOK">PONDOK</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={form.role} onChange={handleChange}>
              <option value="admin">Admin</option>
              <option value="kabid">Kabid</option>
              <option value="sarpras">Sarpras</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Simpan
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TambahUser;
