import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const LaporanKabid = () => {
  const [pengajuan, setPengajuan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pengajuan/laporan")
      .then((res) => {
        setPengajuan(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });
  }, []);

  const handleExportToExcel = () => {
    const worksheetData = pengajuan.map((item) => [
      item.No,
      item.Tanggal ? new Date(item.Tanggal).toISOString().slice(0, 10) : "N/A", // Safe date conversion
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
    saveAs(blob, "Laporan_Kabid.xlsx");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Laporan Aktivitas</h2>
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
          {pengajuan.map((item, index) => (
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

export default LaporanKabid;
