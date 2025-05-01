const express = require("express");
const router = express.Router();
const {
  getNotifikasiByRole,
  tandaiSudahDibaca,
  hapusNotifikasi,
} = require("../controllers/notifikasiController");

router.get("/", getNotifikasiByRole);
router.patch("/:id/read", tandaiSudahDibaca);
router.delete("/:id", hapusNotifikasi);

module.exports = router;
