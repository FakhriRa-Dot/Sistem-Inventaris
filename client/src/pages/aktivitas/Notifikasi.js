import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Alert, Spinner, Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Notifikasi = () => {
  const [notifikasi, setNotifikasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("userInfo");
      console.log("Raw userInfo from localStorage:", storedUser);

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed user:", parsedUser);
        setUser(parsedUser);
      } else {
        console.log("No userInfo found in localStorage");
        setError("Login dibutuhkan untuk melihat notifikasi");
      }
    } catch (err) {
      console.error("Error parsing user data:", err);
      setError("Error saat memuat data user");
    }
  }, []);

  const fetchNotifikasi = useCallback(async () => {
    if (!user || !user.user_id) {
      console.log("No user found or user has no user_id");
      setLoading(false);
      return;
    }

    console.log("Fetching notifications for user ID:", user.user_id);

    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/notifikasi/user/${user.user_id}`
      );
      console.log("Notification API response:", res.data);
      setNotifikasi(res.data);
      setError(null);
    } catch (err) {
      console.error("Gagal memuat notifikasi:", err);
      setError(`Error: ${err.message}. ${err.response?.data?.message || ""}`);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchNotifikasi();
    }
  }, [user, fetchNotifikasi]);

  const handleMarkAsRead = async (id) => {
    try {
      console.log("Marking notification as read:", id);
      await axios.put(`http://localhost:5000/api/notifikasi/read/${id}`);
      fetchNotifikasi();
    } catch (err) {
      console.error("Gagal menandai sebagai dibaca:", err);
      setError(`Error saat menandai notifikasi: ${err.message}`);
    }
  };

  const handleShowDetail = (notif) => {
    setSelectedNotif(notif);
    setShowModal(true);

    // Jika notifikasi belum dibaca, tandai sebagai dibaca
    if (!notif.read) {
      handleMarkAsRead(notif._id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleMarkAllAsRead = async () => {
    if (!user || !user.user_id) return;

    try {
      await axios.put(
        `http://localhost:5000/api/notifikasi/read/all/${user.user_id}`
      );
      fetchNotifikasi();
    } catch (err) {
      console.error("Gagal menandai semua notifikasi sebagai dibaca:", err);
      setError(`Error: ${err.message}`);
    }
  };

  if (!user) {
    return (
      <div className="container mt-4">
        <Alert variant="info">Silakan login untuk melihat notifikasi</Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Memuat notifikasi...</span>
        </Spinner>
        <p className="mt-2">Memuat notifikasi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <Alert variant="danger">
          <Alert.Heading>Terjadi Kesalahan</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </div>
    );
  }

  const unreadNotifications = notifikasi.filter((notif) => !notif.read);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Notifikasi</h2>
        {unreadNotifications.length > 0 && (
          <Button variant="outline-primary" onClick={handleMarkAllAsRead}>
            Tandai Semua Sudah Dibaca
          </Button>
        )}
      </div>

      {notifikasi.length === 0 ? (
        <Alert variant="info">Tidak ada notifikasi</Alert>
      ) : (
        <div className="list-group">
          {notifikasi.map((notif) => (
            <div
              key={notif._id}
              className={`list-group-item ${
                notif.read ? "" : "list-group-item-info"
              }`}
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{notif.type}</h5>
                <small>{new Date(notif.createdAt).toLocaleString()}</small>
              </div>
              <p className="mb-1">{notif.message}</p>
              <div className="mt-2 d-flex">
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => handleShowDetail(notif)}
                >
                  Detail
                </button>
                {!notif.read && (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleMarkAsRead(notif._id)}
                  >
                    Tandai sudah dibaca
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Detail Notifikasi */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedNotif?.type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Pesan:</strong> {selectedNotif?.message}
          </p>
          <p>
            <strong>Waktu:</strong>{" "}
            {selectedNotif
              ? new Date(selectedNotif.createdAt).toLocaleString()
              : ""}
          </p>
          {selectedNotif?.userFrom && (
            <p>
              <strong>Pengirim:</strong> {selectedNotif.userFrom}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Notifikasi;
