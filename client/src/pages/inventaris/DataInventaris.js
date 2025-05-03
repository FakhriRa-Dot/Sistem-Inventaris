import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Form } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DataInventaris = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [tipeFilter, setTipeFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tipeBarangList, setTipeBarangList] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/inventaris");
        console.log("Data inventaris:", res.data);
        setData(res.data);
        setFilteredData(res.data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Gagal memuat data inventaris");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTipeBarang = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/inventaris/tipe-barang/list"
        );
        setTipeBarangList(res.data);
      } catch (error) {
        console.error("Failed to fetch item types:", error);
      }
    };
    fetchTipeBarang();
  }, []);

  useEffect(() => {
    let filtered = data;
    if (statusFilter)
      filtered = filtered.filter((item) => item.status === statusFilter);
    if (tipeFilter)
      filtered = filtered.filter((item) => item.tipe_barang === tipeFilter);
    setFilteredData(filtered);
  }, [statusFilter, tipeFilter, data]);

  if (loading) return <p>Memuat data inventaris...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Data Inventaris</h2>
      <div className="row mb-3">
        <div className="col-md-3">
          <Form.Select onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Filter Status</option>
            <option value="Tersedia">Tersedia</option>
            <option value="Dipinjam">Dipinjam</option>
          </Form.Select>
        </div>
        <div className="col-md-3">
          <Form.Select onChange={(e) => setTipeFilter(e.target.value)}>
            <option value="">Filter Tipe Barang</option>
            {tipeBarangList.map((tipe, index) => (
              <option key={`tipe-${index}`} value={tipe}>
                {tipe}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Barang</th>
            <th>Tipe Barang</th>
            <th>Jumlah</th>
            <th>Kondisi</th>
            <th>Tanggal Masuk</th>
            <th>Sumber</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            // Gunakan item._id sebagai key utama, atau kombinasi item._id dan index sebagai fallback
            <tr key={item._id || `item-${index}`}>
              <td>{index + 1}</td>
              <td>{item.nama_barang}</td>
              <td>{item.tipe_barang}</td>
              <td>{item.jumlah}</td>
              <td>{item.kondisi_barang}</td>
              <td>{new Date(item.tgl_masuk).toLocaleDateString("id-ID")}</td>
              <td>{item.sumber}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {userInfo?.role === "admin" && (
        <div className="d-flex gap-3 mt-3">
          <Button
            variant="primary"
            onClick={() => navigate("/Admin/Laporan-Inventaris")}
          >
            Cetak Laporan
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/Admin/Kelola-Inventaris")}
          >
            Kelola Inventaris
          </Button>
        </div>
      )}
    </div>
  );
};

export default DataInventaris;
