import React, { useEffect, useState } from "react";
import { Spinner, Table, Button } from "react-bootstrap";
import axios from "axios";

import HapusBarang from "../../components/buttons/barang/HapusBarang";
import EditBarang from "../../components/buttons/barang/EditBarang";
import TambahBarang from "../../components/buttons/barang/TambahBarang";

const KelolaInventaris = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTambah, setShowTambah] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [hapusItem, setHapusItem] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/inventaris");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>KelolaInventaris</h2>
      <div className="mb-3">
        <Button variant="success" onClick={() => setShowTambah(true)}>
          Tambah Inventaris
        </Button>
      </div>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Barang</th>
              <th>Tipe Barang</th>
              <th>Jumlah Barang</th>
              <th>Kondisi</th>
              <th>Tanggal Masuk</th>
              <th>Sumber</th>
              <th>Ket</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.nama_barang}</td>
                <td>{item.tipe_barang}</td>
                <td>{item.jumlah}</td>
                <td>{item.kondisi_barang}</td>
                <td>{new Date(item.tgl_masuk).toLocaleDateString()}</td>
                <td>{item.sumber}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => setEditItem(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setHapusItem(item)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <TambahBarang
        show={showTambah}
        onHide={() => {
          setShowTambah(false);
          fetchData();
        }}
      />

      {editItem && (
        <EditBarang
          item={editItem}
          onHide={() => {
            setEditItem(null);
            fetchData();
          }}
        />
      )}

      {hapusItem && (
        <HapusBarang
          item={hapusItem}
          onHide={() => {
            setHapusItem(null);
            fetchData();
          }}
        />
      )}
    </div>
  );
};

export default KelolaInventaris;
