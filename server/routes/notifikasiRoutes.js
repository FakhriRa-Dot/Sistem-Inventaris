const express = require("express");
const router = express.Router();
const {
  getNotifikasiByRole,
  tandaiSudahDibaca,
  hapusNotifikasi,
  getBelumDibaca,
} = require("../controllers/notifikasiController");

router.get("/", getNotifikasiByRole);
router.patch("/:id/read", tandaiSudahDibaca);
router.delete("/:id", hapusNotifikasi);
router.get("/unread", getBelumDibaca);

module.exports = router;
