import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Archive, Bookmark, ChevronDown, House, User } from "lucide-react";

const SidebarSarpras = () => {
  const [openMenu, setOpenMenu] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
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
          <Link to="/Sarpras/Home" className="nav-link text-dark fw-semibold">
            <House size={18} className="me-2" />
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/Sarpras/Data-Inventaris"
            className="nav-link text-dark fw-semibold"
          >
            <Archive size={18} className="me-2" />
            Data Inventaris
          </Link>
        </li>

        <li className="nav-item">
          <div
            className="nav-link text-dark fw-semibold d-flex justify-content-between"
            onClick={() => toggleMenu("laporan")}
          >
            <span>
              <Bookmark size={18} className="me-2" />
              Laporan
            </span>
            <ChevronDown size={18} />
          </div>
          <ul
            className={`list-unstyled ms-3 ${
              openMenu === "laporan" ? "" : "d-none"
            }`}
          >
            <li>
              <Link
                to="/Sarpras/Status-Inventaris"
                className="nav-link text-dark"
              >
                Status Transaksi
              </Link>
            </li>
            <li>
              <Link
                to="/Sarpras/Riwayat-Inventaris"
                className="nav-link text-dark"
              >
                Riwayat Transaksi
              </Link>
            </li>
            <li>
              <Link
                to="/Sarpras/Laporan-Inventaris"
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
            onClick={() => toggleMenu("peminjaman")}
          >
            <span>
              <Bookmark size={18} className="me-2" />
              Peminjaman
            </span>
            <ChevronDown size={18} />
          </div>
          <ul
            className={`list-unstyled ms-3 ${
              openMenu === "peminjaman" ? "" : "d-none"
            }`}
          >
            <li>
              <Link
                to="/Sarpras/Peminjaman"
                className="nav-link text-dark fw-semibold"
              >
                <Archive size={18} className="me-2" />
                Peminjaman
              </Link>
            </li>

            <li>
              <Link
                to="/Sarpras/Permintaan"
                className="nav-link text-dark fw-semibold"
              >
                <Archive size={18} className="me-2" />
                Permintaan
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <Link
            to="/Sarpras/Pengembalian"
            className="nav-link text-dark fw-semibold"
          >
            <Archive size={18} className="me-2" />
            Pengembalian
          </Link>
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

export default SidebarSarpras;
