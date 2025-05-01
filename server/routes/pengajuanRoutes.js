const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
  buatPengajuan,
  getAllPengajuan,
  updateStatusPengajuan,
  getPengembalianDanPerpanjangan,
  getStatistikBulanan,
} = require("../controllers/pengajuanController");

router.post("/", verifyToken, buatPengajuan);
router.get("/", getAllPengajuan);
router.put("/:id", updateStatusPengajuan);
router.get("/pengembalian", getPengembalianDanPerpanjangan);
router.get("/statistik/bulanan", getStatistikBulanan);

module.exports = router;
