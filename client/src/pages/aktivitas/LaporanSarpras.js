import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const LaporanSarpras = () => {
  const [pengajuan, setPengajuan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    let fetchUrl = `http://localhost:5000/api/pengajuan/laporan`;
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser._id) {
          fetchUrl = `http://localhost:5000/api/pengajuan/laporan?userId=${parsedUser._id}`;
        }
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    }
    axios
      .get(fetchUrl)
      .then((res) => {
        setPengajuan(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setError("Gagal mengambil data laporan");
        setLoading(false);
      });
  }, []);

  const handleExportToExcel = () => {
    if (pengajuan.length === 0) {
      alert("Tidak ada data untuk diekspor");
      return;
    }

    const worksheetData = pengajuan.map((item) => [
      item.No,
      item.Tanggal,
      item["Nama Barang"],
      item.Pengaju,
      item.Persetujuan,
      item["Jenis Pengajuan"],
    ]);

    worksheetData.unshift([
      "No",
      "Tanggal",
      "Nama Barang",
      "Pengaju",
      "Persetujuan",
      "Jenis Pengajuan",
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Laporan.xlsx");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Laporan Sarpras</h2>
      {error && <div className="alert alert-danger mb-3">{error}</div>}
      <button onClick={handleExportToExcel} className="btn btn-primary mb-3">
        Export ke Excel
      </button>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr className="text-center">
            <th>No</th>
            <th>Tanggal</th>
            <th>Nama Barang</th>
            <th>Pengaju</th>
            <th>Persetujuan</th>
            <th>Jenis Pengajuan</th>
          </tr>
        </thead>
        <tbody>
          {pengajuan.map((item) => (
            <tr key={item.No} className="text-center align-middle">
              <td>{item.No}</td>
              <td>{item.Tanggal}</td>
              <td>{item["Nama Barang"]}</td>
              <td>{item.Pengaju}</td>
              <td>{item.Persetujuan}</td>
              <td className="text-capitalize">{item["Jenis Pengajuan"]}</td>
            </tr>
          ))}
          {pengajuan.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                Belum ada riwayat pengajuan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LaporanSarpras;
