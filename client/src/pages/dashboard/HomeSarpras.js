import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeSarpras = () => {
  const [user, setUser] = useState({});
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Dashboard Sarpras</h2>

      <div className="card mb-4">
        <Card className="mb-4">
          <Card.Body>
            <h5>Info Pengguna</h5>
            <p>
              <strong>Nama: </strong> {user.name}
            </p>
            <p>
              <strong>Email: </strong> {user.email}
            </p>
            <p>
              <strong>Role: </strong> {user.role}
            </p>
          </Card.Body>
        </Card>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12">
          <h4>Quick Access</h4>
        </div>

        <div className="col-6 col-md-2">
          <Link to="/Sarpras/Data-Inventaris" className="btn btn-primary w-100">
            Data Inventaris
          </Link>
        </div>
        <div className="col-6 col-md-2">
          <Link to="/Sarpras/Peminjaman" className="btn btn-success w-100">
            Peminjaman
          </Link>
        </div>
        <div className="col-6 col-md-2">
          <Link
            to="/Sarpras/Permintaan"
            className="btn btn-warning w-100 text-white"
          >
            Permintaan
          </Link>
        </div>
        <div className="col-6 col-md-2">
          <Link
            to="/Sarpras/Pengembalian"
            className="btn btn-info w-100 text-white"
          >
            Pengembalian
          </Link>
        </div>
        <div className="col-6 col-md-2">
          <Link
            to="/Sarpras/Status-Inventaris"
            className="btn btn-danger w-100"
          >
            Status Inventaris
          </Link>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-3">Aktivitas Terkini</h4>
        </div>
      </div>
    </div>
  );
};

export default HomeSarpras;
