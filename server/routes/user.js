const express = require("express");
const router = express.Router();
const {
  tambahUser,
  getAllUsers,
  hapusUser,
  updateUser,
} = require("../controllers/userController");

router.post("/", tambahUser);
router.get("/", getAllUsers);
router.delete("/:id", hapusUser);
router.put("/:id", updateUser);

module.exports = router;
