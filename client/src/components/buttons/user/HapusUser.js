import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const HapusUser = ({ user, onHide, onSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${user._id}`);
      alert("Pengguna berhasil dihapus");
      onSuccess();
      onHide();
    } catch (err) {
      console.error(err);
      alert(
        "Gagal menghapus pengguna: " +
          (err.response?.data?.message || "Terjadi kesalahan")
      );
    }
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Hapus Pengguna</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Apakah Anda yakin ingin menghapus pengguna <strong>{user.name}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Batal
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Hapus
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HapusUser;
