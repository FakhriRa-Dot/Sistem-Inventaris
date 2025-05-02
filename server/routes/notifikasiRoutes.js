const express = require("express");
const router = express.Router();
const {
  getNotifikasiByUser,
  markAsRead,
  getUnreadByRole,
} = require("../controllers/notifikasiController");

router.get("/user/:userId", getNotifikasiByUser);
router.put("/read/:id", markAsRead);
router.get("/unread", getUnreadByRole);

module.exports = router;
