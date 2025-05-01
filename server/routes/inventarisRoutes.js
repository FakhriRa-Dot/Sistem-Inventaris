const express = require("express");
const router = express.Router();
const {
  getInventaris,
  getInventarisById,
  tambahInventaris,
  updateInventaris,
  deleteInventaris,
  getTipeBarangList,
  getInventarisStats,
  getSumberList,
  getKondisiBarangList,
} = require("../controllers/inventarisController");

router.get("/", getInventaris);
router.get("/stats", getInventarisStats);
router.get("/:id", getInventarisById);
router.post("/", tambahInventaris);
router.get("/tipe-barang/list", getTipeBarangList);
router.get("/sumber/list", getSumberList);
router.get("/kondisi-barang/list", getKondisiBarangList);
router.put("/:id", updateInventaris);
router.delete("/:id", deleteInventaris);

module.exports = router;
