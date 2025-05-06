import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Archive,
  Bookmark,
  ChevronDown,
  House,
  User,
  Bell,
} from "lucide-react";

const SidebarKabid = () => {
  const [openMenu, setOpenMenu] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (err) {
      console.error("Error parsing user data:", err);
    }
  }, []);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (!user || !user.user_id) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/api/notifikasi/unread/count/${user.user_id}`
        );
        setUnreadCount(res.data.count || 0);
      } catch (err) {
        console.error("Failed to fetch unread count", err);
      }
    };

    if (user) {
      fetchUnreadCount();
      const intervalId = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(intervalId);
    }
  }, [location, user]);

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
          <Link to="/Kabid/Home" className="nav-link text-dark fw-semibold">
            <House size={18} className="me-2" />
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/Kabid/Data-Inventaris"
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
                to="/Kabid/Riwayat-Aktivitas"
                className="nav-link text-dark"
              >
                Riwayat Aktivitas
              </Link>
            </li>
            <li>
              <Link
                to="/Kabid/Laporan-Aktivitas"
                className="nav-link text-dark"
              >
                Laporan Aktivitas
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
                to="/Kabid/Peminjaman"
                className="nav-link text-dark fw-semibold"
              >
                <Archive size={18} className="me-2" />
                Peminjaman
              </Link>
            </li>

            <li>
              <Link
                to="/Kabid/Permintaan"
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
            to="/Kabid/Pengembalian-Perpanjangan"
            className="nav-link text-dark fw-semibold"
          >
            <Archive size={18} className="me-2" />
            Pengembalian
          </Link>
        </li>
      </ul>
      <div className="d-flex align-items-center justify-content-end gap-3 mt-auto">
        <Link
          to="/Kabid/Notifikasi"
          className="text-dark position-relative d-flex align-items-center justify-content-center"
          style={{ width: "40px", height: "40px" }}
        >
          <Bell size={30} />
          {unreadCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "4px",
                right: "4px",
                minWidth: "16px",
                height: "16px",
                backgroundColor: "red",
                borderRadius: "50%",
                color: "white",
                fontSize: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {unreadCount}
            </span>
          )}
        </Link>

        <div className="dropdown mt-auto align-self-end">
          <button
            className="btn p-0 border-0 bg-transparent d-flex align-items-center justify-content-center rounded-circle"
            type="button"
            id="dropdownUser"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ width: "40px", height: "40px" }}
          >
            <User size={30} className="text-dark" />
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
    </div>
  );
};

export default SidebarKabid;
