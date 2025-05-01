import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const LoginActivity = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/login-activity");
        setLogs(res.data);
      } catch (error) {
        console.error("Gagal fetch login activity:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Login Activity</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Role</th>
            <th>Login Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log.name}</td>
              <td>{log.role}</td>
              <td>{new Date(log.login_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LoginActivity;
