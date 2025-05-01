import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import TambahUser from "../../components/buttons/user/TambahUser";
import EditUser from "../../components/buttons/user/EditUser";
import HapusUser from "../../components/buttons/user/HapusUser";

const KelolaPengguna = () => {
  const [data, setData] = useState([]);
  const [showTambah, setShowTambah] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [hapusUser, setHapusUser] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Kelola Pengguna</h2>

      <Button
        variant="primary"
        onClick={() => setShowTambah(true)}
        className="mb-3"
      >
        Tambah Pengguna
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>User ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Unit</th>
            <th>Role</th>
            <th>Aksi</th>
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
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => setEditUser(user)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setHapusUser(user)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showTambah && (
        <TambahUser onHide={() => setShowTambah(false)} onSuccess={fetchData} />
      )}

      {editUser && (
        <EditUser
          show={true}
          userData={editUser}
          onHide={() => setEditUser(null)}
          onSuccess={fetchData}
        />
      )}

      {hapusUser && (
        <HapusUser
          user={hapusUser}
          onHide={() => setHapusUser(null)}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
};

export default KelolaPengguna;
