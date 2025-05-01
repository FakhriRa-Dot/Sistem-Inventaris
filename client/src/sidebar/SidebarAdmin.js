import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ChevronDown,
  House,
  AlignStartVertical,
  User,
  BookUser,
} from "lucide-react";

const SidebarAdmin = () => {
  const [openMenu, setOpenMenu] = useState("");
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column justify-content-between bg-light p-3"
      style={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        overflowY: "auto",
      }}
    >
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/Admin/Home" className="nav-link text-dark fw-semibold">
            <House size={18} className="me-2" />
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <div
            className="nav-link text-dark fw-semibold d-flex justify-content-between"
            onClick={() => toggleMenu("Inventaris")}
          >
            <span>
              <AlignStartVertical size={18} className="me-2" />
              Inventaris
            </span>
            <ChevronDown size={18} />
          </div>
          <ul
            className={`list-unstyled ms-3 ${
              openMenu === "Inventaris" ? "" : "d-none"
            }`}
          >
            <li>
              <Link to="/Admin/Data-Inventaris" className="nav-link text-dark">
                Data Inventaris
              </Link>
            </li>
            <li>
              <Link
                to="/Admin/Laporan-Inventaris"
                className="nav-link text-dark"
              >
                Laporan Inventaris
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <div
            className="nav-link text-dark fw-semibold d-flex justify-content-between"
            onClick={() => toggleMenu("Pengguna")}
          >
            <span>
              <BookUser size={18} className="me-2" />
              Pengguna
            </span>
            <ChevronDown size={18} />
          </div>
          <ul
            className={`list-unstyled ms-3 ${
              openMenu === "Pengguna" ? "" : "d-none"
            }`}
          >
            <li>
              <Link to="/Admin/Data-Pengguna" className="nav-link text-dark">
                Data Pengguna
              </Link>
            </li>
            <li>
              <Link to="/Admin/Login-Activity" className="nav-link text-dark">
                Login Activity
              </Link>
            </li>
          </ul>
        </li>
      </ul>

      <div className="dropdown mt-auto align-self-end">
        <button
          className="btn p-0 border-0 bg-transparent d-flex align-items-center justify-content-center rounded-circle"
          type="button"
          id="dropdownUser"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ width: "40px", height: "40px" }}
        >
          <User size={24} className="text-dark" />
        </button>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="dropdownUser"
        >
          <li>
            <button className="dropdown-item" onClick={handleLogout}>
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarAdmin;
