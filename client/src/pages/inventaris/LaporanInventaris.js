import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const LaporanInventaris = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/inventaris/laporan"
      );
      setData(res.data.data);
    } catch (err) {
      console.error("Error fetching inventaris:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const exportToExcel = () => {
    const worksheetData = data.map((item, index) => ({
      No: index + 1,
      "Nama Barang": item.nama_barang,
      "Jumlah Barang": item.jumlah_awal,
      Sumber: item.sumber,
      "Tanggal Masuk": new Date(item.tgl_masuk).toLocaleString("id-ID"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Inventaris");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, "Laporan-Inventaris.xlsx");
  };

  return (
    <div className="container mt-4">
      <h2>Laporan Inventaris</h2>
      <Button className="mb-3" variant="success" onClick={exportToExcel}>
        Export ke Excel
      </Button>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Barang</th>
              <th>Jumlah Barang</th>
              <th>Sumber</th>
              <th>Tanggal Masuk</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.nama_barang}</td>
                <td>{item.jumlah_awal}</td>
                <td>{item.sumber}</td>
                <td>
                  {new Date(item.tgl_masuk).toLocaleString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default LaporanInventaris;
