import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const HapusBarang = ({ item, onHide }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/inventaris/${item._id}`);
      onHide();
    } catch (error) {
      alert("Failed to delete item");
      console.error(error);
    }
  };

  return (
    <Modal show={!!item} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Konfirmasi Penghapusan Inventaris</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Apakah Anda yakin ingin menghapus <strong>{item.nama_barang}</strong>?
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

export default HapusBarang;
