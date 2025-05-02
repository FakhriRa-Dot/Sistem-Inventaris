import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const HomeAdmin = () => {
  const [jumlahBarang, setJumlahBarang] = useState({
    tersedia: 0,
    dipinjam: 0,
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Jumlah Peminjaman:",
        data: [],
        backgroundColor: "#4E73DF",
      },
    ],
  });

  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/inventaris/stats"
        );
        setJumlahBarang(res.data);

        const resPeminjaman = await axios.get(
          "http://localhost:5000/api/pengajuan//statistik/bulanan"
        );
        setChartData({
          labels: resPeminjaman.data.labels,
          datasets: [
            {
              label: "Jumlah Peminjaman:",
              data: resPeminjaman.data.data,
              backgroundColor: "#4E73DF",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Dashboard Admin</h2>

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

      <Card className="mb-4">
        <Card.Body>
          <h5>Grafik Peminjaman</h5>
          <Bar data={chartData} />
        </Card.Body>
      </Card>

      <div className="row">
        <div className="col-md-6">
          <Card className="text-center bg-succes text-white">
            <Card.Body>
              <h5>Barang Tersedia</h5>
              <h2>{jumlahBarang.tersedia}</h2>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className="text-center bg-warning text-dark">
            <Card.Body>
              <h5>Barang Dipinjam</h5>
              <h2>{jumlahBarang.dipinjam}</h2>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
