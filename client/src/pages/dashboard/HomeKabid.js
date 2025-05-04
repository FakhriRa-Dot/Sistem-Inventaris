import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeKabid = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Dashboard Kabid</h2>

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

      <div className="row g-3 mb-4">
        <div className="col-12">
          <h4>Quick Access</h4>
        </div>

        <div className="col-6 col-md-2">
          <Link to="/Kabid/Data-Inventaris" className="btn btn-primary w-100">
            Data Inventaris
          </Link>
        </div>
        <div className="col-6 col-md-2">
          <Link to="/Kabid/Riwayat-Aktivitas" className="btn btn-primary w-100">
            Riwayat Aktivitas
          </Link>
        </div>
        <div className="col-6 col-md-2">
          <Link
            to="/Kabid/Laporan-Inventaris"
            className="btn btn-primary w-100"
          >
            Laporan
          </Link>
        </div>
        <div className="col-6 col-md-2">
          <Link to="/Kabid/Peminjaman" className="btn btn-primary w-100">
            Peminjaman
          </Link>
        </div>
        <div className="col-6 col-md-2">
          <Link to="/Kabid/Permintaan" className="btn btn-primary w-100">
            Permintaan
          </Link>
        </div>
        <div className="col-6 col-md-2">
          <Link
            to="/Kabid/Pengembalian-Perpanjangan"
            className="btn btn-primary w-100"
          >
            Pengembalian
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeKabid;
