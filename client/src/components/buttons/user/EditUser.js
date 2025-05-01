import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const EditUser = ({ show, onHide, onSuccess, userData }) => {
  const [form, setForm] = useState({
    user_id: "",
    name: "",
    unit: "SD",
    email: "",
    role: "admin",
  });

  useEffect(() => {
    if (userData) {
      setForm({
        _id: userData._id || "",
        user_id: userData.user_id || "",
        name: userData.name || "",
        unit: userData.unit || "SD",
        email: userData.email || "",
        role: userData.role || "admin",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${form._id}`, form);
      alert("Pengguna berhasil diupdate");
      onHide();
      onSuccess();
    } catch (err) {
      console.error(err);
      alert(
        "Gagal mengupdate pengguna: " +
          (err.response?.data?.message || "Terjadi kesalahan")
      );
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Pengguna</Modal.Title>
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
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={form.role} onChange={handleChange}>
              <option value="admin">Admin</option>
              <option value="kabid">Kabid</option>
              <option value="sarpras">Sarpras</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Simpan Perubahan
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUser;
