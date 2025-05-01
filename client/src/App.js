import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./auth/Login";
import Kabid from "./routes/Kabid";
import Admin from "./routes/Admin";
import Sarpras from "./routes/Sarpras";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Admin/*" element={<Admin />} />
        <Route path="/Kabid/*" element={<Kabid />} />
        <Route path="/Sarpras/*" element={<Sarpras />} />
      </Routes>
    </Router>
  );
}

export default App;
