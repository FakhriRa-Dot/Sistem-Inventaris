import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DataPengguna = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Gagal mengambil data pengguna:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Data Pengguna</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>User ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Unit</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.user_id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.unit}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-end mt-3">
        <Button
          variant="primary"
          onClick={() => navigate("/Admin/Kelola-Pengguna")}
        >
          Kelola Pengguna
        </Button>
      </div>
    </div>
  );
};

export default DataPengguna;
